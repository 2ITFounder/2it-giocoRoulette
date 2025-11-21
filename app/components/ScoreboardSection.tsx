interface ScoreboardSectionProps {
  players: string[];
  drinksCount: number[];
}

const ScoreboardSection: React.FC<ScoreboardSectionProps> = ({
  players,
  drinksCount,
}) => {
  if (players.length === 0) return null;

  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Bevute per giocatore</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {players.map((p, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 0",
              fontSize: 14,
            }}
          >
            <span>{p}</span>
            <span style={{ fontWeight: 600 }}>
              {drinksCount[i] || 0} shot
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ScoreboardSection;
