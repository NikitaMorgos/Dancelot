import { getDbPath, initDb } from "./index.js";

const path = getDbPath();
await initDb();
console.log("База данных инициализирована:", path);
