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
  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>2. Tamburo</h2>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label style={{ fontSize: 14, color: "#e5e7eb" }}>
          Camere:
          <input
             type="number"
             inputMode="numeric"
             step={1}
             min={1}
             max={24}
             value={chambers}
             onChange={(e) => {
                const raw = e.target.value;
                const num = raw === "" ? 0 : Number(raw);
                onChangeChambers(num);
             }}
             style={{
               width: 70,
               padding: "6px 8px",
               borderRadius: 999,
               border: "1px solid #4b5563",
               backgroundColor: "#020617",
               color: "#f9fafb",
               outline: "none",
               fontSize: 14,
              marginLeft: 6,
             }}
        />
        </label>

        <label style={{ fontSize: 14, color: "#e5e7eb" }}>
          Proiettili:
          <input
            type="number"
            inputMode="numeric"
            step={1}
            min={1}
            max={chambers || 24}
            value={bullets}
            onChange={(e) => {
                const raw = e.target.value;
                const num = raw === "" ? 0 : Number(raw);
                onChangeBullets(num);
            }}
            style={{
                width: 70,
                padding: "6px 8px",
                borderRadius: 999,
                border: "1px solid #4b5563",
                backgroundColor: "#020617",
                color: "#f9fafb",
                outline: "none",
                fontSize: 14,
                marginLeft: 6,
            }}
        />
        </label>
      </div>

      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
        Alcuni proiettili saranno speciali: doppio shot, buddy shot, all-in,
        shield…
      </p>
    </section>
  );
};

export default DrumSection;
