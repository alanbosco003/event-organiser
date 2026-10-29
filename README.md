# Create Event

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

## Stack

- TypeScript
- Expo SDK 58 (React Native)
- Expo Router for the create screen and the event summary
- React Context for form state and actions
- No form library. Validation is a set of pure functions the context calls
- `expo-image-picker` for the cover image

## Folder structure

Atomic design. Routes stay thin. Rules do not import React.

```
src/
  app/                  screens registered with Expo Router
  screens/              route containers
  components/
    atoms/              text, buttons, text input, field error
    molecules/          label, hint, banner, privacy card, rows
    organisms/          one form section each, plus the form and success state
    templates/          header, scrolling body, footer
  state/                form values, image issue, invites, and submit status
  hooks/                field, cover image, invite, error, and submit actions
  context/              provider that combines the state and hooks
  styles/               StyleSheet for every screen and component
  validation/           field switch and checkers
    constants/          punctuation, image types, email pattern, text limits
  services/             photo library picker
  data/                 mock communities and saved contacts
  types/                form values, privacy, and payload
  theme/                colors and spacing
  utils/                file size and success copy
```

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

**Create event** validates the whole form. Invalid input shows a summary and field errors, and does not show success. Valid input shows **Creating...** for a short moment, then **Event created**. Nothing is sent to a server. **View event** shows the payload saved in context. **Create another** clears the form.

## Known gaps

- Submit is local only. There is no account, API, or saved event list.
- Communities and saved contacts are mock data.
- The cover comes from the photo library. Mobile has no drag-and-drop target.
- The library usually returns images only. GIF, WEBP, PDF, and other types are still rejected when the name or MIME type is available, and those cases are unit tested. On web, the file dialog is filtered to images; a non-image that gets through shows the same error.
- Photo permission errors depend on the operating system. Web always allows the file dialog, so **Open Settings** applies to iOS and Android.
- There is one cover image. A separate thumbnail is not included.
- The English check is based on characters, not a dictionary. `Hello world` passes. It does not check that the words are real English.
