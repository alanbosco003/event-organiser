import type { EventFormField, EventFormValues } from "../types/event";
import { validateInvites } from "./email";
import { validateCoverImage } from "./imageFile";
import { validatePrivacy } from "./privacy";
import { validateFullDescription, validateShortDescription, validateTitle } from "./textFields";

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
      if (values.privacy !== "private") return undefined;
      return validateInvites(values.invites);
    default: {
      const unknownField: never = field;
      return unknownField;
    }
  }
}
