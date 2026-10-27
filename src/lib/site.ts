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
  linkedin: "https://www.linkedin.com/company/tideo-tech-strategy/",
  /** Perfil de Empresa en Google (Maps), por su identificador permanente (CID). */
  googleBusiness: "https://maps.google.com/?cid=11732253999648614933",
  sameAs: [
    "https://www.linkedin.com/company/tideo-tech-strategy/",
    "https://maps.google.com/?cid=11732253999648614933",
    "https://www.facebook.com/tideomarketing",
    "https://www.instagram.com/tideo.marketing/",
  ],
} as const;

/** Enlace de chat de WhatsApp con un mensaje inicial. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${ORG.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Chat de WhatsApp del botón flotante de la home. */
export const WHATSAPP_URL = whatsappUrl(
  "Hola TIDEO, quiero contarles un proceso de mi empresa que me gustaría mejorar.",
);

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
  hasMap: ORG.googleBusiness,
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

export const OPERA_URL = "https://opera.tideo.tech/";
export const POWERBI_URL = "https://powerbi-ia.tideo.tech/";

/**
 * Agrega parámetros UTM a un enlace hacia otro subdominio.
 * Solo `utm_campaign` llega al CRM (ver lib/leads.ts), así que cada ubicación
 * lleva su propia campaña (home_card_opera, home_hero, home_nav, …).
 */
export function trackedUrl(base: string, path: string, campaign: string): string {
  const url = new URL(path, base);
  url.searchParams.set("utm_source", "tideo.tech");
  url.searchParams.set("utm_medium", "web");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

/** Enlace a OPERA (landing, o una subpágina como "metalmecanica") con UTM por ubicación. */
export function operaUrl(campaign: string, path = ""): string {
  return trackedUrl(OPERA_URL, path, campaign);
}

/** Enlace al programa Power BI + IA con UTM por ubicación. */
export function powerbiUrl(campaign: string): string {
  return trackedUrl(POWERBI_URL, "", campaign);
}

/** Etiquetas sociales (Open Graph / Twitter) y de app propias de las páginas de OPERA. */
export function operaSocialMeta({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const image = `${OPERA_URL}og-opera.png`;
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "OPERA by TIDEO" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "application-name", content: "OPERA" },
    { name: "apple-mobile-web-app-title", content: "OPERA" },
  ];
}

export const OPERA_DESCRIPTION =
  "OPERA es un ERP + MOM para talleres de mantenimiento, alquiler de maquinaria, metalmecánica, flotas de servicio, minería y contratistas: órdenes de trabajo, mantenimiento, almacén de repuestos, costos en tiempo real, HSE, compras, finanzas y RRHH en una sola base de datos.";

export const operaJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${OPERA_URL}#software`,
  name: "OPERA",
  alternateName: "OPERA ERP + MOM",
  url: OPERA_URL,
  description: OPERA_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "ERP para talleres y gestión de activos",
  operatingSystem: "Web",
  inLanguage: "es",
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Talleres de mantenimiento, alquiler de maquinaria, metalmecánica, flotas de servicio, minería y construcción, contratistas de mantenimiento",
  },
  featureList: [
    "Órdenes de trabajo y mantenimiento preventivo (CMMS)",
    "Asignación de mecánicos, repuestos y control de tiempos",
    "Almacén e inventario de repuestos en tiempo real (WMS)",
    "Control de producción y rutas de fabricación (MES)",
    "Servicios de campo, despacho y SLAs (FSM)",
    "Seguridad y salud en el trabajo (HSE)",
    "Comercial, finanzas, compras, RRHH y BI integrados",
    "Costos de operación y mantenimiento en tiempo real",
  ],
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  provider: {
    "@id": `${SITE_URL}/#organization`,
    "@type": "Organization",
    name: ORG.name,
    url: `${SITE_URL}/`,
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;
