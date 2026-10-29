import { PUNCTUATION } from "./constants/punctuation";

/** English letters, digits, whitespace, and basic punctuation. Other scripts are rejected. */
export function isAllowedEnglishChar(char: string): boolean {
  if (/[A-Za-z0-9]/.test(char)) return true;
  if (/\s/.test(char)) return true;
  return PUNCTUATION.has(char);
}

/** Each disallowed character once, in the order it first appears. */
export function disallowedEnglishCharacters(value: string): string[] {
  const seen = new Set<string>();
  const found: string[] = [];

  for (const char of value) {
    if (isAllowedEnglishChar(char) || seen.has(char)) continue;
    seen.add(char);
    found.push(char);
  }

  return found;
}

export function englishOnlyMessage(chars: string[]): string {
  const sample = chars.slice(0, 3).map((char) => `"${char}"`);
  const list =
    chars.length > 3 ? `${sample.join(", ")} and others` : sample.join(", ");
  return `Use English letters, numbers and basic punctuation only. Remove ${list}.`;
}
