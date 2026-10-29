import type { EventFormErrors, EventFormValues, ImageIssue } from "../types/event";
import { imageIssueMessage } from "../validation/imageFile";
import { shortDescriptionEnglishError } from "../validation/textFields";

type DisplayedErrorInput = {
  validationErrors: EventFormErrors;
  values: EventFormValues;
  imageIssue: ImageIssue | null;
  inviteDraftError: string | null;
  submitAttempted: boolean;
};

/** Decide which messages the form should show right now. */
export function displayedErrors({
  validationErrors,
  values,
  imageIssue,
  inviteDraftError,
  submitAttempted,
}: DisplayedErrorInput): EventFormErrors {
  const next: EventFormErrors = {};

  if (!values.image && imageIssue) {
    next.image = imageIssueMessage(imageIssue);
  } else if (submitAttempted && validationErrors.image) {
    next.image = validationErrors.image;
  }

  const englishError = shortDescriptionEnglishError(values.shortDescription);
  if (englishError) {
    next.shortDescription = englishError;
  } else if (submitAttempted && validationErrors.shortDescription) {
    next.shortDescription = validationErrors.shortDescription;
  }

  if (submitAttempted) {
    if (validationErrors.title) next.title = validationErrors.title;
    if (validationErrors.fullDescription) {
      next.fullDescription = validationErrors.fullDescription;
    }
    if (validationErrors.privacy) next.privacy = validationErrors.privacy;
  }

  if (values.privacy === "private") {
    if (inviteDraftError) next.invites = inviteDraftError;
    else if (submitAttempted && validationErrors.invites) {
      next.invites = validationErrors.invites;
    }
  }

  return next;
}
