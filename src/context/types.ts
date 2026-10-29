import type { FormStatus } from "../state/eventFormState";
import type {
  EventFormErrors,
  EventFormValues,
  EventPayload,
  ImageIssue,
  Privacy,
} from "../types/event";

export type EventFormContextValue = {
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
