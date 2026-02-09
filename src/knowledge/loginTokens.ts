import { randomBytes } from "crypto";
import { getDb } from "../db/index.js";

export function createLoginToken(userId: string, ttlMinutes: number = 15): string {
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();
  const db = getDb();
  db.prepare("INSERT INTO login_tokens (token, user_id, expires_at) VALUES (?, ?, ?)").run(
    token,
    userId,
    expiresAt
  );
  return token;
}

export function consumeLoginToken(token: string): string | null {
  const db = getDb();
  const row = db
    .prepare("SELECT user_id, expires_at FROM login_tokens WHERE token = ?")
    .get(token) as { user_id: string; expires_at: string } | undefined;
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM login_tokens WHERE token = ?").run(token);
    return null;
  }
  db.prepare("DELETE FROM login_tokens WHERE token = ?").run(token);
  return row.user_id;
}
