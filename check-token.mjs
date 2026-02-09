// Быстрая проверка токена: что именно возвращает Telegram API
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, ".env");
if (!existsSync(envPath)) {
  console.log("Файл .env не найден.");
  process.exit(1);
}
const env = readFileSync(envPath, "utf-8");
const lines = env.split(/\r?\n/);
let token = "";
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("TELEGRAM_BOT_TOKEN=")) {
    token = line.slice("TELEGRAM_BOT_TOKEN=".length).trim();
    while (token.length < 40 && i + 1 < lines.length) {
      const next = lines[++i].trim();
      if (!next || next.startsWith("#") || /^[A-Z][A-Z0-9_]*\s*=/.test(next)) break;
      token += next;
    }
    break;
  }
}
token = token.replace(/\s/g, "");
if (!token) {
  console.log("В .env не найден TELEGRAM_BOT_TOKEN.");
  process.exit(1);
}

const url = `https://api.telegram.org/bot${token}/getMe`;
console.log("Запрос к Telegram API...");
console.log("URL (без токена):", "https://api.telegram.org/bot***/getMe");
console.log("Длина токена:", token.length, token.length < 40 ? "(мало! нужно ~46)" : "");
console.log("");

const res = await fetch(url);
const text = await res.text();
console.log("HTTP статус:", res.status, res.statusText);
console.log("Ответ API:", text);

try {
  const json = JSON.parse(text);
  if (json.ok && json.result) {
    console.log("\nТокен рабочий. Бот:", json.result.username);
  } else {
    console.log("\nТокен не принят. Ошибка:", json.description || text);
  }
} catch {
  console.log("\nОтвет не JSON. Возможно, сеть или доступ к api.telegram.org заблокированы.");
}
