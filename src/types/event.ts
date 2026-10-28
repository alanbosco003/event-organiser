export type Privacy = "public" | "private";

export type CoverImage = {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
};

export type EventFormValues = {
  image: CoverImage | null;
  title: string;
  shortDescription: string;
  fullDescription: string;
  privacy: Privacy | null;
  communityIds: string[];
  invites: string[];
};

export type EventFormField =
  | "image"
  | "title"
  | "shortDescription"
  | "fullDescription"
  | "privacy"
  | "invites";

export type EventFormErrors = Partial<Record<EventFormField, string>>;

/** Submitted event. Communities exist only for public. Invites exist only for private. */
export type EventPayload = {
  image: CoverImage;
  title: string;
  shortDescription: string;
  fullDescription: string;
  privacy: Privacy;
  communities?: string[];
  invites?: string[];
};

export type ImageIssue =
  | { kind: "permission" }
  | { kind: "invalid-type"; fileName: string }
  | { kind: "too-large"; fileName: string };

export const initialFormValues: EventFormValues = {
  image: null,
  title: "",
  shortDescription: "",
  fullDescription: "",
  privacy: null,
  communityIds: [],
  invites: [],
};
