import type { EventFormState } from "../state/eventFormState";
import type { EventFormValues } from "../types/event";
import { commitInviteDraft, normalizeEmail } from "../validation/email";

export type PendingInviteCommit = {
  nextValues: EventFormValues;
  draftError: string | null;
};

export function useInvites(state: EventFormState) {
  const setInviteDraft = (draft: string) => {
    state.setInviteDraftText(draft);
    state.setInviteDraftError(null);
  };

  const addInviteDraft = () => {
    const result = commitInviteDraft(state.values.invites, state.inviteDraft);
    state.setValues((current) => ({ ...current, invites: result.invites }));
    state.setInviteDraftText(result.draft);
    state.setInviteDraftError(result.error);
  };

  const addSavedContact = (email: string) => {
    const result = commitInviteDraft(state.values.invites, email);
    state.setValues((current) => ({ ...current, invites: result.invites }));
    if (result.error) state.setInviteDraftError(result.error);
  };

  const removeInvite = (email: string) => {
    const key = normalizeEmail(email);
    state.setValues((current) => ({
      ...current,
      invites: current.invites.filter((item) => normalizeEmail(item) !== key),
    }));
  };

  /** Private submit commits a leftover draft. Public submit leaves it alone. */
  const commitPendingInvites = (): PendingInviteCommit => {
    const hasDraft = state.values.privacy === "private" && state.inviteDraft.trim().length > 0;
    if (!hasDraft) {
      return { nextValues: state.values, draftError: null };
    }

    const applied = commitInviteDraft(state.values.invites, state.inviteDraft);
    const nextValues = { ...state.values, invites: applied.invites };
    state.setValues(nextValues);
    state.setInviteDraftText(applied.draft);
    state.setInviteDraftError(applied.error);

    return { nextValues, draftError: applied.error };
  };

  return {
    setInviteDraft,
    addInviteDraft,
    addSavedContact,
    removeInvite,
    commitPendingInvites,
  };
}
