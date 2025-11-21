interface GameSectionProps {
  players: string[];
  gameStarted: boolean;
  gameOver: boolean;
  currentPlayerName: string | null;
  currentChamberIndex: number;
  totalChambers: number;
  lastMessage: string;
  onStart: () => void;
  onReset: () => void;
  onNewRound: () => void;
  onTrigger: () => void;
}

const GameSection: React.FC<GameSectionProps> = ({
  players,
  gameStarted,
  gameOver,
  currentPlayerName,
  currentChamberIndex,
  totalChambers,
  lastMessage,
  onStart,
  onReset,
  onNewRound,
  onTrigger,
}) => {
  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>3. Gioca</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <button
          onClick={onStart}
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
          onClick={onReset}
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
          Reset totale
        </button>

        {gameStarted && (
          <button
            onClick={onNewRound}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "none",
              backgroundColor: "#0ea5e9",
              color: "#f9fafb",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Nuovo giro
          </button>
        )}
      </div>

      {gameStarted && (
        <>
          <p style={{ marginTop: 10, fontSize: 14 }}>
            Turno di:{" "}
            <strong>{currentPlayerName ?? "??"}</strong> • Camera:{" "}
            {currentChamberIndex + 1}/{totalChambers}
          </p>

          <button
            onClick={onTrigger}
            disabled={gameOver || players.length === 0}
            style={{
              marginTop: 8,
              padding: "12px 22px",
              borderRadius: 999,
              border: "none",
              color: "#111827",
              fontSize: 18,
              fontWeight: 700,
              backgroundColor: gameOver ? "#9ca3af" : "#f97316",
              cursor: gameOver ? "not-allowed" : "pointer",
            }}
          >
            {gameOver ? "Partita finita" : "Spara! 🔫"}
          </button>

          {lastMessage && (
            <p
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#facc15",
              }}
            >
              {lastMessage}
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default GameSection;
