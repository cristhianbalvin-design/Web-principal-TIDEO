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

      <div className="relative mt-16">
        {/* Línea de progreso que une los niveles en pantallas grandes. */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-academy via-hairline to-hairline"
        />
        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LEVELS.map((l) => (
            <li key={l.n} className="flex flex-col">
              <span
                className={`relative z-10 mx-auto hidden lg:flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm ${
                  l.current
                    ? "border-academy bg-academy text-background shadow-[0_0_24px_-4px_rgba(249,115,22,0.7)]"
                    : "border-hairline bg-background text-muted-foreground"
                }`}
              >
                {l.n}
              </span>
              <div
                className={`mt-0 lg:mt-5 flex flex-1 flex-col rounded-2xl border p-6 ${
                  l.current
                    ? "border-academy bg-academy/[0.1] shadow-[0_0_40px_-12px_rgba(249,115,22,0.6)]"
                    : "border-hairline bg-surface/30"
                }`}
              >
                <span
                  className={`font-mono text-xs uppercase tracking-widest ${
                    l.current ? "text-academy" : "text-muted-foreground"
                  }`}
                >
                  Nivel {l.n}
                </span>
                <h3 className="mt-3 lg:min-h-[3.25rem] font-semibold leading-snug text-foreground">
                  {l.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {l.text}
                </p>
                <span
                  className={`mt-5 self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                    l.current
                      ? "bg-academy text-background"
                      : "border border-hairline text-muted-foreground"
                  }`}
                >
                  {l.current ? "Inscripción abierta" : "Próximamente"}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

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
