export const LIMITS = {
  title: { min: 3, max: 80 },
  shortDescription: { min: 10, max: 150 },
  fullDescription: { min: 20, max: 2000 },
  invites: { min: 1, max: 20 },
  imageBytes: 10 * 1024 * 1024,
} as const;
