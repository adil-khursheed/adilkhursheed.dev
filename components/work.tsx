import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { WorkViewer } from "@/components/work-viewer";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading title="Experience" meta="apr 2024 — may 2026" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl tracking-tight sm:text-4xl">Leadlly</h3>
            <span className="font-mono text-[11px] lowercase text-foreground/65">
              past role
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] lowercase text-foreground/65">
            frontend developer
          </p>

          <p className="mt-6 max-w-[46ch] text-base/8 text-foreground/70">
            Leadlly is a self-study platform for students. I built its student
            portal — the interface students use every day to plan, track, and
            test themselves.
          </p>

          <ul className="mt-6 divide-y divide-border border-y border-border">
            <li className="group grid grid-cols-[4.5rem_1fr] gap-4 py-4">
              <span className="font-mono text-[11px] lowercase text-foreground/65 transition-colors group-hover:text-foreground">
                built
              </span>
              <p className="text-sm/6 text-foreground/75 transition-colors group-hover:text-foreground">
                Built the student portal from scratch and carried it into
                production.
              </p>
            </li>
            <li className="group grid grid-cols-[4.5rem_1fr] gap-4 py-4">
              <span className="font-mono text-[11px] lowercase text-foreground/65 transition-colors group-hover:text-foreground">
                owned
              </span>
              <p className="text-sm/6 text-foreground/75 transition-colors group-hover:text-foreground">
                Owned the portal&apos;s frontend delivery, from data wiring to
                the shipped interface.
              </p>
            </li>
            <li className="group grid grid-cols-[4.5rem_1fr] gap-4 py-4">
              <span className="font-mono text-[11px] lowercase text-foreground/65 transition-colors group-hover:text-foreground">
                shipped
              </span>
              <p className="text-sm/6 text-foreground/75 transition-colors group-hover:text-foreground">
                Dashboard, planner, tracker, and quizzes — the loops students
                use to plan, review, and test themselves.
              </p>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-8">
          <WorkViewer />
        </div>
      </div>
    </Section>
  );
}
