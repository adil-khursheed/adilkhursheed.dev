import React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThemeToggle from "./theme-toggle";

const navItems = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Components",
    href: "/components",
  },
];

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-6xl">
      <div
        style={{
          maxWidth: "72rem",
          width: "93%",
        }}
        className="bg-background/50 max-w-8xl mx-auto flex w-full items-center justify-between rounded-full p-3 backdrop-blur-sm"
      >
        <Avatar className="md:size-10">
          <AvatarImage
            src={"/adil-khursheed.jpg"}
            alt="Adil Khursheed"
            className="object-cover object-top"
          />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>

        <nav className="flex items-center gap-4">
          <ThemeToggle />

          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
