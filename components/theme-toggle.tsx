"use client";

import { useTheme } from "next-themes";
import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "./ui/button";
import { flushSync } from "react-dom";
import { Moon02Icon, SunIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const emptySubscribe = () => () => {};

const ThemeToggle = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();

  const toggleTheme = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    }).ready;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${left + width / 2}px ${top + height / 2}px)`,
          `circle(${maxRadius}px at ${left + width / 2}px ${top + height / 2}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      ref={ref}
      size={"icon"}
      variant={"ghost"}
      className="cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={SunIcon} className="size-4" />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} className="size-4" />
      )}

      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

export default ThemeToggle;
