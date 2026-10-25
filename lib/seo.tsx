import { site, socials } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export const socialImage = {
  url: "/social-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
};

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      image: absoluteUrl("/portrait/adil-khursheed.png"),
      jobTitle: site.role,
      description: site.description,
      knowsAbout: site.technologies,
      sameAs: socials.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profile`,
  url: site.url,
  name: `${site.name} | ${site.role}`,
  description: site.description,
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  about: { "@id": personId },
  mainEntity: { "@id": personId },
};
