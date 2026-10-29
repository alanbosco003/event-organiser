import { EMAIL_PATTERN } from "./constants/emailPattern";
import { LIMITS } from "./limits";

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

  return {
    invites: [...existing, ...accepted],
    draft: [...overflow, ...invalid].join(", "),
    error: inviteDraftError(invalid, overflow),
  };
}

export function validateInvites(invites: string[]): string | undefined {
  const emails = nonemptyEmails(invites);

  if (emails.length < LIMITS.invites.min) {
    return "Add at least one email address.";
  }

  if (emails.length > LIMITS.invites.max) {
    return inviteLimitMessage();
  }

  const invalid = emails.find((email) => !isValidEmail(email));
  if (invalid) return invalidEmailMessage(invalid);

  return undefined;
}

function nonemptyEmails(invites: string[]): string[] {
  return invites.map((email) => email.trim()).filter((email) => email.length > 0);
}

function inviteDraftError(invalid: string[], overflow: string[]): string | null {
  const firstInvalid = invalid[0];
  if (firstInvalid) return invalidEmailMessage(firstInvalid);
  if (overflow.length > 0) return inviteLimitMessage();
  return null;
}

function invalidEmailMessage(email: string): string {
  return `"${email}" isn't a valid email address.`;
}

function inviteLimitMessage(): string {
  return `You can invite up to ${LIMITS.invites.max} people.`;
}
