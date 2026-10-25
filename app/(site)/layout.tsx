import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd, siteGraph } from "@/lib/seo";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={siteGraph} />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-xs focus:text-background"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="content" className="max-w-screen min-h-screen overflow-x-hidden">
        <div className="relative mx-auto min-h-screen px-4 pt-10 md:max-w-6xl md:px-8">
          <div
            aria-hidden="true"
            className="bg-border/50 pointer-events-none absolute top-0 left-0 h-full w-4 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-border)] md:w-8"
          />
          {children}
          <Footer />
          <div
            aria-hidden="true"
            className="bg-border/50 pointer-events-none absolute top-0 right-0 h-full w-4 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-border)] md:w-8"
          />
        </div>
      </main>
    </>
  );
}
