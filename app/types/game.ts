export type BulletType = "empty" | "single" | "double" | "buddy" | "all" | "shield";

export interface Chamber {
  hasBullet: boolean;
  type: BulletType;
}

export interface LogEntry {
  id: number;
  message: string;
}
