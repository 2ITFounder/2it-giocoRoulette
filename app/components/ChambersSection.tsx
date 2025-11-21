import { Chamber } from "../types/game";
import { specialBulletLabel } from "../lib/gameLogic";

interface ChambersSectionProps {
  gameStarted: boolean;
  gameOver: boolean;
  chambers: Chamber[];
  currentChamberIndex: number;
}

const ChambersSection: React.FC<ChambersSectionProps> = ({
  gameStarted,
  gameOver,
  chambers,
  currentChamberIndex,
}) => {
  if (!gameStarted) return null;

  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Tamburo</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
          gap: 8,
        }}
      >
        {chambers.map((ch, i) => {
          const isCurrent = i === currentChamberIndex && !gameOver;

          return (
            <div
              key={i}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: isCurrent ? "#f97316" : "#e5e7eb",
                padding: 6,
                textAlign: "center",
                fontSize: 12,
                backgroundColor: ch.hasBullet ? "#fee2e2" : "#f9fafb",
                color: "#111827",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 2 }}>{i + 1}</div>
              <div style={{ fontSize: 11, color: "#4b5563" }}>
                {specialBulletLabel(ch)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChambersSection;
