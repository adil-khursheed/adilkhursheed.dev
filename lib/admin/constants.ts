export const STUDIO_BASE = "/studio-b43cf3ded0";
export const STUDIO_LOGIN = `${STUDIO_BASE}/login`;

export const PROJECT_TYPES = ["personal", "freelance"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const POST_STATUSES = ["draft", "published"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export const STORAGE_BUCKET = "project-images";
