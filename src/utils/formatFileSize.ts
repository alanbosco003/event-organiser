export function formatFileSize(bytes: number): string | null {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;

  const megabytes = bytes / (1024 * 1024);
  if (megabytes >= 1) {
    return megabytes >= 10 ? `${Math.round(megabytes)} MB` : `${megabytes.toFixed(1)} MB`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes >= 10) return `${Math.round(kilobytes)} KB`;
  if (kilobytes >= 1) return `${kilobytes.toFixed(1)} KB`;
  return `${Math.round(bytes)} B`;
}

export function imageMetaLabel(name: string, size: number): string {
  const formatted = formatFileSize(size);
  return formatted ? `${name} · ${formatted}` : name;
}
