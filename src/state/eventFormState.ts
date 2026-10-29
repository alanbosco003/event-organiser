import { useRef, useState } from "react";

import {
  initialFormValues,
  type EventFormValues,
  type EventPayload,
  type ImageIssue,
} from "../types/event";

export type FormStatus = "editing" | "submitting" | "success";

export function useEventFormState() {
  const [values, setValues] = useState<EventFormValues>(initialFormValues);
  const [imageIssue, setImageIssue] = useState<ImageIssue | null>(null);
  const [inviteDraft, setInviteDraftText] = useState("");
  const [inviteDraftError, setInviteDraftError] = useState<string | null>(null);

  const [status, setStatus] = useState<FormStatus>("editing");
  const [payload, setPayload] = useState<EventPayload | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [failureNonce, setFailureNonce] = useState(0);
  // Bumped when a submit starts and when the form is cleared, so a late submit can see it was cancelled.
  const submissionId = useRef(0);

  const patchValues = (patch: Partial<EventFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
  };

  const clearForm = () => {
    setValues(initialFormValues);
    setImageIssue(null);
    setInviteDraftText("");
    setInviteDraftError(null);
    setStatus("editing");
    setPayload(null);
    setSubmitAttempted(false);
  };

  return {
    values,
    setValues,
    patchValues,
    clearForm,
    imageIssue,
    setImageIssue,
    inviteDraft,
    setInviteDraftText,
    inviteDraftError,
    setInviteDraftError,
    status,
    setStatus,
    payload,
    setPayload,
    submitAttempted,
    setSubmitAttempted,
    failureNonce,
    setFailureNonce,
    submissionId,
  };
}

export type EventFormState = ReturnType<typeof useEventFormState>;
