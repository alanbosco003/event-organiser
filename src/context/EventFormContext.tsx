import { createContext, useContext, type ReactNode } from "react";

import { useCoverImage } from "../hooks/useCoverImage";
import { useEventSubmit } from "../hooks/useEventSubmit";
import { useFormErrors } from "../hooks/useFormErrors";
import { useFormFields } from "../hooks/useFormFields";
import { useInvites } from "../hooks/useInvites";
import { useEventFormState } from "../state/eventFormState";
import type { EventFormContextValue } from "./types";

const EventFormContext = createContext<EventFormContextValue | null>(null);

export function EventFormProvider({ children }: { children: ReactNode }) {
  const state = useEventFormState();
  const fields = useFormFields(state);
  const image = useCoverImage(state);
  const invites = useInvites(state);
  const submission = useEventSubmit(state, invites.commitPendingInvites);
  const formErrors = useFormErrors(state);

  const value: EventFormContextValue = {
    values: state.values,
    errors: formErrors.errors,
    imageIssue: state.imageIssue,
    inviteDraft: state.inviteDraft,
    status: state.status,
    payload: state.payload,
    attentionCount: formErrors.attentionCount,
    failureNonce: state.failureNonce,
    setTitle: fields.setTitle,
    setShortDescription: fields.setShortDescription,
    setFullDescription: fields.setFullDescription,
    setPrivacy: fields.setPrivacy,
    toggleCommunity: fields.toggleCommunity,
    pickImage: image.pickImage,
    removeImage: image.removeImage,
    openSettings: image.openSettings,
    setInviteDraft: invites.setInviteDraft,
    addInviteDraft: invites.addInviteDraft,
    addSavedContact: invites.addSavedContact,
    removeInvite: invites.removeInvite,
    submit: submission.submit,
    reset: submission.reset,
  };

  return <EventFormContext.Provider value={value}>{children}</EventFormContext.Provider>;
}

export function useEventForm(): EventFormContextValue {
  const context = useContext(EventFormContext);
  if (!context) {
    throw new Error("useEventForm must be used within EventFormProvider");
  }
  return context;
}
