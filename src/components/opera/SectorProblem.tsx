import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FocusCards } from "@/components/ui/focus-cards";
import {
  AlertTriangle,
  CalendarClock,
  Clock,
  Database,
  FileText,
  ShieldAlert,
} from "lucide-react";

const problems = [
  {
    n: "01",
    tag: "Información",
    title: "Información dispersa",
    description: "Operaciones en Excel, mantenimiento en papel y finanzas en un ERP que no conversa con nadie.",
    icon: Database,
    color: "var(--color-consulting)",
  },
  {
    n: "02",
    tag: "Costos",
    title: "Costos que se descubren tarde",
    description: "Te enteras de la rentabilidad real de un proyecto o equipo semanas después del cierre.",
    icon: Clock,
    color: "var(--color-labs)",
  },
  {
    n: "03",
    tag: "Disponibilidad",
    title: "Disponibilidad gestionada a ojo",
    description: "Falta de visibilidad en tiempo real sobre qué equipos están operativos, en falla o en mantenimiento preventivo.",
    icon: AlertTriangle,
    color: "var(--color-academy)",
  },
  {
    n: "04",
    tag: "Seguridad",
    title: "HSE como un trámite, no prevención",
    description: "Auditorías lentas, reportes de incidentes que se pierden y falta de trazabilidad en seguridad.",
    icon: ShieldAlert,
    color: "var(--color-labs)",
  },
  {
    n: "05",
    tag: "Productividad",
    title: "Doble digitación y reprocesos",
    description: "El operario anota en papel y un asistente lo pasa a Excel. Pérdida de horas hombre y margen de error humano.",
    icon: FileText,
    color: "var(--color-consulting)",
  },
  {
    n: "06",
    tag: "Tiempo real",
    title: "Decisiones con datos de la semana pasada",
    description: "Decisiones gerenciales basadas en reportes de la semana pasada, no en lo que está pasando ahora mismo en el taller o en la mina.",
    icon: CalendarClock,
    color: "var(--color-studio)",
  },
];

export function SectorProblem() {
  return (
    <section className="py-24 md:py-32 bg-surface/30 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El problema del sector"
          title={
            <>
              El divorcio entre la <span className="font-serif-italic text-primary">operación</span> y la <span className="font-serif-italic text-primary">gestión</span>.
            </>
          }
          description="Los ERP tradicionales están hechos para contadores, no para jefes de mantenimiento ni supervisores de campo. Esto genera problemas críticos."
        />

        <FocusCards className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {({ focusedIndex, setFocusedIndex }) =>
            problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <article
                  key={problem.n}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  tabIndex={0}
                  className={`focus-product-card group relative bg-background p-8 outline-none transition-all duration-300 hover:bg-surface/60 focus-visible:bg-surface/60 md:p-10 ${
                    focusedIndex !== null && focusedIndex !== index
                      ? "scale-[0.98] opacity-45 blur-[1.5px]"
                      : "scale-100 opacity-100 blur-0"
                  }`}
                  style={{ "--focus-card-color": problem.color } as CSSProperties}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="focus-product-index font-mono">{problem.n}</span>
                    <span className="focus-product-tag">{problem.tag}</span>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `color-mix(in oklab, ${problem.color} 12%, transparent)`,
                        color: problem.color,
                        border: `1px solid color-mix(in oklab, ${problem.color} 25%, transparent)`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground leading-snug">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>

                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${problem.color}, transparent)`,
                    }}
                  />
                </article>
              );
            })
          }
        </FocusCards>
      </div>
    </section>
  );
}
