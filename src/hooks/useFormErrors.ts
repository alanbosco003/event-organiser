import { displayedErrors } from "../context/displayedErrors";
import type { EventFormState } from "../state/eventFormState";
import { validateEventForm } from "../validation/eventForm";

export function useFormErrors(state: EventFormState) {
  const validation = validateEventForm(state.values);
  const errors = displayedErrors({
    validationErrors: validation.errors,
    values: state.values,
    imageIssue: state.imageIssue,
    inviteDraftError: state.inviteDraftError,
    submitAttempted: state.submitAttempted,
  });

  // The summary banner counts only after Create event. Immediate field errors do not raise it.
  const attentionCount = state.submitAttempted
    ? Object.values(errors).filter(Boolean).length
    : 0;

  return { errors, attentionCount };
}
