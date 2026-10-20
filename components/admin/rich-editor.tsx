"use client";

import { useState } from "react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Heading02Icon,
  Heading03Icon,
  LeftToRightBlockQuoteIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Link01Icon,
  RedoIcon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  UndoIcon,
  Unlink01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type Icon = React.ComponentProps<typeof HugeiconsIcon>["icon"];

function ToolButton({
  label,
  icon,
  active,
  disabled,
  onClick,
}: {
  label: string;
  icon: Icon;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-35",
        active
          ? "bg-foreground text-background"
          : "text-foreground/55 hover:bg-muted hover:text-foreground",
      )}
    >
      <HugeiconsIcon icon={icon} className="size-3.5" />
    </button>
  );
}

function Divider() {
  return <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />;
}

function normaliseUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function RichEditor({
  initialContent,
  error,
}: {
  initialContent: string;
  error?: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [counts, setCounts] = useState({ words: 0, characters: 0 });
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing. Use the toolbar for structure.",
      }),
    ],
    content: initialContent || "<p></p>",
    editorProps: {
      attributes: {
        class: "outline-none",
        "aria-label": "Post body",
      },
    },
    onCreate({ editor }) {
      const text = editor.getText();
      setCounts({ words: countWords(text), characters: text.length });
    },
    onUpdate({ editor }) {
      const text = editor.getText();
      setContent(editor.getHTML());
      setCounts({ words: countWords(text), characters: text.length });
    },
  });

  function openLink() {
    if (!editor) return;
    setLinkValue(editor.getAttributes("link").href ?? "");
    setLinkOpen(true);
  }

  function applyLink() {
    if (!editor) return;
    const href = normaliseUrl(linkValue);

    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href })
        .run();
    }

    setLinkOpen(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] lowercase text-foreground/65">
          body
        </span>
        <span className="font-mono text-[10px] text-foreground/45">
          {counts.words} words · {counts.characters} characters
        </span>
      </div>

      <div
        className={cn(
          "rich-editor overflow-hidden rounded-lg border border-input bg-input/20 transition-colors dark:bg-input/30",
          error
            ? "border-destructive"
            : "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        )}
      >
        {editor ? (
          <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
            <ToolButton
              label="Bold"
              icon={TextBoldIcon}
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolButton
              label="Italic"
              icon={TextItalicIcon}
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolButton
              label="Strikethrough"
              icon={TextStrikethroughIcon}
              active={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
            <Divider />
            <ToolButton
              label="Heading level 2"
              icon={Heading02Icon}
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            />
            <ToolButton
              label="Heading level 3"
              icon={Heading03Icon}
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            />
            <Divider />
            <ToolButton
              label="Bulleted list"
              icon={LeftToRightListBulletIcon}
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolButton
              label="Numbered list"
              icon={LeftToRightListNumberIcon}
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <ToolButton
              label="Blockquote"
              icon={LeftToRightBlockQuoteIcon}
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
            <ToolButton
              label="Code block"
              icon={SourceCodeIcon}
              active={editor.isActive("codeBlock")}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            />
            <Divider />
            <ToolButton
              label="Link"
              icon={Link01Icon}
              active={editor.isActive("link")}
              onClick={openLink}
            />
            {editor.isActive("link") ? (
              <ToolButton
                label="Remove link"
                icon={Unlink01Icon}
                onClick={() =>
                  editor.chain().focus().extendMarkRange("link").unsetLink().run()
                }
              />
            ) : null}
            <Divider />
            <ToolButton
              label="Undo"
              icon={UndoIcon}
              disabled={!editor.can().chain().focus().undo().run()}
              onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolButton
              label="Redo"
              icon={RedoIcon}
              disabled={!editor.can().chain().focus().redo().run()}
              onClick={() => editor.chain().focus().redo().run()}
            />
          </div>
        ) : (
          <div className="h-11 border-b border-border" />
        )}

        {linkOpen ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-2 py-2">
            <label
              htmlFor="link-url"
              className="font-mono text-[10px] lowercase text-foreground/55"
            >
              link
            </label>
            <input
              id="link-url"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
                if (event.key === "Escape") setLinkOpen(false);
              }}
              placeholder="https://..."
              autoFocus
              className="h-7 min-w-0 flex-1 rounded-sm border border-input bg-background px-2 font-mono text-[11px] outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <button
              type="button"
              onClick={applyLink}
              className="h-7 rounded-sm bg-foreground px-2 text-[11px] font-medium text-background transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              apply
            </button>
            <button
              type="button"
              onClick={() => setLinkOpen(false)}
              className="h-7 rounded-sm px-2 text-[11px] text-foreground/55 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              cancel
            </button>
          </div>
        ) : null}

        <EditorContent editor={editor} className="px-4 py-3" />

        <input type="hidden" name="content_html" value={content} />
      </div>

      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        <p className="text-[11px]/5 text-foreground/45">
          Headings, lists, quotes, code, and links are supported. Drafts can be
          saved empty; publishing needs a paragraph.
        </p>
      )}
    </div>
  );
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
