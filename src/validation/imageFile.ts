import type { CoverImage, ImageIssue } from "../types/event";
import { ALLOWED_EXT, ALLOWED_MIME } from "./constants/imageTypes";
import { LIMITS } from "./limits";

export type ImageAssessment =
  | { ok: true }
  | { ok: false; reason: "type" | "size" };

export function extensionOf(name: string): string {
  const base = name.trim().toLowerCase().split("?")[0] ?? "";
  const parts = base.split(".");
  if (parts.length < 2) return "";
  return parts.pop() ?? "";
}

export function isAllowedImage(file: { name: string; mimeType: string }): boolean {
  const mime = file.mimeType.toLowerCase().split(";")[0]?.trim() ?? "";
  const ext = extensionOf(file.name);

  if (mime && !ALLOWED_MIME.has(mime)) return false;
  if (ext && !ALLOWED_EXT.has(ext)) return false;
  if (!mime && !ext) return false;
  return true;
}

/** Size of 0 means the platform did not report a size, so the limit is skipped. */
export function assessImageFile(file: {
  name: string;
  mimeType: string;
  size: number;
}): ImageAssessment {
  if (!isAllowedImage(file)) return { ok: false, reason: "type" };
  if (file.size > LIMITS.imageBytes) return { ok: false, reason: "size" };
  return { ok: true };
}

export function validateCoverImage(image: CoverImage | null): string | undefined {
  if (!image) return "Add a cover image.";

  const assessed = assessImageFile(image);
  if (assessed.ok) return undefined;
  return imageProblemMessage(image.name, assessed.reason);
}

export function imageProblemMessage(fileName: string, reason: "type" | "size"): string {
  switch (reason) {
    case "size":
      return `"${fileName}" is over 10 MB. Choose a smaller JPG, PNG or HEIC file.`;
    case "type":
      return `"${fileName}" isn't an image. Choose a JPG, PNG or HEIC file.`;
  }
}

export function imageIssueMessage(issue: ImageIssue): string {
  switch (issue.kind) {
    case "permission":
      return "We couldn't open your photos. Allow photo access in Settings, then try again.";
    case "too-large":
      return imageProblemMessage(issue.fileName, "size");
    case "invalid-type":
      return imageProblemMessage(issue.fileName, "type");
  }
}
