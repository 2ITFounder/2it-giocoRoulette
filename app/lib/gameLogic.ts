import { Chamber } from "@/types/game";

export function generateChambers(chambers: number, bullets: number): Chamber[] {
  const totalChambers = Math.max(1, Number.isFinite(chambers) ? chambers : 6);
  const bulletsCount = Math.max(
    1,
    Math.min(Number.isFinite(bullets) ? bullets : 1, totalChambers)
  );

  const chambersArray: Chamber[] = Array.from({ length: totalChambers }, () => ({
    hasBullet: false,
    type: "empty",
  }));

  const positions: number[] = [];
  while (positions.length < bulletsCount) {
    const r = Math.floor(Math.random() * totalChambers);
    if (!positions.includes(r)) positions.push(r);
  }

  const bulletTypes: Chamber["type"][] = ["single", "double", "buddy", "all", "shield"];

  positions.forEach((pos) => {
    const randomType =
      bulletTypes[Math.floor(Math.random() * bulletTypes.length)];
    chambersArray[pos] = {
      hasBullet: true,
      type: randomType,
    };
  });

  return chambersArray;
}

export function specialBulletLabel(chamber: Chamber): string {
  if (!chamber.hasBullet) return "vuoto";

  switch (chamber.type) {
    case "single":
      return "1 shot";
    case "double":
      return "2 shot";
    case "buddy":
      return "buddy";
    case "all":
      return "all-in";
    case "shield":
      return "shield";
    default:
      return "?";
  }
}
