import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import {
  ArrowUpRightIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    icon?: "up-right" | "right" | "none";
  };

export function ActionLink({
  className,
  variant = "outline",
  size = "sm",
  icon = "up-right",
  children,
  ...props
}: ActionLinkProps) {
  const Icon = icon === "right" ? ArrowRight01Icon : ArrowUpRightIcon;

  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {icon !== "none" ? (
        <HugeiconsIcon icon={Icon} className="size-3" />
      ) : null}
    </Link>
  );
}
