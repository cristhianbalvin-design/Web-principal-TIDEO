import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { GuideContent, GuideShare } from "@/components/site/GuideContent";
import { Nav } from "@/components/site/Nav";
import { dondeEstanTusDatos as guide, formatFecha } from "@/content/guias";
import { ORG, SITE_URL, canonicalLink, canonicalUrl, jsonLdScript } from "@/lib/site";

const url = canonicalUrl(`/guias/${guide.slug}`);
const ogImage = `${SITE_URL}/og-image.png`;
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
};

export const Route = createFileRoute("/guias/donde-estan-tus-datos")({
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
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
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
        <header className="mx-auto max-w-6xl px-6 pb-12 lg:px-10">
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
              ¿Dónde están tus <span className="font-serif-italic text-primary">datos?</span>
              <br />
              Guía de la nube para pymes
            </h1>
            <p className="mt-7 max-w-[68ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {guide.bajada}
            </p>
            <GuideShare url={url} titulo={guide.titulo} />
          </div>
        </header>
        <GuideContent guide={guide} />
      </main>
      <Footer />
    </div>
  );
}
