import { createFileRoute } from "@tanstack/react-router";

import {
  MetalmecanicaAudience,
  MetalmecanicaBreadcrumb,
  MetalmecanicaDifferentials,
  MetalmecanicaFaq,
  MetalmecanicaImplementation,
  MetalmecanicaModules,
  MetalmecanicaProblems,
  MetalmecanicaSolutions,
  MetalmecanicaWorkflow,
} from "@/components/opera/metalmecanica/MetalmecanicaSections";
import { OperaNav } from "@/components/opera/OperaNav";
import { ParallaxHero } from "@/components/opera/ParallaxHero";
import { QualificationForm } from "@/components/opera/QualificationForm";
import { Footer } from "@/components/site/Footer";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { METALMECANICA_URL, metalmecanica, metalmecanicaJsonLd } from "@/lib/metalmecanica-content";
import { jsonLdScript } from "@/lib/site";

const navLinks = [
  { href: "#para-quien", label: "Para quién" },
  { href: "#problemas", label: "Problemas" },
  { href: "#solucion", label: "Solución" },
  { href: "#flujo", label: "Flujo" },
  { href: "#modulos", label: "Módulos" },
  { href: "#faq", label: "Preguntas" },
];

export const Route = createFileRoute("/opera/metalmecanica")({
  component: OperaMetalmecanica,
  head: () => ({
    meta: [
      { title: metalmecanica.metaTitle },
      { name: "description", content: metalmecanica.metaDescription },
      { property: "og:title", content: metalmecanica.metaTitle },
      { property: "og:description", content: metalmecanica.metaDescription },
      { property: "og:url", content: METALMECANICA_URL },
    ],
    links: [{ rel: "canonical", href: METALMECANICA_URL }],
    scripts: metalmecanicaJsonLd.map((d) => jsonLdScript(d)),
  }),
});

function OperaMetalmecanica() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OperaNav links={navLinks} homeLink />
      <main>
        <TracingBeam>
          <ParallaxHero
            title={
              <>
                ERP para{" "}
                <span className="hero-highlight-word font-serif-italic text-primary">
                  metalmecánica
                </span>{" "}
                en Perú
                <span className="mt-5 block text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground/85">
                  OPERA para talleres de fabricación
                </span>
              </>
            }
            description={metalmecanica.subtitle}
            secondaryHref="#flujo"
            secondaryLabel="Ver el flujo de trabajo"
          />
          <MetalmecanicaBreadcrumb />
          <MetalmecanicaAudience />
          <MetalmecanicaProblems />
          <MetalmecanicaSolutions />
          <MetalmecanicaWorkflow />
          <MetalmecanicaModules />
          <MetalmecanicaDifferentials />
          <MetalmecanicaImplementation />
          <MetalmecanicaFaq />
          <QualificationForm defaultTipoOperacion="Metalmecánica-producción" />
        </TracingBeam>
      </main>
      <Footer />
    </div>
  );
}
