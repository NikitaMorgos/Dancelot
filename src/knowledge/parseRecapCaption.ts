/**
 * Парсинг подписи к рекапу (видео мастер-класса).
 * Ожидаемый формат в тексте:
 *   Стиль: WCS
 *   Уровень: продвинутый
 *   Навык: техника
 *   Название: Тормоза и фрейм (опционально)
 *   Остальной текст — заметки.
 * Если полей нет, весь текст считается заметками, стиль/уровень/навык — по умолчанию.
 */

export interface ParsedRecap {
  style: string;
  level: string | null;
  skill_type: string | null;
  title: string | null;
  notes: string;
}

const STYLE_KEYS = ["стиль", "style"];
const LEVEL_KEYS = ["уровень", "level"];
const SKILL_KEYS = ["навык", "skill", "тип"];
const TITLE_KEYS = ["название", "title", "тема"];

export function parseRecapCaption(caption: string): ParsedRecap {
  const lines = caption.trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let style: string = "другое";
  let level: string | null = null;
  let skill_type: string | null = null;
  let title: string | null = null;
  const noteLines: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    let matched = false;

    for (const key of STYLE_KEYS) {
      if (lower.startsWith(key + ":")) {
        style = line.slice(key.length + 1).trim() || "другое";
        matched = true;
        break;
      }
    }
    if (matched) continue;

    for (const key of LEVEL_KEYS) {
      if (lower.startsWith(key + ":")) {
        level = line.slice(key.length + 1).trim() || null;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    for (const key of SKILL_KEYS) {
      if (lower.startsWith(key + ":")) {
        skill_type = line.slice(key.length + 1).trim() || null;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    for (const key of TITLE_KEYS) {
      if (lower.startsWith(key + ":")) {
        title = line.slice(key.length + 1).trim() || null;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    noteLines.push(line);
  }

  const notes = noteLines.join("\n").trim() || "Без текстовых заметок.";
  return { style, level, skill_type, title, notes };
}
