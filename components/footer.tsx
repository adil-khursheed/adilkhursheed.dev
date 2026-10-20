import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="line-before relative mt-8 px-2 pt-6 pb-12 max-sm:px-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] lowercase text-foreground/65">
            © 2026 {site.name}
          </p>
          <p className="font-mono text-[11px] lowercase text-foreground/65">
            next.js · tailwind css · supabase
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
