import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
