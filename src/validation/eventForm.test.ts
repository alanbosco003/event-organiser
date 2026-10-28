import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { EventFormValues } from "../types/event";
import { successMessage } from "../utils/eventCopy";
import { formatFileSize } from "../utils/formatFileSize";
import { commitInviteDraft, isValidEmail } from "./email";
import { validateEventForm } from "./eventForm";
import { assessImageFile } from "./imageFile";
import { LIMITS } from "./limits";

const image = {
  uri: "file://cover.jpg",
  name: "albert-park.jpg",
  size: 2_400_000,
  mimeType: "image/jpeg",
};

function values(overrides: Partial<EventFormValues> = {}): EventFormValues {
  return {
    image,
    title: "Sunrise run at Albert Park",
    shortDescription: "A relaxed 5 km group run around the lake. All paces welcome.",
    fullDescription:
      "Meet at the boathouse at 6:15 am on Saturday. Bring water and comfy shoes.",
    privacy: "public",
    communityIds: [],
    invites: [],
    ...overrides,
  };
}

describe("validateEventForm", () => {
  it("rejects an empty form on the five required fields", () => {
    const result = validateEventForm(
      values({
        image: null,
        title: "",
        shortDescription: "",
        fullDescription: "",
        privacy: null,
      }),
    );

    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.deepEqual(Object.keys(result.errors).sort(), [
      "fullDescription",
      "image",
      "privacy",
      "shortDescription",
      "title",
    ]);
    assert.equal(result.errors.image, "Add a cover image.");
    assert.equal(result.errors.title, "Add a title.");
    assert.equal(result.errors.privacy, "Choose Public or Private.");
    assert.equal(result.payload, null);
  });

  it("trims title and descriptions before validating", () => {
    const spaces = validateEventForm(values({ title: "   Hi   " }));
    assert.equal(spaces.ok, false);
    if (!spaces.ok) {
      assert.match(spaces.errors.title ?? "", /at least 3 characters/);
    }

    const padded = validateEventForm(
      values({
        title: "  Run  ",
        shortDescription: "   Hello team   ",
        fullDescription: "   12345678901234567890   ",
      }),
    );
    assert.equal(padded.ok, true);
    if (!padded.ok) return;
    assert.equal(padded.payload.title, "Run");
    assert.equal(padded.payload.shortDescription, "Hello team");
    assert.equal(padded.payload.fullDescription, "12345678901234567890");
  });

  it("rejects a title over the max length", () => {
    const result = validateEventForm(values({ title: "A".repeat(LIMITS.title.max + 1) }));
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.errors.title ?? "", /80 characters or fewer/);
  });

  it("allows English short copy and rejects other letters", () => {
    const english = validateEventForm(
      values({ shortDescription: "Hello world, meet at 6:15." }),
    );
    assert.equal(english.ok, true);

    const german = validateEventForm(
      values({ shortDescription: "Morgens Yoga für alle im Park" }),
    );
    assert.equal(german.ok, false);
    if (!german.ok) {
      assert.equal(
        german.errors.shortDescription,
        'Use English letters, numbers and basic punctuation only. Remove "ü".',
      );
    }
  });

  it("accepts any language in the full description", () => {
    const result = validateEventForm(
      values({
        fullDescription: "Table booked for 7:30. जन्मदिन मुबारक! RSVP by Friday.",
      }),
    );
    assert.equal(result.ok, true);
  });

  it("rejects a short full description", () => {
    const result = validateEventForm(values({ fullDescription: "Too short" }));
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(
        result.errors.fullDescription,
        "Add a full description of at least 20 characters.",
      );
    }
  });

  it("lets a public event succeed with no communities and ignores invites", () => {
    const result = validateEventForm(
      values({
        communityIds: [],
        invites: ["not-an-email"],
      }),
    );

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.privacy, "public");
    assert.deepEqual(result.payload.communities, []);
    assert.equal(Object.hasOwn(result.payload, "invites"), false);
    assert.match(successMessage(result.payload), /visible to everyone/);
  });

  it("includes selected communities only on a public payload", () => {
    const result = validateEventForm(
      values({
        communityIds: ["melbourne-runners", "albert-park-locals"],
        invites: ["priya.n@gmail.com"],
      }),
    );

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.payload.communities, [
      "melbourne-runners",
      "albert-park-locals",
    ]);
    assert.equal(Object.hasOwn(result.payload, "invites"), false);
    assert.match(successMessage(result.payload), /2 communities/);
  });

  it("requires at least one valid email for private events and drops communities", () => {
    const missing = validateEventForm(
      values({
        privacy: "private",
        communityIds: ["melbourne-runners"],
        invites: [],
      }),
    );
    assert.equal(missing.ok, false);
    if (!missing.ok) {
      assert.equal(missing.errors.invites, "Add at least one email address.");
      assert.equal(missing.errors.privacy, undefined);
    }

    const invalid = validateEventForm(
      values({ privacy: "private", invites: ["sam@mail"] }),
    );
    assert.equal(invalid.ok, false);
    if (!invalid.ok) {
      assert.equal(invalid.errors.invites, '"sam@mail" isn\'t a valid email address.');
    }

    const ready = validateEventForm(
      values({
        privacy: "private",
        title: "Priya's 30th birthday dinner",
        communityIds: ["melbourne-runners"],
        invites: ["priya.n@gmail.com", "tom.walker@outlook.com", "j.chen@company.com.au"],
      }),
    );
    assert.equal(ready.ok, true);
    if (!ready.ok) return;
    assert.deepEqual(ready.payload.invites, [
      "priya.n@gmail.com",
      "tom.walker@outlook.com",
      "j.chen@company.com.au",
    ]);
    assert.equal(Object.hasOwn(ready.payload, "communities"), false);
    assert.match(successMessage(ready.payload), /invites to 3 people/);
  });
});

describe("invites", () => {
  it("checks email shape", () => {
    assert.equal(isValidEmail("sam@mail"), false);
    assert.equal(isValidEmail("priya.n@gmail.com"), true);
    assert.equal(isValidEmail("j.chen@company.com.au"), true);
    assert.equal(isValidEmail("  "), false);
  });

  it("splits, validates, and de-dupes a pasted list", () => {
    const result = commitInviteDraft(
      ["priya.n@gmail.com"],
      "priya.n@gmail.com, sam@mail\ntom.walker@outlook.com; PRIYA.N@gmail.com",
    );

    assert.deepEqual(result.invites, ["priya.n@gmail.com", "tom.walker@outlook.com"]);
    assert.equal(result.draft, "sam@mail");
    assert.equal(result.error, '"sam@mail" isn\'t a valid email address.');
  });

  it("does not add empty rows and stops at 20 invites", () => {
    const empty = commitInviteDraft([], " , \n ; ");
    assert.deepEqual(empty.invites, []);
    assert.equal(empty.error, "Enter an email address.");

    const existing = Array.from({ length: 20 }, (_, index) => `user${index}@example.com`);
    const capped = commitInviteDraft(existing, "extra@example.com, sam@mail");
    assert.equal(capped.invites.length, 20);
    assert.equal(capped.error, '"sam@mail" isn\'t a valid email address.');
    assert.match(capped.draft, /extra@example.com/);
    assert.match(capped.draft, /sam@mail/);
  });
});

describe("cover image", () => {
  it("accepts jpg, png, and heic, and rejects other files and large files", () => {
    assert.deepEqual(
      assessImageFile({ name: "IMG.HEIC", mimeType: "image/heic", size: 1000 }),
      { ok: true },
    );
    assert.deepEqual(
      assessImageFile({ name: "photo.png", mimeType: "image/png", size: 0 }),
      { ok: true },
    );
    assert.deepEqual(
      assessImageFile({ name: "tickets.pdf", mimeType: "application/pdf", size: 100 }),
      { ok: false, reason: "type" },
    );
    assert.deepEqual(
      assessImageFile({ name: "animation.gif", mimeType: "image/gif", size: 100 }),
      { ok: false, reason: "type" },
    );
    assert.deepEqual(
      assessImageFile({
        name: "huge.jpg",
        mimeType: "image/jpeg",
        size: LIMITS.imageBytes + 1,
      }),
      { ok: false, reason: "size" },
    );
  });

  it("formats sizes the way the form shows them", () => {
    assert.equal(formatFileSize(Math.round(2.4 * 1024 * 1024)), "2.4 MB");
    assert.equal(formatFileSize(Math.round(1.1 * 1024 * 1024)), "1.1 MB");
    assert.equal(formatFileSize(0), null);
  });
});
