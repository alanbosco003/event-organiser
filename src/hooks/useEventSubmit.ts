import { Keyboard } from "react-native";

import type { EventFormState } from "../state/eventFormState";
import { validateEventForm } from "../validation/eventForm";
import type { PendingInviteCommit } from "./useInvites";

const SUBMIT_DELAY_MS = 1100;

export function useEventSubmit(
  state: EventFormState,
  commitPendingInvites: () => PendingInviteCommit,
) {
  const submit = async () => {
    // A second press during the creating state must not start another submit.
    if (state.status === "submitting") return;

    Keyboard.dismiss();
    const id = startSubmission(state);
    const { nextValues, draftError } = commitPendingInvites();

    state.setSubmitAttempted(true);
    const result = validateEventForm(nextValues);
    // A rejected photo is not a cover. Keep that failure even if the rest of the form is valid.
    const blockedByImage = !nextValues.image && state.imageIssue !== null;

    if (!result.ok || draftError || blockedByImage) {
      markSubmitFailed(state);
      return;
    }

    state.setStatus("submitting");
    await delay(SUBMIT_DELAY_MS);
    // Reset bumps the id, so a submit that was already waiting does not save over a cleared form.
    if (state.submissionId.current !== id) return;

    state.setPayload(result.payload);
    state.setStatus("success");
  };

  const reset = () => {
    state.submissionId.current += 1;
    state.clearForm();
  };

  return { submit, reset };
}

function startSubmission(state: EventFormState): number {
  const id = state.submissionId.current + 1;
  state.submissionId.current = id;
  return id;
}

function markSubmitFailed(state: EventFormState) {
  state.setStatus("editing");
  state.setFailureNonce((count) => count + 1);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
