import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const revalidate = 60;

function absolute(path: string) {
  return new URL(path, site.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absolute("/portrait/adil-khursheed.png")],
    },
    {
      url: absolute("/projects"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: projects
        .map((project) => project.image_path)
        .filter(Boolean)
        .map(absolute),
    },
  ];
}
