import { SectionHeader } from "@/components/site/SectionHeader";
import { LEVELS } from "@/content/excel-app-ia";
import { Section } from "./shared";

/** Sección 11: AI Business Builder como ruta de 5 niveles (Nivel 1 resaltado). */
export function ExcelAppRoadmap() {
  return (
    <Section id="ruta" className="border-t border-hairline">
      <SectionHeader
        align="center"
        eyebrow="Este curso es el Nivel 1 de algo mayor"
        title={
          <>
            Tu app es el comienzo. Lo siguiente es hacerla{" "}
            <span className="font-serif-italic text-academy">cada vez más inteligente</span>.
          </>
        }
        description="AI Business Builder es una ruta modular de TIDEO pensada para profesionales que quieren pasar de usar software a crear y mejorar soluciones empresariales con inteligencia artificial."
      />

      {/* Escalones: cada nivel sube un poco más en pantallas grandes. */}
      <ol className="mt-16 grid gap-4 lg:grid-cols-5 lg:items-end">
        {LEVELS.map((l) => (
          <li
            key={l.n}
            style={{ ["--step" as string]: `${(l.n - 1) * 1.5}rem` }}
            className={`relative rounded-2xl border p-6 lg:mb-[var(--step)] ${
              l.current
                ? "border-academy bg-academy/[0.1] shadow-[0_0_40px_-12px_rgba(249,115,22,0.6)]"
                : "border-hairline bg-surface/30"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`whitespace-nowrap font-mono text-xs uppercase tracking-widest ${
                  l.current ? "text-academy" : "text-muted-foreground"
                }`}
              >
                Nivel {l.n}
              </span>
              <span
                className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  l.current
                    ? "bg-academy text-background"
                    : "border border-hairline text-muted-foreground"
                }`}
              >
                {l.current ? "Inscripción abierta" : "Próximamente"}
              </span>
            </div>
            <h3
              className={`mt-4 font-semibold leading-snug ${
                l.current ? "text-foreground text-lg" : "text-foreground/80"
              }`}
            >
              {l.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-base text-foreground/90 max-w-3xl mx-auto">
        <strong className="text-foreground">
          Cada nivel tendrá valor propio. Juntos forman una ruta más completa.
        </strong>{" "}
        El propósito es que puedas seguir desarrollando el mismo proyecto, sumando nuevas
        capacidades en lugar de comenzar de cero en cada curso.
      </p>
      <p className="mt-4 text-center text-xs italic text-muted-foreground max-w-3xl mx-auto">
        La presente inscripción corresponde únicamente al Nivel 1. Los siguientes módulos se
        ofrecerán por separado; sus fechas, contenidos definitivos y precios se comunicarán
        oportunamente.
      </p>
    </Section>
  );
}
