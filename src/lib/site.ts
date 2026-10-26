/**
 * Datos de identidad del sitio. Fuente única para canonical, JSON-LD,
 * llms.txt y el middleware de Vercel (que importa este archivo, así que
 * no debe depender de nada del navegador ni de alias "@/").
 */
export const SITE_URL = "https://www.tideo.tech";

export const ORG = {
  name: "TIDEO Tech & Strategy",
  shortName: "TIDEO",
  email: "contacto@tideo.tech",
  telephone: "+51 919 102 556",
  locality: "Lima",
  country: "PE",
  description:
    "TIDEO diseña, automatiza y construye soluciones digitales para empresas que buscan ordenar procesos, integrar datos y crecer con tecnología, IA y desarrollo ágil.",
  sameAs: ["https://www.facebook.com/tideomarketing", "https://www.instagram.com/tideo.marketing/"],
} as const;

/** URL absoluta para una ruta del sitio principal (www). */
export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Link canonical listo para el `links` de head() en TanStack Router. */
export function canonicalLink(href: string) {
  return { rel: "canonical", href };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  alternateName: ORG.shortName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/tideo-logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description: ORG.description,
  email: ORG.email,
  telephone: ORG.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: ORG.locality,
    addressRegion: ORG.locality,
    addressCountry: ORG.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: ORG.email,
      telephone: ORG.telephone,
      availableLanguage: ["es"],
      areaServed: "PE",
    },
  ],
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  sameAs: [...ORG.sameAs],
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: ORG.name,
  inLanguage: "es",
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
