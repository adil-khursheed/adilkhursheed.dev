import { STORAGE_BUCKET } from "@/lib/admin/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_BYTES = 5 * 1024 * 1024;

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export type UploadResult =
  | { url: string; error?: never }
  | { url?: never; error: string };

export async function uploadImage(
  file: File,
  folder: "projects" | "blog",
): Promise<UploadResult> {
  if (file.size === 0) {
    return { error: "The selected file is empty." };
  }

  const extension = extensions[file.type];

  if (!extension) {
    return { error: "Use a JPG, PNG, WebP, or AVIF image." };
  }

  if (file.size > MAX_BYTES) {
    return { error: "Keep the image under 5 MB." };
  }

  const supabase = await createSupabaseServerClient();
  const objectPath = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    return { error: "The image could not be uploaded. Try again." };
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(objectPath);

  return { url: data.publicUrl };
}

export function storedImagePath(url: string | null | undefined) {
  if (!url) return null;

  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return decodeURIComponent(url.slice(index + marker.length));
}

export async function deleteStoredImage(url: string | null | undefined) {
  const path = storedImagePath(url);
  if (!path) return;

  const supabase = await createSupabaseServerClient();
  await supabase.storage.from(STORAGE_BUCKET).remove([path]);
}
