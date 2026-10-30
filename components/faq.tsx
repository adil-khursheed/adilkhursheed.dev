import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading title="Questions" meta="short answers" />

      <dl className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-10"
          >
            <dt className="text-xl tracking-tight text-balance md:text-2xl">
              {faq.question}
            </dt>
            <dd className="max-w-[62ch] text-base/8 text-foreground/70">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
