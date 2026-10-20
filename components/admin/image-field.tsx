"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ImageUploadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export function ImageField({
  name,
  currentName,
  initialUrl,
  error,
  label,
  aspect = "aspect-[16/10]",
  hint,
}: {
  name: string;
  currentName: string;
  initialUrl?: string | null;
  error?: string;
  label: string;
  aspect?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialUrl ?? "");
  const [kept, setKept] = useState(initialUrl ?? "");
  const [fileName, setFileName] = useState("");
  const [localError, setLocalError] = useState("");
  const [dragging, setDragging] = useState(false);

  const isBlob = useMemo(() => preview.startsWith("blob:"), [preview]);

  function acceptFile(file: File | undefined) {
    if (!file) return;

    setLocalError("");

    if (!ACCEPTED.includes(file.type)) {
      setLocalError("Use a JPG, PNG, WebP, or AVIF image.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setLocalError("Keep the image under 5 MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function removeImage() {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview("");
    setKept("");
    setFileName("");
    setLocalError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const shownError = error ?? localError;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] lowercase text-foreground/65">
          {label}
        </span>
        {fileName ? (
          <span className="max-w-[14ch] truncate font-mono text-[10px] text-foreground/45">
            {fileName}
          </span>
        ) : null}
      </div>

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(event) => acceptFile(event.target.files?.[0])}
      />
      <input type="hidden" name={currentName} value={kept} />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          acceptFile(event.dataTransfer.files?.[0]);
        }}
        aria-describedby={shownError ? `${name}-error` : undefined}
        className={cn(
          "group relative w-full overflow-hidden rounded-lg border border-dashed bg-muted text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          aspect,
          dragging ? "border-primary" : "border-border hover:border-foreground/25",
          shownError && "border-destructive/60",
        )}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt=""
              fill
              unoptimized={isBlob}
              sizes="(min-width: 1024px) 280px, 100vw"
              className="object-cover object-top"
            />
            <span className="absolute right-2 bottom-2 rounded-md bg-background/85 px-2 py-1 font-mono text-[9px] text-foreground/65 backdrop-blur-sm">
              replace
            </span>
          </>
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <HugeiconsIcon
              icon={ImageUploadIcon}
              className="size-5 text-foreground/40"
            />
            <span className="font-mono text-[10px] text-foreground/50">
              drop an image or browse
            </span>
            <span className="text-[10px] text-foreground/35">
              JPG, PNG, WebP, AVIF · max 5 MB
            </span>
          </span>
        )}
      </button>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-mono text-[10px] lowercase text-foreground/55 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {preview ? "choose another" : "choose file"}
        </button>
        {preview ? (
          <button
            type="button"
            onClick={removeImage}
            className="font-mono text-[10px] lowercase text-foreground/45 transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/25"
          >
            remove
          </button>
        ) : null}
      </div>

      {hint && !shownError ? (
        <p className="text-[11px]/5 text-foreground/45">{hint}</p>
      ) : null}
      {shownError ? (
        <p id={`${name}-error`} role="alert" className="text-xs text-destructive">
          {shownError}
        </p>
      ) : null}
    </div>
  );
}
