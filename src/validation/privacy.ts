import type { Privacy } from "../types/event";

export function validatePrivacy(privacy: Privacy | null): string | undefined {
  switch (privacy) {
    case "public":
    case "private":
      return undefined;
    default:
      return "Choose Public or Private.";
  }
}
