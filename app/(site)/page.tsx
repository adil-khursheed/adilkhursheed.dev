import type { Metadata } from "next";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";
import { faqPageSchema, JsonLd, profilePageSchema } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[profilePageSchema, faqPageSchema]} />
      <Hero />
      <About />
      <Work />
      <Skills />
      <FeaturedProjects />
      <Faq />
      <Contact />
    </>
  );
}
