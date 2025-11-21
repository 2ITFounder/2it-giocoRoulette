"use client";

import { useState } from "react";
import type { Chamber, LogEntry } from "../types/game";
import { generateChambers } from "../lib/gameLogic";

import PlayersSection from "./PlayersSection";
import DrumSection from "./DrumSection";
import ScoreboardSection from "./ScoreboardSection";
import LogSection from "./LogSection";

type Screen = "menu" | "game";

export default function RouletteGame() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [chambers, setChambers] = useState(6);
  const [bullets, setBullets] = useState(3);

  const [screen, setScreen] = useState<Screen>("menu");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentChamberIndex, setCurrentChamberIndex] = useState(0);
  const [chamberSetup, setChamberSetup] = useState<Chamber[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [drinksCount, setDrinksCount] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  // controlla se siamo in attesa di "Spara" (true) o di "Prossimo turno" (false)
  const [awaitingShot, setAwaitingShot] = useState(true);
  // piccola animazione pistola
  const [isFiring, setIsFiring] = useState(false);

  const triggerGunAnimation = () => {
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 180);
  };

  const resetGameState = () => {
    setGameStarted(false);
    setScreen("menu");
    setCurrentPlayerIndex(0);
    setCurrentChamberIndex(0);
    setChamberSetup([]);
    setLog([]);
    setDrinksCount(new Array(players.length).fill(0));
    setGameOver(false);
    setLastMessage("");
    setAwaitingShot(true);
    setIsFiring(false);
  };

  const addPlayer = () => {
    const trimmed = playerName.trim();
    if (!trimmed) return;
    setPlayers((prev) => [...prev, trimmed]);
    setPlayerName("");
  };

  const removePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    setDrinksCount((prev) => prev.filter((_, i) => i !== index));
    if (currentPlayerIndex >= newPlayers.length) {
      setCurrentPlayerIndex(0);
    }
  };

  const startGame = () => {
    if (players.length < 2) {
      alert("Servono almeno 2 partecipanti!");
      return;
    }
    const setup = generateChambers(chambers, bullets);
    setChamberSetup(setup);
    setCurrentChamberIndex(0);
    setCurrentPlayerIndex(0);
    setDrinksCount(new Array(players.length).fill(0));
    setGameStarted(true);
    setGameOver(false);
    setLog([]);
    setLastMessage("");
    setAwaitingShot(true);
    setIsFiring(false);
    setScreen("game");
  };

  const addLog = (message: string) => {
    setLog((prev) => [
      { id: Date.now() + Math.random(), message },
      ...prev,
    ]);
  };

  const incrementDrinks = (playerIndex: number, amount: number) => {
    setDrinksCount((prev) => {
      const copy = [...prev];
      copy[playerIndex] = (copy[playerIndex] || 0) + amount;
      return copy;
    });
  };

  const handleShotEmpty = (name: string) => {
    const msg = `Click! Nessun colpo. ${name} è salvo 🍀`;
    setLastMessage(msg);
    addLog(msg);
  };

  const handleShotWithBullet = (playerIndex: number, bullet: Chamber) => {
    const name = players[playerIndex];
    let msg = "";

    switch (bullet.type) {
      case "single":
        incrementDrinks(playerIndex, 1);
        msg = `${name} beve 1 shot 🥃`;
        break;

      case "double":
        incrementDrinks(playerIndex, 2);
        msg = `${name} beve 2 shot 💥`;
        break;

      case "buddy": {
        let buddyIndex = playerIndex;
        if (players.length > 1) {
          while (buddyIndex === playerIndex) {
            buddyIndex = Math.floor(Math.random() * players.length);
          }
        }
        incrementDrinks(playerIndex, 1);
        incrementDrinks(buddyIndex, 1);
        const buddyName = players[buddyIndex];
        msg = `${name} beve con ${buddyName} 👯‍♂️`;
        break;
      }

      case "all":
        players.forEach((_, i) => incrementDrinks(i, 1));
        msg = name + " ha preso un ALL-IN: bevono tutti 🍻";
        break;

      case "shield": {
        let victimIndex = playerIndex;
        if (players.length > 1) {
          while (victimIndex === playerIndex) {
            victimIndex = Math.floor(Math.random() * players.length);
          }
        }
        incrementDrinks(victimIndex, 1);
        const victimName = players[victimIndex];
        msg = `${name} si salva e fa bere ${victimName} 😈`;
        break;
      }

      default:
        incrementDrinks(playerIndex, 1);
        msg = `${name} beve 1 shot`;
    }

    setLastMessage(msg);
    addLog(msg);
  };

  const nextPlayerIndex = () =>
    players.length === 0 ? 0 : (currentPlayerIndex + 1) % players.length;

  // Spara sul tamburo corrente, ma NON passa al prossimo turno
  const handleTrigger = () => {
    if (!gameStarted || gameOver || !awaitingShot) return;

    if (currentChamberIndex >= chamberSetup.length) {
      // sicurezza, in pratica qui non dovremmo mai arrivare
      setGameOver(true);
      const endMsg = "Tamburo finito! Partita conclusa 🎉";
      setLastMessage(endMsg);
      addLog(endMsg);
      return;
    }

    const playerIndex = currentPlayerIndex;
    const playerName = players[playerIndex];
    const chamber = chamberSetup[currentChamberIndex];

    triggerGunAnimation();

    if (!chamber.hasBullet) {
      handleShotEmpty(playerName);
    } else {
      handleShotWithBullet(playerIndex, chamber);
    }

    // adesso aspettiamo che l’utente clicchi "Prossimo turno"
    setAwaitingShot(false);
  };

  // Passa al turno successivo, oppure chiude la partita se il tamburo è finito
  const handleNextTurn = () => {
    if (gameOver) return;

    const isLastChamber =
      chamberSetup.length > 0 &&
      currentChamberIndex === chamberSetup.length - 1;

    if (isLastChamber) {
      setGameOver(true);
      const endMsg = "Tamburo finito! Partita conclusa 🎉";
      setLastMessage(endMsg);
      addLog(endMsg);
      return;
    }

    const np = nextPlayerIndex();
    setCurrentPlayerIndex(np);
    setCurrentChamberIndex((prev) => prev + 1);
    setAwaitingShot(true);
    setLastMessage("");
  };

  const currentPlayerName =
    players.length > 0 ? players[currentPlayerIndex] : null;

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        color: "#f9fafb",
        fontFamily: "-apple-system,BlinkMacSystemFont,system-ui,sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(15,23,42,0.92)",
          borderRadius: 18,
          padding: "20px 20px 28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          🍻 Roulette Russa delle Bevute
        </h1>

        {screen === "menu" && (
          <>
            <p
              style={{
                fontSize: 14,
                color: "#9ca3af",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Imposta i partecipanti e il tamburo, poi inizia la partita.
            </p>

            <PlayersSection
              playerName={playerName}
              players={players}
              onPlayerNameChange={setPlayerName}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
            />

            <DrumSection
              chambers={chambers}
              bullets={bullets}
              onChangeChambers={setChambers}
              onChangeBullets={setBullets}
            />

            <section
              style={{
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid rgba(55,65,81,0.7)",
              }}
            >
              <h2 style={{ fontSize: 18, marginBottom: 8 }}>3. Inizia</h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <button
                  onClick={startGame}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#16a34a",
                    color: "#f9fafb",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Avvia partita
                </button>

                <button
                  onClick={resetGameState}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#6b7280",
                    color: "#f9fafb",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </div>
            </section>
          </>
        )}

        {screen === "game" && (
          <section
            style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid rgba(55,65,81,0.7)",
            }}
          >
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Round in corso</h2>

            <p style={{ fontSize: 14, marginBottom: 8 }}>
              Turno di:{" "}
              <strong>{currentPlayerName ?? "??"}</strong> • Colpo{" "}
              {currentChamberIndex + 1}/{chamberSetup.length}
            </p>

            <div
              style={{
                marginTop: 12,
                marginBottom: 16,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 160,
                  height: 80,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, #111827, #1f2937 60%, #374151)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: isFiring ? "translateX(-6px) rotate(-6deg)" : "none",
                  transition: "transform 0.15s ease-out",
                  boxShadow: isFiring
                    ? "0 0 20px rgba(248,250,252,0.5)"
                    : "0 10px 25px rgba(0,0,0,0.6)",
                }}
              >
                <span style={{ fontSize: 40 }}>🔫</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <button
                onClick={handleTrigger}
                disabled={!awaitingShot || gameOver}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "none",
                  backgroundColor: !awaitingShot || gameOver ? "#9ca3af" : "#f97316",
                  color: "#111827",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor:
                    !awaitingShot || gameOver ? "not-allowed" : "pointer",
                }}
              >
                Spara! 🔫
              </button>

              {!awaitingShot && !gameOver && (
                <button
                  onClick={handleNextTurn}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#0ea5e9",
                    color: "#f9fafb",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Prossimo turno ▶
                </button>
              )}

              {gameOver && (
                <button
                  onClick={resetGameState}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#22c55e",
                    color: "#022c22",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Fine partita · Torna al menu
                </button>
              )}
            </div>

            {lastMessage && (
              <p
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "#facc15",
                }}
              >
                {lastMessage}
              </p>
            )}
          </section>
        )}

        {/* Scoreboard + log li mostriamo sempre, così vedi l’andamento della partita */}
        <ScoreboardSection players={players} drinksCount={drinksCount} />
        <LogSection log={log} />
      </div>
    </div>
  );
}
