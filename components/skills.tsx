import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading title="Technical skills" meta="the tools i reach for" />

      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-[11px] lowercase text-foreground/65">
              {group.label}
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="py-3 text-lg tracking-tight transition-colors hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
