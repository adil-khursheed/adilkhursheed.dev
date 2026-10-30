import { faqs } from "@/lib/faq";
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
const portraitId = `${site.url}/#portrait`;

const portrait = {
  "@type": "ImageObject",
  "@id": portraitId,
  url: absoluteUrl("/portrait/adil-khursheed.png"),
  contentUrl: absoluteUrl("/portrait/adil-khursheed.png"),
  width: 800,
  height: 889,
  caption: `Portrait of ${site.name}`,
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      givenName: "Adil",
      familyName: "Khursheed",
      url: site.url,
      mainEntityOfPage: site.url,
      image: { "@id": portraitId },
      jobTitle: site.role,
      description: site.description,
      knowsAbout: site.technologies,
      hasOccupation: {
        "@type": "Occupation",
        name: site.role,
        occupationLocation: {
          "@type": "Country",
          name: site.country,
        },
        skills: site.technologies,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: site.countryCode,
      },
      sameAs: socials.map((social) => social.href),
    },
    portrait,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": personId },
      copyrightHolder: { "@id": personId },
      copyrightYear: 2026,
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
  primaryImageOfPage: { "@id": portraitId },
  significantLink: socials.map((social) => social.href),
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  url: site.url,
  name: `Questions about ${site.name}`,
  description: `Short answers about ${site.name}, ${site.role.toLowerCase()} based in ${site.country}.`,
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  about: { "@id": personId },
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
