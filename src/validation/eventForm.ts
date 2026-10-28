import type { EventFormErrors, EventFormValues, EventPayload } from "../types/event";
import { validateInvites } from "./email";
import { disallowedEnglishCharacters, englishOnlyMessage } from "./englishText";
import { assessImageFile, imageProblemMessage } from "./imageFile";
import { LIMITS } from "./limits";

export type ValidationResult =
  | { ok: true; errors: EventFormErrors; payload: EventPayload }
  | { ok: false; errors: EventFormErrors; payload: null };

export function validateEventForm(values: EventFormValues): ValidationResult {
  const errors: EventFormErrors = {};

  if (!values.image) {
    errors.image = "Add a cover image.";
  } else {
    const assessed = assessImageFile(values.image);
    if (!assessed.ok) {
      errors.image = imageProblemMessage(values.image.name, assessed.reason);
    }
  }

  const titleError = validateTitle(values.title);
  if (titleError) errors.title = titleError;

  const shortError = validateShortDescription(values.shortDescription);
  if (shortError) errors.shortDescription = shortError;

  const fullError = validateFullDescription(values.fullDescription);
  if (fullError) errors.fullDescription = fullError;

  if (values.privacy !== "public" && values.privacy !== "private") {
    errors.privacy = "Choose Public or Private.";
  }

  if (values.privacy === "private") {
    const inviteError = validateInvites(values.invites);
    if (inviteError) errors.invites = inviteError;
  }

  if (Object.values(errors).some(Boolean)) {
    return { ok: false, errors, payload: null };
  }

  return { ok: true, errors: {}, payload: toPayload(values) };
}

export function validateTitle(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return value.length > 0
      ? "Title must be at least 3 characters (spaces at the start and end don't count)."
      : "Add a title.";
  }
  if (trimmed.length < LIMITS.title.min) {
    return "Title must be at least 3 characters (spaces at the start and end don't count).";
  }
  if (trimmed.length > LIMITS.title.max) {
    return "Title must be 80 characters or fewer.";
  }
  return undefined;
}

export function validateShortDescription(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return value.length > 0
      ? "Short description must be at least 10 characters (spaces at the start and end don't count)."
      : "Add a short description.";
  }

  const disallowed = disallowedEnglishCharacters(trimmed);
  if (disallowed.length > 0) return englishOnlyMessage(disallowed);

  if (trimmed.length < LIMITS.shortDescription.min) {
    return "Short description must be at least 10 characters (spaces at the start and end don't count).";
  }
  if (trimmed.length > LIMITS.shortDescription.max) {
    return "Short description must be 150 characters or fewer.";
  }
  return undefined;
}

export function validateFullDescription(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length < LIMITS.fullDescription.min) {
    return "Add a full description of at least 20 characters.";
  }
  if (trimmed.length > LIMITS.fullDescription.max) {
    return "Full description must be 2000 characters or fewer.";
  }
  return undefined;
}

function toPayload(values: EventFormValues): EventPayload {
  if (!values.image || (values.privacy !== "public" && values.privacy !== "private")) {
    throw new Error("Cannot build a payload from an invalid form.");
  }

  const payload: EventPayload = {
    image: values.image,
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    fullDescription: values.fullDescription.trim(),
    privacy: values.privacy,
  };

  if (values.privacy === "public") {
    payload.communities = [...values.communityIds];
  } else {
    payload.invites = values.invites.map((email) => email.trim()).filter(Boolean);
  }

  return payload;
}
