# Event organiser

A small Expo app for creating an event. The form collects a cover image, title, short description, full description, and a public or private audience.

## Run

Requires **Node.js 22.13 or newer** (Expo SDK 58).

```bash
nvm use
npm install
npm start
```

Then:

- press `i` for the iOS simulator
- press `a` for Android
- press `w` for web
- or scan the QR code with Expo Go

Checks:

```bash
npm test
npm run typecheck
```

## Tech stack

<a href="docs/tech-stack.md"><img alt="Click here to know more about the tech stack" src="https://img.shields.io/badge/Click%20here-to%20know%20more%20about%20the%20tech%20stack-1D4ED8?style=for-the-badge" /></a>

The [tech stack page](docs/tech-stack.md) covers the libraries, the folder layout, and how the Context API holds the form.

## Branches and versions

Two long-lived branches:

| Branch | Role |
| --- | --- |
| `main` | Released code only. Every release on `main` has a version tag. |
| `dev` | Integration branch. New work is merged here before a release. |

A change starts from `dev` on a short-lived branch, then merges back into `dev`. A release merges `dev` into `main` and tags that commit. Feature work does not land on `main` directly.

Versions follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

- `MAJOR` when a saved event shape or a required flow breaks.
- `MINOR` when behavior is added and the previous release still fits.
- `PATCH` when a bug is fixed and nothing new is added.

`package.json` and `app.json` both store that number. The git tag is the same number with a `v` prefix, so version `1.0.0` is the tag `v1.0.0`. Tags are created on `main` only.

The first release is `v1.0.0`. `main` and `dev` both start at that tag. Later work moves `dev` ahead, and the next tag is cut from `main` after `dev` is merged in.

To cut the next release:

1. Merge the finished work into `dev`.
2. Bump `version` in `package.json` and `app.json`.
3. Merge `dev` into `main`.
4. Tag `main` as `vMAJOR.MINOR.PATCH`.
5. Push `main`, `dev`, and the tag.

## Validation

Every field goes through `validateField`. That switch calls the matching checker. Title, short description, and full description share one trim-and-length check. The short description adds an English-character check before the length check. Text is trimmed again when it is copied into the payload. The character counter shows what is typed, including spaces.

| Field | Rules |
| --- | --- |
| Cover image | Required. JPG, PNG, or HEIC. Larger than 10 MB is rejected. A size of 0 means the platform did not report one, so the size check is skipped. |
| Title | Required. 3–80 characters after trim. |
| Short description | Required. 10–150 characters. English letters, digits, whitespace, and basic punctuation only. |
| Full description | Required. 20–2000 characters. Any language, numbers, and symbols. |
| Privacy | Required. `public` or `private`. |
| Communities | Public only. Optional. An empty list means the event is visible to everyone. |
| Invites | Private only. At least 1 and at most 20 valid emails. No empty rows. |

Field errors appear after **Create event**, then update as the value changes. Photo permission, file type, file size, invite format, and non-English characters in the short description appear as soon as they happen.

Short description punctuation includes `. , ! ? ' " - – — : ; ( ) / & @ # % + =` and newlines. Letters outside basic English, such as `ü`, are rejected with the character named in the error.

Email check is practical, not a full RFC parser: `name@domain.tld`, no spaces, and a top-level domain of at least two letters. `sam@mail` is invalid.

Pasted invites can be separated by commas, semicolons, spaces, or new lines. Duplicates are removed without regard to case. Invalid addresses stay in the field and are reported. Valid ones are added.

## Privacy rules

Choosing public or private only changes which extra section is shown and which field is validated.

- Switching does **not** delete the other mode's draft. Communities and invites stay in memory, so toggling back restores them.
- They do not affect the other mode. A private invite list cannot block a public submit. Selected communities are not part of a private submit.
- Public payload includes `communities` (possibly `[]`) and omits `invites`.
- Private payload includes `invites` and omits `communities`.
- `communities: []` means visible to everyone.

```ts
type EventPayload = {
  image: { uri: string; name: string; size: number; mimeType: string };
  title: string;
  shortDescription: string;
  fullDescription: string;
  privacy: "public" | "private";
  communities?: string[]; // public only, community ids
  invites?: string[]; // private only
};
```

**Create event** validates the whole form. Invalid input shows a summary and field errors, and does not show success. Valid input shows a short **Creating your event** loader, then **Event created**. Nothing is sent to a server. **View event** shows the payload saved in context. **Create another** clears the form.

## Known gaps

- Submit is local only. There is no account, API, or saved event list.
- Communities and saved contacts are mock data.
- The cover comes from the photo library. Mobile has no drag-and-drop target.
- The library usually returns images only. GIF, WEBP, PDF, and other types are still rejected when the name or MIME type is available, and those cases are unit tested. On web, the file dialog is filtered to images; a non-image that gets through shows the same error.
- Photo permission errors depend on the operating system. Web always allows the file dialog, so **Open Settings** applies to iOS and Android.
- There is one cover image. A separate thumbnail is not included.
- The English check is based on characters, not a dictionary. `Hello world` passes. It does not check that the words are real English.
