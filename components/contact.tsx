import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading title="Contact" meta="say hello" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="max-w-[42ch] text-2xl tracking-tight text-balance sm:text-3xl">
            Let&apos;s build something worth shipping.
          </p>
          <p className="max-w-[46ch] text-base/8 text-foreground/70">
            Tell me about your project and how I can help. Fill in the form and
            I&apos;ll get back to you as soon as I can.
          </p>
          <div>
            <p className="font-mono text-[11px] lowercase text-foreground/65">
              elsewhere
            </p>
            <SocialLinks showLabels className="mt-2" />
          </div>
          <p className="font-mono text-[11px] lowercase text-foreground/65">
            based in india
          </p>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
