"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-6xl">
      <div
        style={{ maxWidth: "72rem", width: "93%" }}
        className="bg-background/60 mx-auto flex w-full items-center justify-between rounded-full p-2.5 backdrop-blur-md md:p-3"
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <Avatar className="size-8 md:size-10">
            <AvatarImage
              src="/portrait/adil-khursheed.png"
              alt=""
              className="object-cover object-top"
            />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-5">
          <ThemeToggle />

          {navItems.map((item) => {
            const active = item.match === "exact" && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors md:text-base",
                  active
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
