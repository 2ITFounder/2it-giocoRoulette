interface DrumSectionProps {
  chambers: number;
  bullets: number;
  onChangeChambers: (value: number) => void;
  onChangeBullets: (value: number) => void;
}

const DrumSection: React.FC<DrumSectionProps> = ({
  chambers,
  bullets,
  onChangeChambers,
  onChangeBullets,
}) => {
  const incrementChambers = () => {
    onChangeChambers(Math.min(24, chambers + 1));
  };

  const decrementChambers = () => {
    onChangeChambers(Math.max(1, chambers - 1));
  };

  const incrementBullets = () => {
    onChangeBullets(Math.min(chambers, bullets + 1));
  };

  const decrementBullets = () => {
    onChangeBullets(Math.max(1, bullets - 1));
  };

  const btnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 999,
    border: "1px solid #4b5563",
    backgroundColor: "#1e293b",
    color: "#f9fafb",
    fontSize: 20,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const valueStyle: React.CSSProperties = {
    minWidth: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#f9fafb",
    fontWeight: 600,
  };

  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>2. Tamburo</h2>

      {/* CAMERE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 14, color: "#e5e7eb", width: 80 }}>
          Camere:
        </span>

        <button style={btnStyle} onClick={decrementChambers}>−</button>

        <span style={valueStyle}>{chambers}</span>

        <button style={btnStyle} onClick={incrementChambers}>+</button>
      </div>

      {/* PROIETTILI */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 14, color: "#e5e7eb", width: 80 }}>
          Proiettili:
        </span>

        <button style={btnStyle} onClick={decrementBullets}>−</button>

        <span style={valueStyle}>{bullets}</span>

        <button style={btnStyle} onClick={incrementBullets}>+</button>
      </div>

      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
        Alcuni proiettili saranno speciali: doppio shot, buddy shot, all-in, shield…
      </p>
    </section>
  );
};

export default DrumSection;
