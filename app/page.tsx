import RouletteGame from "./components/RouletteGame";

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a 0, #020617 60%)",
        padding: 24,
      }}
    >
      <RouletteGame />
    </main>
  );
}
