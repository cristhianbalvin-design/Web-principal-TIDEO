import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { GuideContent, GuideShare, GuideVideo } from "@/components/site/GuideContent";
import { Nav } from "@/components/site/Nav";
import { delTableroAlAgente as guide, formatFecha } from "@/content/guias";
import { ORG, SITE_URL, canonicalLink, canonicalUrl, jsonLdScript } from "@/lib/site";

const url = canonicalUrl(`/guias/${guide.slug}`);
const ogImage = `${SITE_URL}/guias/og-${guide.slug}.jpg`;
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.titulo,
  description: guide.bajada,
  datePublished: guide.fecha,
  author: { "@type": "Organization", name: ORG.shortName, url: SITE_URL },
  publisher: { "@type": "Organization", name: ORG.shortName, url: SITE_URL },
  inLanguage: "es-PE",
  mainEntityOfPage: url,
  image: ogImage,
  video: {
    "@type": "VideoObject",
    name: "Del tablero al agente",
    description:
      "BI con IA agéntica en menos de un minuto: del tablero que muestra qué pasó al agente que explica por qué.",
    contentUrl: `${SITE_URL}/guias/${guide.slug}.mp4`,
    thumbnailUrl: `${SITE_URL}/guias/${guide.slug}-poster.jpg`,
    uploadDate: guide.fecha,
    duration: "PT53S",
  },
};

export const Route = createFileRoute("/guias/del-tablero-al-agente")({
  component: GuidePage,
  head: () => ({
    meta: [
      { title: `${guide.titulo} | TIDEO` },
      { name: "description", content: guide.bajada },
      { property: "og:title", content: guide.titulo },
      { property: "og:description", content: guide.bajada },
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [canonicalLink(url)],
    scripts: [jsonLdScript(articleJsonLd)],
  }),
});

function GuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-28 pb-20 sm:pt-36">
        <header className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:px-10">
          <div>
            <Link to="/guias" className="text-sm text-primary hover:underline">
              ← Guías
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-primary">{guide.serie}</span>
              <span>·</span>
              <time dateTime={guide.fecha}>{formatFecha(guide.fecha)}</time>
              <span>·</span>
              <span>{guide.lectura} de lectura</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-gradient sm:text-7xl">
              Del tablero al <span className="font-serif-italic text-primary">agente</span>
            </h1>
            <p className="mt-7 max-w-[68ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {guide.bajada}
            </p>
            <GuideShare url={url} titulo={guide.titulo} />
          </div>
          <GuideVideo src={`/guias/${guide.slug}.mp4`} poster={`/guias/${guide.slug}-poster.jpg`} />
        </header>
        <GuideContent guide={guide} />
      </main>
      <Footer />
    </div>
  );
}
