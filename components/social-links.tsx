import {
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { socials } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  github: GithubIcon,
  linkedin: Linkedin01Icon,
  instagram: InstagramIcon,
  twitter: NewTwitterIcon,
};

export function SocialLinks({
  className,
  showLabels = false,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[11px] text-foreground/60 lowercase transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            )}
          >
            <HugeiconsIcon icon={icons[social.icon]} className="size-3.5" />
            <span className={showLabels ? "" : "sr-only"}>{social.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
