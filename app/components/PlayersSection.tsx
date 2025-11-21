import React from "react";

interface PlayersSectionProps {
  playerName: string;
  players: string[];
  onPlayerNameChange: (value: string) => void;
  onAddPlayer: () => void;
  onRemovePlayer: (index: number) => void;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  playerName,
  players,
  onPlayerNameChange,
  onAddPlayer,
  onRemovePlayer,
}) => {
  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>1. Partecipanti</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={playerName}
          placeholder="Nome giocatore"
          onChange={(e) => onPlayerNameChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddPlayer()}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "8px 10px",
            borderRadius: 999,
            border: "1px solid #4b5563",
            backgroundColor: "#020617",
            color: "#f9fafb",
            outline: "none",
            fontSize: 14,
          }}
        />
        <button
          onClick={onAddPlayer}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            backgroundColor: "#4f46e5",
            color: "#f9fafb",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Aggiungi
        </button>
      </div>

      {players.length === 0 && (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
          Aggiungi almeno 2 persone per iniziare.
        </p>
      )}

      {players.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: 8,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {players.map((p, i) => (
            <li
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                backgroundColor: "#020617",
                border: "1px solid #4b5563",
                fontSize: 13,
              }}
            >
              <span>{p}</span>
              <button
                onClick={() => onRemovePlayer(i)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9ca3af",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PlayersSection;
