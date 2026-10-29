import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { TIPO_LABEL, formatFecha, publicaciones } from "@/content/guias";
import { SITE_URL, canonicalLink, canonicalUrl } from "@/lib/site";

const title = "Guías · TIDEO";
const description =
  "Contenido práctico de nuestro laboratorio de IA aplicada: guías, prompts y tutoriales para llevar la IA a la operación de tu empresa.";
const url = canonicalUrl("/guias");

export const Route = createFileRoute("/guias/")({
  component: Guias,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [canonicalLink(url)],
  }),
});

function Guias() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:px-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-primary/60" />
          Laboratorio de IA aplicada
        </div>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-gradient sm:text-7xl">
          Guías para <span className="font-serif-italic text-primary">operar mejor</span>
        </h1>
        <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {publicaciones.map((item) => (
            <Link
              key={item.slug}
              to="/guias/del-tablero-al-agente"
              className="group rounded-2xl border border-hairline bg-surface p-7 transition-colors hover:border-primary/50 sm:p-9"
            >
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-primary">
                <span>{TIPO_LABEL[item.tipo]}</span>
                <span>·</span>
                <span>{item.serie}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold leading-snug tracking-tight group-hover:text-primary sm:text-3xl">
                {item.titulo}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.bajada}</p>
              <div className="mt-7 flex justify-between text-xs text-muted-foreground">
                <span>
                  {formatFecha(item.fecha)} · {item.lectura}
                </span>
                <span className="text-primary">Leer guía →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
