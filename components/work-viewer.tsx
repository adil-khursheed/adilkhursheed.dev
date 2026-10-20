"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const shots = [
  {
    id: "dashboard",
    src: "/experience/leadlly-dashboard.jpg",
    label: "Dashboard",
    caption:
      "The student dashboard: today's plan, subject progress, and the daily report in one view.",
  },
  {
    id: "planner",
    src: "/experience/leadlly-planner.jpg",
    label: "Planner",
    caption:
      "A weekly planner that breaks revision into subject-wise tasks students can tick off.",
  },
  {
    id: "tracker",
    src: "/experience/leadlly-tracker.jpg",
    label: "Tracker",
    caption:
      "Chapter-level tracking for revision frequency, efficiency, and questions solved.",
  },
  {
    id: "quizzes",
    src: "/experience/leadlly-quizzes.jpg",
    label: "Quizzes",
    caption:
      "Weekly and chapter quizzes, plus a custom quiz builder for focused practice.",
  },
];

export function WorkViewer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const shot = shots[active];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive((index) => (index + 1) % shots.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((index) => (index - 1 + shots.length) % shots.length);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="group"
        aria-label="Leadlly portal screens"
        onKeyDown={handleKeyDown}
        className="relative overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10"
      >
        <div className="relative aspect-[16/10] w-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={shot.id}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: "easeInOut" }}
            >
              <Image
                src={shot.src}
                alt={`Leadlly ${shot.label.toLowerCase()} screen`}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-start justify-between gap-6">
        <p
          aria-live="polite"
          className="max-w-[52ch] font-mono text-[11px]/5 text-foreground/65"
        >
          {shot.caption}
        </p>
        <span className="shrink-0 font-mono text-[11px] text-foreground/65">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(shots.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {shots.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              aria-label={`Show the ${item.label.toLowerCase()} screen`}
              className={cn(
                "relative overflow-hidden rounded-md ring-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                isActive
                  ? "ring-primary"
                  : "opacity-70 ring-foreground/10 hover:opacity-100 hover:ring-foreground/25",
              )}
            >
              <span className="block aspect-[16/10]">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover object-top"
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
