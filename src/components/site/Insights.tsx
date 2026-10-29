import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";

type Article = { cat: string; title: string; color: string; href?: "/guias/del-tablero-al-agente" };

const articles: Article[] = [
  {
    cat: "Procesos",
    title: "Por qué digitalizar no es automatizar el caos",
    color: "var(--color-consulting)",
  },
  {
    cat: "Software empresarial",
    title: "ERP estándar vs ERP a medida: cómo elegir sin perder flexibilidad",
    color: "var(--color-labs)",
  },
  {
    cat: "Inteligencia artificial",
    title: "Cómo usar IA en procesos administrativos sin perder control",
    color: "var(--color-studio)",
  },
  {
    cat: "Datos & BI",
    title: "Del tablero al agente: guía práctica de BI con IA agéntica",
    color: "var(--color-academy)",
    href: "/guias/del-tablero-al-agente",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Insights"
          title={
            <>
              Ideas para empresas que quieren{" "}
              <span className="font-serif-italic text-primary">operar mejor</span>.
            </>
          }
          description="Compartimos análisis, guías y aprendizajes sobre transformación digital, automatización, IA, datos y sistemas empresariales."
        />

        <div className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2">
          {articles.map((a, i) => (
            // Las tarjetas sin guía publicada se muestran como "Próximamente", no como enlaces a "#".
            <article
              key={a.title}
              className="insight-card group block bg-background p-8 md:p-10"
              style={{ "--insight-color": a.color } as CSSProperties}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span className="insight-card-label">{a.cat}</span>
                <span className="insight-card-number font-mono">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight leading-snug max-w-md">
                {a.href ? (
                  <Link to={a.href} className="hover:text-primary transition-colors">
                    {a.title}
                  </Link>
                ) : (
                  a.title
                )}
              </h3>
              {a.href ? (
                <Link
                  to={a.href}
                  className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:underline"
                >
                  Leer guía →
                </Link>
              ) : (
                <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Próximamente
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
