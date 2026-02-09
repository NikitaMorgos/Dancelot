import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..", "..");
const TOKENS_FILE = join(projectRoot, "data", "login_tokens.json");

interface TokenEntry {
  userId: string;
  expiresAt: string;
}

function readTokens(): Record<string, TokenEntry> {
  try {
    if (existsSync(TOKENS_FILE)) {
      const data = readFileSync(TOKENS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return {};
}

function writeTokens(tokens: Record<string, TokenEntry>): void {
  const dir = dirname(TOKENS_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 0), "utf-8");
}

export function createLoginToken(userId: string, ttlMinutes: number = 15): string {
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();
  const tokens = readTokens();
  tokens[token] = { userId, expiresAt };
  writeTokens(tokens);
  return token;
}

export function consumeLoginToken(token: string): string | null {
  const tokens = readTokens();
  const entry = tokens[token];
  if (!entry) return null;
  const now = Date.now();
  if (new Date(entry.expiresAt).getTime() < now) {
    delete tokens[token];
    writeTokens(tokens);
    return null;
  }
  delete tokens[token];
  writeTokens(tokens);
  return entry.userId;
}
