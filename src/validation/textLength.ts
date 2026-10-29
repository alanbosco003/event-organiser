export type TextBounds = {
  min: number;
  max: number;
  /** Used when the field is completely empty. Whitespace-only input uses `tooShort`. */
  empty?: string;
  tooShort: string;
  tooLong: string;
};

/**
 * Trim, then check length.
 * `whenPresent` runs only after the value survives the trim, and before min/max.
 */
export function validateBoundedText(
  value: string,
  bounds: TextBounds,
  whenPresent?: (trimmed: string) => string | undefined,
): string | undefined {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    if (value.length > 0) return bounds.tooShort;
    return bounds.empty ?? bounds.tooShort;
  }

  const extra = whenPresent?.(trimmed);
  if (extra) return extra;

  if (trimmed.length < bounds.min) return bounds.tooShort;
  if (trimmed.length > bounds.max) return bounds.tooLong;
  return undefined;
}
