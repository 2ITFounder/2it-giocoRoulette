import { LogEntry } from "../types/game";

interface LogSectionProps {
  log: LogEntry[];
}

const LogSection: React.FC<LogSectionProps> = ({ log }) => {
  if (log.length === 0) return null;

  return (
    <section
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(55,65,81,0.7)",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Log</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          maxHeight: 180,
          overflowY: "auto",
          fontSize: 13,
        }}
      >
        {log.map((entry) => (
          <li
            key={entry.id}
            style={{
              padding: "3px 0",
              borderBottom: "1px dotted rgba(55,65,81,0.6)",
            }}
          >
            {entry.message}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LogSection;
