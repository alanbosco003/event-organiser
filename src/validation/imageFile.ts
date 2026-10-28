import type { ImageIssue } from "../types/event";
import { LIMITS } from "./limits";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "heic", "heif"]);

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

export function imageProblemMessage(fileName: string, reason: "type" | "size"): string {
  if (reason === "size") {
    return `"${fileName}" is over 10 MB. Choose a smaller JPG, PNG or HEIC file.`;
  }
  return `"${fileName}" isn't an image. Choose a JPG, PNG or HEIC file.`;
}

export function imageIssueMessage(issue: ImageIssue): string {
  if (issue.kind === "permission") {
    return "We couldn't open your photos. Allow photo access in Settings, then try again.";
  }
  if (issue.kind === "too-large") {
    return imageProblemMessage(issue.fileName, "size");
  }
  return imageProblemMessage(issue.fileName, "type");
}
