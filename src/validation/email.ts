import { LIMITS } from "./limits";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Practical format check: local@domain.tld. Not a full RFC parser. */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 3 || email.length > 254) return false;
  if (email.includes("..")) return false;

  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || !domain) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (!EMAIL_PATTERN.test(email)) return false;

  const tld = domain.split(".").pop() ?? "";
  return tld.length >= 2;
}

export function hasInvite(invites: string[], email: string): boolean {
  const key = normalizeEmail(email);
  return invites.some((item) => normalizeEmail(item) === key);
}

/** Split a pasted list on commas, semicolons, and whitespace. */
export function splitEmailInput(raw: string): string[] {
  return raw
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

export type InviteDraftResult = {
  invites: string[];
  draft: string;
  error: string | null;
};

/**
 * Add emails from a text field.
 * Valid new addresses are kept, duplicates are dropped, and invalid ones stay in the draft.
 */
export function commitInviteDraft(
  existing: string[],
  raw: string,
): InviteDraftResult {
  const tokens = splitEmailInput(raw);
  if (tokens.length === 0) {
    return {
      invites: existing,
      draft: "",
      error: "Enter an email address.",
    };
  }

  const invalid: string[] = [];
  const fresh: string[] = [];
  const seen = new Set(existing.map(normalizeEmail));

  for (const token of tokens) {
    if (!isValidEmail(token)) {
      invalid.push(token);
      continue;
    }

    const key = normalizeEmail(token);
    if (seen.has(key)) continue;
    seen.add(key);
    fresh.push(token.trim());
  }

  const room = Math.max(LIMITS.invites.max - existing.length, 0);
  const accepted = fresh.slice(0, room);
  const overflow = fresh.slice(accepted.length);

  let error: string | null = null;
  if (invalid.length > 0) {
    error = `"${invalid[0]}" isn't a valid email address.`;
  } else if (overflow.length > 0) {
    error = "You can invite up to 20 people.";
  }

  return {
    invites: [...existing, ...accepted],
    draft: [...overflow, ...invalid].join(", "),
    error,
  };
}

export function validateInvites(invites: string[]): string | undefined {
  const emails = invites.map((email) => email.trim()).filter((email) => email.length > 0);

  if (emails.length < LIMITS.invites.min) {
    return "Add at least one email address.";
  }

  if (emails.length > LIMITS.invites.max) {
    return "You can invite up to 20 people.";
  }

  const invalid = emails.find((email) => !isValidEmail(email));
  if (invalid) {
    return `"${invalid}" isn't a valid email address.`;
  }

  return undefined;
}
