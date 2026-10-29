import type { EventFormErrors, EventFormValues, EventPayload } from "../types/event";
import { FORM_FIELDS, validateField } from "./validateField";

export type ValidationResult =
  | { ok: true; errors: EventFormErrors; payload: EventPayload }
  | { ok: false; errors: EventFormErrors; payload: null };

export function validateEventForm(values: EventFormValues): ValidationResult {
  const errors = collectErrors(values);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, payload: null };
  }

  return { ok: true, errors: {}, payload: toPayload(values) };
}

function collectErrors(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};

  for (const field of FORM_FIELDS) {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  }

  return errors;
}

function toPayload(values: EventFormValues): EventPayload {
  if (!values.image || (values.privacy !== "public" && values.privacy !== "private")) {
    throw new Error("Cannot build a payload from an invalid form.");
  }

  // Trim only for the saved event. The fields still show the text the user typed.
  const payload: EventPayload = {
    image: values.image,
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    fullDescription: values.fullDescription.trim(),
    privacy: values.privacy,
  };

  // Each mode stores only its own list. An empty communities array means everyone.
  // The other list stays in form state so switching privacy can restore it.
  if (values.privacy === "public") {
    payload.communities = [...values.communityIds];
  } else {
    payload.invites = values.invites.map((email) => email.trim()).filter(Boolean);
  }

  return payload;
}
