import { SectionHeader } from "@/components/site/SectionHeader";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  traditional: string;
  withAi: string;
}

const rows: ComparisonRow[] = [
  { traditional: "Escribir DAX manualmente", withAi: "Diseñar DAX con IA" },
  { traditional: "Buscar errores manualmente", withAi: "Debugging asistido" },
  { traditional: "Crear Power Query paso a paso", withAi: "Generar código M" },
  { traditional: "Analizar tablas manualmente", withAi: "Diagnóstico automático" },
  { traditional: "Diseñar dashboard desde cero", withAi: "IA propone arquitectura" },
  { traditional: "Buscar soluciones en internet", withAi: "Consultar a la IA" },
  { traditional: "Trabajar solo", withAi: "Trabajar con un coworker IA" },
  { traditional: "Ejecutar todo manualmente", withAi: "IA puede operar herramientas" },
];

export function PowerBiDifferentialTable() {
  return (
    <section className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Comparativa directa"
          title={
            <>
              Power BI tradicional vs.{" "}
              <span className="font-serif-italic text-academy">Power BI + IA</span>.
            </>
          }
          description="La diferencia no es saber más fórmulas de memoria, sino saber dirigir a la Inteligencia Artificial con criterio analítico para multiplicar tu productividad."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-hairline bg-surface/20">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-2 bg-surface/80 border-b border-hairline text-xs uppercase tracking-widest text-muted-foreground font-mono">
            <div className="p-5 pl-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400/80" />
              Power BI Tradicional
            </div>
            <div className="p-5 pl-8 bg-academy/[0.08] text-academy font-semibold flex items-center gap-2 border-l border-hairline">
              <span className="w-2 h-2 rounded-full bg-academy animate-pulse" />
              Power BI + Inteligencia Artificial
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`grid md:grid-cols-2 border-t border-hairline transition-colors hover:bg-surface/40 ${
                idx === 0 ? "border-t-0" : ""
              }`}
            >
              {/* Traditional Column */}
              <div className="p-5 md:p-6 md:pl-8 flex items-center gap-3 text-muted-foreground text-sm sm:text-base">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span>{row.traditional}</span>
              </div>

              {/* AI Column */}
              <div className="p-5 md:p-6 md:pl-8 bg-academy/[0.04] md:border-l border-hairline flex items-center gap-3 font-semibold text-foreground text-sm sm:text-base">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-academy/20 text-academy">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-foreground">{row.withAi}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom takeaway quote */}
        <div className="mt-10 rounded-2xl border border-academy/30 bg-surface/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg md:text-xl font-medium text-foreground max-w-3xl leading-relaxed">
            No volveremos a aprender Power BI desde cero.{" "}
            <span className="font-serif-italic text-academy">
              Vamos a aprender cómo hacer con IA lo que antes hacíamos manualmente.
            </span>
          </p>
          <a
            href="#inscripcion"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-academy px-6 py-3 text-sm font-semibold text-background hover:bg-academy/90 transition-colors shadow-[0_0_25px_-5px_rgba(249,115,22,0.45)]"
          >
            Dar el salto ahora →
          </a>
        </div>
      </div>
    </section>
  );
}
