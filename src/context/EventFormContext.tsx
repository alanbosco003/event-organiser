import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Keyboard, Linking } from "react-native";

import { pickCoverImage } from "../services/pickCoverImage";
import {
  initialFormValues,
  type EventFormErrors,
  type EventFormValues,
  type EventPayload,
  type ImageIssue,
  type Privacy,
} from "../types/event";
import { commitInviteDraft, type InviteDraftResult } from "../validation/email";
import { imageIssueMessage } from "../validation/imageFile";
import { validateEventForm } from "../validation/eventForm";

const SUBMIT_DELAY_MS = 700;

type FormStatus = "editing" | "submitting" | "success";

type EventFormContextValue = {
  values: EventFormValues;
  errors: EventFormErrors;
  imageIssue: ImageIssue | null;
  inviteDraft: string;
  status: FormStatus;
  payload: EventPayload | null;
  attentionCount: number;
  failureNonce: number;
  setTitle: (value: string) => void;
  setShortDescription: (value: string) => void;
  setFullDescription: (value: string) => void;
  setPrivacy: (privacy: Privacy) => void;
  toggleCommunity: (id: string) => void;
  pickImage: () => Promise<void>;
  removeImage: () => void;
  openSettings: () => void;
  setInviteDraft: (value: string) => void;
  addInviteDraft: () => void;
  addSavedContact: (email: string) => void;
  removeInvite: (email: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
};

const EventFormContext = createContext<EventFormContextValue | null>(null);

export function EventFormProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<EventFormValues>(initialFormValues);
  const [imageIssue, setImageIssue] = useState<ImageIssue | null>(null);
  const [inviteDraft, setInviteDraftState] = useState("");
  const [inviteDraftError, setInviteDraftError] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("editing");
  const [payload, setPayload] = useState<EventPayload | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [failureNonce, setFailureNonce] = useState(0);
  const submissionId = useRef(0);

  const validation = validateEventForm(values);
  const errors = displayedErrors({
    validationErrors: validation.errors,
    values,
    imageIssue,
    inviteDraftError,
    submitAttempted,
  });

  const attentionCount = submitAttempted
    ? Object.values(errors).filter(Boolean).length
    : 0;

  const update = (patch: Partial<EventFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
  };

  const applyInvites = (result: InviteDraftResult, keepDraftOnSuccess: boolean) => {
    setValues((current) => ({ ...current, invites: result.invites }));
    if (result.error || !keepDraftOnSuccess) {
      setInviteDraftState(result.draft);
    }
    setInviteDraftError(result.error);
  };

  const failSubmit = () => {
    setStatus("editing");
    setFailureNonce((count) => count + 1);
  };

  const value: EventFormContextValue = {
    values,
    errors,
    imageIssue,
    inviteDraft,
    status,
    payload,
    attentionCount,
    failureNonce,
    setTitle: (title) => update({ title }),
    setShortDescription: (shortDescription) => update({ shortDescription }),
    setFullDescription: (fullDescription) => update({ fullDescription }),
    setPrivacy: (privacy) => update({ privacy }),
    toggleCommunity: (id) => {
      setValues((current) => ({
        ...current,
        communityIds: current.communityIds.includes(id)
          ? current.communityIds.filter((item) => item !== id)
          : [...current.communityIds, id],
      }));
    },
    pickImage: async () => {
      const result = await pickCoverImage();
      if (result.type === "canceled") return;
      if (result.type === "permission") {
        setImageIssue({ kind: "permission" });
        return;
      }
      if (result.type === "rejected") {
        setImageIssue(result.issue);
        return;
      }
      setImageIssue(null);
      update({ image: result.image });
    },
    removeImage: () => {
      setImageIssue(null);
      update({ image: null });
    },
    openSettings: () => {
      Linking.openSettings().catch(() => undefined);
    },
    setInviteDraft: (draft) => {
      setInviteDraftState(draft);
      setInviteDraftError(null);
    },
    addInviteDraft: () => {
      const result = commitInviteDraft(values.invites, inviteDraft);
      applyInvites(result, false);
    },
    addSavedContact: (email) => {
      const result = commitInviteDraft(values.invites, email);
      setValues((current) => ({ ...current, invites: result.invites }));
      if (result.error) setInviteDraftError(result.error);
    },
    removeInvite: (email) => {
      const key = email.trim().toLowerCase();
      setValues((current) => ({
        ...current,
        invites: current.invites.filter((item) => item.trim().toLowerCase() !== key),
      }));
    },
    submit: async () => {
      if (status === "submitting") return;
      Keyboard.dismiss();

      const id = submissionId.current + 1;
      submissionId.current = id;

      let nextValues = values;
      let draftError: string | null = null;

      if (values.privacy === "private" && inviteDraft.trim()) {
        const applied = commitInviteDraft(values.invites, inviteDraft);
        nextValues = { ...values, invites: applied.invites };
        draftError = applied.error;
        setValues(nextValues);
        setInviteDraftState(applied.draft);
        setInviteDraftError(applied.error);
      }

      setSubmitAttempted(true);
      const result = validateEventForm(nextValues);
      const blockedByImage = !nextValues.image && imageIssue !== null;

      if (!result.ok || draftError || blockedByImage) {
        failSubmit();
        return;
      }

      setStatus("submitting");
      await delay(SUBMIT_DELAY_MS);
      if (submissionId.current !== id) return;
      setPayload(result.payload);
      setStatus("success");
    },
    reset: () => {
      submissionId.current += 1;
      setValues(initialFormValues);
      setImageIssue(null);
      setInviteDraftState("");
      setInviteDraftError(null);
      setStatus("editing");
      setPayload(null);
      setSubmitAttempted(false);
    },
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

function displayedErrors({
  validationErrors,
  values,
  imageIssue,
  inviteDraftError,
  submitAttempted,
}: {
  validationErrors: EventFormErrors;
  values: EventFormValues;
  imageIssue: ImageIssue | null;
  inviteDraftError: string | null;
  submitAttempted: boolean;
}): EventFormErrors {
  const next: EventFormErrors = {};

  if (!values.image && imageIssue) {
    next.image = imageIssueMessage(imageIssue);
  } else if (submitAttempted && validationErrors.image) {
    next.image = validationErrors.image;
  }

  if (submitAttempted) {
    if (validationErrors.title) next.title = validationErrors.title;
    if (validationErrors.shortDescription) {
      next.shortDescription = validationErrors.shortDescription;
    }
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

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
