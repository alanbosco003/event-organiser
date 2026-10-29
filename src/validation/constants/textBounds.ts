import { LIMITS } from "../limits";
import type { TextBounds } from "../textLength";

export const titleBounds: TextBounds = {
  min: LIMITS.title.min,
  max: LIMITS.title.max,
  empty: "Add a title.",
  tooShort: `Title must be at least ${LIMITS.title.min} characters (spaces at the start and end don't count).`,
  tooLong: `Title must be ${LIMITS.title.max} characters or fewer.`,
};

export const shortBounds: TextBounds = {
  min: LIMITS.shortDescription.min,
  max: LIMITS.shortDescription.max,
  empty: "Add a short description.",
  tooShort: `Short description must be at least ${LIMITS.shortDescription.min} characters (spaces at the start and end don't count).`,
  tooLong: `Short description must be ${LIMITS.shortDescription.max} characters or fewer.`,
};

export const fullBounds: TextBounds = {
  min: LIMITS.fullDescription.min,
  max: LIMITS.fullDescription.max,
  tooShort: `Add a full description of at least ${LIMITS.fullDescription.min} characters.`,
  tooLong: `Full description must be ${LIMITS.fullDescription.max} characters or fewer.`,
};
