import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

const privatePaths = ["/studio-", "/auth/"];

const answerEngines = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "meta-externalagent",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: answerEngines,
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
