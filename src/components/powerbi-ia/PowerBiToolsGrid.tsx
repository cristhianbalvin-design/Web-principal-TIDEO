import { SectionHeader } from "@/components/site/SectionHeader";
import { Sparkles, Bot, BrainCircuit, Terminal, Cpu } from "lucide-react";

interface ToolItem {
  name: string;
  creator: string;
  role: string;
  description: string;
  badge: string;
  highlight?: boolean;
}

const tools: ToolItem[] = [
  {
    name: "Power BI Desktop",
    creator: "Microsoft",
    role: "Motor Analítico & Modelado",
    description:
      "El entorno principal de desarrollo analítico, relaciones de tablas, medidas DAX y visualización de dashboards de negocio.",
    badge: "Plataforma Central",
  },
  {
    name: "ChatGPT",
    creator: "OpenAI",
    role: "Asistente & Lógica DAX",
    description:
      "Ideación rápida de indicadores, formulación de consultas complejas y generación de explicaciones comerciales para el dashboard.",
    badge: "GPT-4o / o1 / o3",
  },
  {
    name: "Claude",
    creator: "Anthropic",
    role: "Precisión en Código & Esquemas",
    description:
      "Especialista en estructuración de código M avanzado, análisis de dependencias de tablas y resolución matemática de contextos de filtro.",
    badge: "Claude 3.7 Sonnet",
  },
  {
    name: "Gemini",
    creator: "Google",
    role: "Velocidad & Análisis Multimodal",
    description:
      "Comprensión de capturas de pantallas de modelos, diagramas de bases de datos y síntesis de grandes volúmenes documentales de negocio.",
    badge: "Gemini 2.5 Flash / Pro",
  },
  {
    name: "Google Antigravity",
    creator: "Google DeepMind",
    role: "Entorno Agéntico & MCP",
    description:
      "Herramienta de desarrollo agéntico avanzada para operar tareas complejas de programación, manipulación de archivos y flujos de automatización directa.",
    badge: "Nivel 3 — Operador Agéntico",
    highlight: true,
  },
];

export function PowerBiToolsGrid() {
  return (
    <section className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El stack tecnológico"
          title={
            <>
              Las herramientas que dominarás en{" "}
              <span className="font-serif-italic text-academy">un solo flujo de trabajo</span>.
            </>
          }
          description="No necesitas depender de una sola herramienta. En este curso aprenderás cuándo y cómo utilizar cada modelo de IA según la tarea técnica a resolver."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-7 transition-all duration-300 flex flex-col justify-between ${
                t.highlight
                  ? "border-academy/50 bg-academy/[0.05] shadow-[0_0_35px_-10px_rgba(249,115,22,0.25)] sm:col-span-2 lg:col-span-1"
                  : "border-hairline bg-surface/30 hover:border-academy/30 hover:bg-surface/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    {t.creator}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      t.highlight
                        ? "bg-academy/20 text-academy border border-academy/40"
                        : "bg-surface text-muted-foreground border border-hairline"
                    }`}
                  >
                    {t.highlight && <Cpu className="w-3 h-3 text-academy animate-pulse" />}
                    {t.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  {t.name}
                  {t.highlight && (
                    <span className="text-xs px-2 py-0.5 rounded bg-academy text-background font-mono font-bold">
                      DESTACADO
                    </span>
                  )}
                </h3>

                <div className="mt-1 text-xs font-mono text-academy">{t.role}</div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline/60 flex items-center gap-2 text-xs font-mono text-foreground/80">
                <Sparkles className="w-3.5 h-3.5 text-academy" />
                <span>Integrado al método TIDEO</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
