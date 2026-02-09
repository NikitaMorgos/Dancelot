import { createHmac, createHash } from "crypto";

export function verifyTelegramLogin(
  botToken: string,
  params: Record<string, string>
): { id: string; username?: string; first_name?: string } | null {
  const hash = params.hash;
  if (!hash) return null;
  const secret = createHash("sha256").update(botToken).digest();
  const checkString = Object.keys(params)
    .filter((k) => k !== "hash" && params[k])
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("\n");
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
  if (hmac !== hash) return null;
  return {
    id: params.id,
    username: params.username,
    first_name: params.first_name,
  };
}
