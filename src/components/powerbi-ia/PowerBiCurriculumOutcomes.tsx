import { Database, LineChart, LayoutDashboard, BrainCircuit, Check } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

const competencies = [
  {
    category: "Datos",
    icon: Database,
    color: "var(--color-labs)",
    tag: "Competencia 01",
    description: "Preparación, limpieza y modelado asistido por modelos de lenguaje.",
    outcomes: [
      "Diagnóstico instantáneo de calidad de datos: detección de nulos, atípicos e inconsistencias.",
      "Generación de código M avanzado en Power Query a partir de instrucciones en lenguaje natural.",
    ],
  },
  {
    category: "Análisis",
    icon: LineChart,
    color: "var(--color-academy)",
    tag: "Competencia 02",
    description: "Lógica de negocio, cálculos DAX de alto impacto y optimización analítica.",
    outcomes: [
      "Diseño y formulación de medidas DAX avanzadas (CALCULATE, Time Intelligence y rankings dinámicos).",
      "Debugging preventivo de contextos de filtro y resolución inmediata de errores de cálculo.",
    ],
  },
  {
    category: "Visualización",
    icon: LayoutDashboard,
    color: "oklch(0.85 0.17 75)",
    tag: "Competencia 03",
    description: "Diseño de interfaz, jerarquía visual y storytelling para directivos.",
    outcomes: [
      "Propuesta y validación de arquitectura de dashboard con IA para toma de decisiones ejecutivas.",
      "Storytelling de datos y selección de visuales adaptada al perfil del usuario final.",
    ],
  },
  {
    category: "Inteligencia Artificial",
    icon: BrainCircuit,
    color: "var(--color-consulting)",
    tag: "Competencia 04",
    description: "Metodología de prompting estructurado y operación con agentes.",
    outcomes: [
      "Dominio del Método C.I.A. (Contexto, Instrucción, Aceptación) para prompts de BI precisos.",
      "Integración de ChatGPT, Claude, Gemini y Google Antigravity en tu flujo diario de BI.",
    ],
  },
];

export function PowerBiCurriculumOutcomes() {
  return (
    <section id="aprendizaje" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Resultados de aprendizaje"
          title={
            <>
              Qué aprenderás a{" "}
              <span className="font-serif-italic text-academy">construir y dirigir</span>.
            </>
          }
          description="Un enfoque práctico de 4 competencias integradas para pasar de operador manual a director de soluciones de Business Intelligence asistidas por IA."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {competencies.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.category}
                className="group relative rounded-2xl border border-hairline bg-surface/30 p-8 transition-all duration-300 hover:border-academy/30 hover:bg-surface/50 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                  style={{ background: c.color }}
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {c.tag}
                  </span>
                  <div
                    className="p-2.5 rounded-xl bg-surface border border-hairline"
                    style={{ color: c.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                  {c.category}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-hairline/60 pt-6">
                  {c.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-academy/15 text-academy">
                        <Check className="h-3 w-3" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed font-normal">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
