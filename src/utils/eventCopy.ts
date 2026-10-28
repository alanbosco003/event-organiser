import type { EventPayload, Privacy } from "../types/event";

export const ATTENTION_BODY =
  "Fix the highlighted fields, then tap Create event again.";

export function attentionTitle(count: number): string {
  return count === 1
    ? "1 field needs your attention"
    : `${count} fields need your attention`;
}

export function visibilityLabel(privacy: Privacy): string {
  return privacy === "public" ? "Public" : "Private";
}

export function inviteCountLabel(count: number): string {
  return count === 1 ? "1 person" : `${count} people`;
}

export function communityCountLabel(count: number): string {
  if (count === 0) return "Everyone";
  return count === 1 ? "1 community" : `${count} communities`;
}

export function successMessage(payload: EventPayload): string {
  if (payload.privacy === "private") {
    const count = payload.invites?.length ?? 0;
    const noun = count === 1 ? "an invite" : "invites";
    return `${payload.title} is ready. We've sent ${noun} to ${inviteCountLabel(count)}.`;
  }

  const count = payload.communities?.length ?? 0;
  if (count === 0) {
    return `${payload.title} is ready. It's visible to everyone.`;
  }

  return `${payload.title} is ready. It's posted to ${communityCountLabel(count)}.`;
}
