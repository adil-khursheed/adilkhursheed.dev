import React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThemeToggle from "./theme-toggle";

const navItems = [
  {
    label: "About",
    href: "/about",
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
    <header className="fixed inset-x-0 top-0 z-50 max-w-4xl w-full mx-auto">
      <div
        style={{
          maxWidth: "56rem",
          width: "92%",
        }}
        className="max-w-4xl w-full mx-auto flex items-center justify-between rounded-full bg-background/50 backdrop-blur-sm p-3">
        <Avatar className="size-10">
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
