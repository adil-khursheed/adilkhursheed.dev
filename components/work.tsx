import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { WorkViewer } from "@/components/work-viewer";
import { experience } from "@/lib/content";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        title="Work experience"
        meta={
          <>
            <time dateTime={experience.start}>apr 2024</time> —{" "}
            <time dateTime={experience.end}>may 2026</time>
          </>
        }
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl tracking-tight sm:text-4xl">
              {experience.company}
            </h3>
            <span className="font-mono text-[11px] lowercase text-foreground/65">
              past role
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] lowercase text-foreground/65">
            {experience.role} · {experience.product}
          </p>

          <p className="mt-6 max-w-[46ch] text-base/8 text-foreground/70">
            {experience.summary}
          </p>

          <ul className="mt-6 divide-y divide-border border-y border-border">
            {experience.highlights.map((item) => (
              <li
                key={item.label}
                className="group grid grid-cols-[4.5rem_1fr] gap-4 py-4"
              >
                <span className="font-mono text-[11px] lowercase text-foreground/65 transition-colors group-hover:text-foreground">
                  {item.label}
                </span>
                <p className="text-sm/6 text-foreground/75 transition-colors group-hover:text-foreground">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <WorkViewer />
        </div>
      </div>
    </Section>
  );
}
