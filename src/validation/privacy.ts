import type { Privacy } from "../types/event";

/** `null` means the user has not chosen yet. Only the two named choices pass. */
export function validatePrivacy(privacy: Privacy | null): string | undefined {
  switch (privacy) {
    case "public":
    case "private":
      return undefined;
    default:
      return "Choose Public or Private.";
  }
}
