import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { WorkViewer } from "@/components/work-viewer";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading title="Work" meta="leadlly — apr 2024 – present" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <div>
            <h3 className="text-2xl tracking-tight sm:text-3xl">
              Frontend Developer
            </h3>
            <p className="mt-2 font-mono text-[11px] lowercase text-foreground/65">
              Leadlly · april 2024 – present
            </p>
          </div>
          <p className="max-w-[46ch] text-base/8 text-foreground/70">
            Built the student portal from scratch so students can manage
            self-study through personalized planning, tracking, and mentoring.
          </p>
          <p className="max-w-[46ch] text-sm/6 text-foreground/65">
            Four screens below, straight from the shipped portal.
          </p>
        </div>

        <div className="lg:col-span-8">
          <WorkViewer />
        </div>
      </div>
    </Section>
  );
}
