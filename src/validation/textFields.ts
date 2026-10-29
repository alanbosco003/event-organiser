import { fullBounds, shortBounds, titleBounds } from "./constants/textBounds";
import { disallowedEnglishCharacters, englishOnlyMessage } from "./englishText";
import { validateBoundedText } from "./textLength";

export function validateTitle(value: string): string | undefined {
  return validateBoundedText(value, titleBounds);
}

export function validateShortDescription(value: string): string | undefined {
  return validateBoundedText(value, shortBounds, englishCharacterError);
}

/** Non-English characters, ignoring empty and length problems. */
export function shortDescriptionEnglishError(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return englishCharacterError(trimmed);
}

export function validateFullDescription(value: string): string | undefined {
  return validateBoundedText(value, fullBounds);
}

function englishCharacterError(trimmed: string): string | undefined {
  const disallowed = disallowedEnglishCharacters(trimmed);
  if (disallowed.length === 0) return undefined;
  return englishOnlyMessage(disallowed);
}
