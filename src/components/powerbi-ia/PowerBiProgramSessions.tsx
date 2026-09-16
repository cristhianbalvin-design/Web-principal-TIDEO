import { MouseEvent } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface SessionItem {
  number: string;
  duration: string;
  title: string;
  summary: string;
  bullets: string[];
}

const sessions: SessionItem[] = [
  {
    number: "01",
    duration: "Sesión 1 · 3 horas",
    title: "Del Power BI tradicional a Power BI + IA Agéntica",
    summary: "Cambio de rol: de operador mecánico a director de inteligencia analítica.",
    bullets: [
      "Configuración y ecosistema del stack: ChatGPT, Claude, Gemini y Google Antigravity.",
      "Auditoría rápida y perfilado de datos guiado por modelos de lenguaje.",
      "Diseño de prompts estructurados bajo el framework C.I.A.",
    ],
  },
  {
    number: "02",
    duration: "Sesión 2 · 3 horas",
    title: "Preparación y modelado de datos con IA",
    summary: "Transformación inteligente de tablas y aseguramiento de esquemas estrella.",
    bullets: [
      "Generación y depuración de código M avanzado en Power Query sin clicks repetitivos.",
      "Validación de cardinalidad y eliminación de relaciones bidireccionales conflictivas.",
      "Creación de tablas de dimensiones y calendarios analíticos automáticos.",
    ],
  },
  {
    number: "03",
    duration: "Sesión 3 · 3 horas",
    title: "DAX y análisis con Inteligencia Artificial",
    summary: "Cálculos de negocio avanzados sin memorizar fórmulas complejas.",
    bullets: [
      "Formulación de medidas DAX complejas: CALCULATE, inteligencia temporal y ratios.",
      "Debugging paso a paso de contextos de filtro y resolución de discrepancias numéricas.",
      "Optimización de rendimiento en consultas y explicaciones conceptuales del cálculo.",
    ],
  },
  {
    number: "04",
    duration: "Sesión 4 · 3 horas",
    title: "Dashboard 100% desarrollado con IA + Proyecto final",
    summary: "Construcción completa de una solución analítica de inicio a fin.",
    bullets: [
      "Diseño de layouts ejecutivos, tarjetas de KPI y storytelling visual propuesto por IA.",
      "Documentación técnica automatizada y generación de diccionarios de datos.",
      "Presentación del proyecto integrador y entrega del roadmap para continuar escalando.",
    ],
  },
];

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--hover-x", `${x}%`);
  event.currentTarget.style.setProperty("--hover-y", `${y}%`);
}

export function PowerBiProgramSessions() {
  return (
    <section id="temario" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Estructura curricular"
          title={
            <>
              Programa formativo:{" "}
              <span className="font-serif-italic text-academy">4 sesiones de 3 horas</span>.
            </>
          }
          description="12 horas de clase en vivo altamente prácticas, con metodología progresiva para construir un proyecto integrador real desde la conexión de datos hasta la entrega del dashboard."
        />

        {/* Sessions Flow Navigation Pills */}
        <div className="mt-12 flex flex-wrap items-center gap-2 md:gap-3">
          {sessions.flatMap((s, i) => {
            const pill = (
              <div
                key={s.number}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-academy/30 bg-academy/[0.08]"
              >
                <span className="font-mono text-xs font-bold text-academy leading-none">
                  {s.number}
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground/90">
                  {s.title}
                </span>
              </div>
            );
            if (i < sessions.length - 1) {
              return [
                pill,
                <svg
                  key={`arrow-${i}`}
                  className="text-academy/60 flex-shrink-0 hidden sm:block"
                  width="20"
                  height="14"
                  viewBox="0 0 22 16"
                  fill="none"
                >
                  <path
                    d="M1 8h16M13 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>,
              ];
            }
            return [pill];
          })}
        </div>

        {/* Cards Grid */}
        <HoverEffect className="mt-12 grid gap-6 md:grid-cols-2">
          {sessions.map((s) => (
            <article
              key={s.number}
              onMouseMove={handleCardPointer}
              className="card-hover-effect-card rounded-2xl border border-hairline bg-surface/30 p-7 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-academy text-sm">
                    Módulo {s.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground font-mono">
                    <Clock className="w-3.5 h-3.5 text-academy" />
                    {s.duration}
                  </span>
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.summary}</p>

                <ul className="mt-6 space-y-2.5 border-t border-hairline/60 pt-6 text-sm text-foreground/85">
                  {s.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-hairline/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Sesión en vivo + grabación</span>
                <span className="text-academy font-semibold">100% práctico</span>
              </div>
            </article>
          ))}
        </HoverEffect>
      </div>
    </section>
  );
}
