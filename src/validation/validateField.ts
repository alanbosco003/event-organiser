import type { EventFormField, EventFormValues } from "../types/event";
import { validateInvites } from "./email";
import { validateCoverImage } from "./imageFile";
import { validatePrivacy } from "./privacy";
import { validateFullDescription, validateShortDescription, validateTitle } from "./textFields";

/** Checked on submit. Communities are optional, so they are not in this list. */
export const FORM_FIELDS = [
  "image",
  "title",
  "shortDescription",
  "fullDescription",
  "privacy",
  "invites",
] as const satisfies readonly EventFormField[];

export function validateField(
  field: EventFormField,
  values: EventFormValues,
): string | undefined {
  switch (field) {
    case "image":
      return validateCoverImage(values.image);
    case "title":
      return validateTitle(values.title);
    case "shortDescription":
      return validateShortDescription(values.shortDescription);
    case "fullDescription":
      return validateFullDescription(values.fullDescription);
    case "privacy":
      return validatePrivacy(values.privacy);
    case "invites":
      // A public event keeps any typed invites, but they are not an error.
      if (values.privacy !== "private") return undefined;
      return validateInvites(values.invites);
    default: {
      // A new field has to be handled above, or this line fails to typecheck.
      const unknownField: never = field;
      return unknownField;
    }
  }
}
