"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

  function step(direction: number) {
    setActive((index) => (index + direction + shots.length) % shots.length);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        id="leadlly-screen"
        role="group"
        aria-roledescription="carousel"
        aria-label="Leadlly student portal screens"
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div
          className="min-h-[3.75rem] sm:min-h-10"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={shot.id}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{
                duration: reduce ? 0 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-[52ch] font-mono text-[11px]/5 text-foreground/65"
            >
              {shot.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
          <span className="font-mono text-[11px] text-foreground/65">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(shots.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Show previous screen"
              aria-controls="leadlly-screen"
              className="inline-flex size-9 items-center justify-center rounded-md text-foreground/65 transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:translate-y-px sm:size-7"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Show next screen"
              aria-controls="leadlly-screen"
              className="inline-flex size-9 items-center justify-center rounded-md text-foreground/65 transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:translate-y-px sm:size-7"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </button>
          </div>
        </div>
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
              aria-controls="leadlly-screen"
              aria-label={`Show the ${item.label.toLowerCase()} screen`}
              className="group/thumb block rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span
                className={cn(
                  "relative block aspect-[16/10] overflow-hidden rounded-md ring-1 transition-all duration-300",
                  isActive
                    ? "ring-primary"
                    : "opacity-70 ring-foreground/10 group-hover/thumb:opacity-100 group-hover/thumb:ring-foreground/25",
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 12vw, 22vw"
                  className="object-cover object-top transition duration-700 ease-out group-hover/thumb:scale-[1.035]"
                />
              </span>
              <span
                className={cn(
                  "mt-2 block font-mono text-[10px] lowercase transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/65 group-hover/thumb:text-foreground",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
