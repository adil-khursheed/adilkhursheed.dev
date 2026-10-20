import Image from "next/image";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";

export function About() {
  return (
    <Section id="about">
      <SectionHeading title="About" meta="one person, end to end" />

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
            <Image
              src="/portrait/adil-khursheed.png"
              alt="Portrait of Adil Khursheed"
              width={800}
              height={889}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] lowercase text-foreground/65">
            <span>portrait</span>
            <span>adil khursheed</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 md:col-span-7 lg:col-span-8">
          <p className="max-w-[58ch] text-2xl tracking-tight text-balance sm:text-3xl">
            Based in India, I&apos;m a full stack developer passionate about
            building accessible web apps that people love to use.
          </p>
          <p className="max-w-[62ch] text-base/8 text-foreground/70">
            I like owning a feature from the first sketch to the last deploy:
            shaping the interface, wiring the data, and tuning the parts people
            actually feel — load time, focus states, and the words on the
            buttons.
          </p>
          <div>
            <p className="font-mono text-[11px] lowercase text-foreground/65">
              find me
            </p>
            <SocialLinks showLabels className="mt-2" />
          </div>
        </div>
      </div>
    </Section>
  );
}
