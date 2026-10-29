import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";

import type { CoverImage, ImageIssue } from "../types/event";
import { assessImageFile } from "../validation/imageFile";

export type PickCoverResult =
  | { type: "canceled" }
  | { type: "permission" }
  | { type: "rejected"; issue: ImageIssue }
  | { type: "selected"; image: CoverImage };

export async function pickCoverImage(): Promise<PickCoverResult> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return { type: "permission" };

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled || !result.assets[0]) return { type: "canceled" };

    const asset = result.assets[0];
    const name = resolveName(asset);
    const mimeType = asset.mimeType ?? mimeFromName(name);
    const size = resolveSize(asset.uri, asset.fileSize);
    const assessed = assessImageFile({ name, mimeType, size });

    if (!assessed.ok) {
      return {
        type: "rejected",
        issue:
          assessed.reason === "size"
            ? { kind: "too-large", fileName: name }
            : { kind: "invalid-type", fileName: name },
      };
    }

    return {
      type: "selected",
      image: { uri: asset.uri, name, size, mimeType },
    };
  } catch (error) {
    // Some rejected types throw. Any other failure is treated as photo access being denied.
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("unsupported file type")) {
      return {
        type: "rejected",
        issue: { kind: "invalid-type", fileName: fileNameFromPickerError(message) },
      };
    }
    return { type: "permission" };
  }
}

function resolveName(asset: ImagePicker.ImagePickerAsset): string {
  if (asset.fileName?.trim()) return asset.fileName.trim();

  try {
    const name = new File(asset.uri).name;
    if (name.includes(".")) return name;
  } catch {
    // The photo library URI is not always a readable file path.
  }

  const segment = asset.uri.split("?")[0]?.split("/").pop() ?? "";
  if (segment.includes(".")) {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  }

  const mime = asset.mimeType ?? "";
  if (mime === "image/png") return "cover.png";
  if (mime.includes("heic") || mime.includes("heif")) return "cover.heic";
  return "cover.jpg";
}

function mimeFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "heic" || ext === "heif") return "image/heic";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  return "";
}

function resolveSize(uri: string, reported?: number | null): number {
  // 0 means the platform did not report a size. The size rule then skips the file.
  if (typeof reported === "number" && reported > 0) return reported;
  try {
    const size = new File(uri).size;
    return typeof size === "number" && size > 0 ? size : 0;
  } catch {
    return 0;
  }
}

function fileNameFromPickerError(message: string): string {
  const mime = message.match(/unsupported file type:\s*([^.\s]+)/i)?.[1] ?? "";
  if (mime.includes("pdf")) return "file.pdf";
  if (mime.startsWith("image/")) {
    const subtype = mime.slice("image/".length).replace(/[^a-z0-9]/gi, "") || "file";
    return `file.${subtype}`;
  }
  return mime || "file";
}
