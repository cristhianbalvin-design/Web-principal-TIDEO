import { AlertTriangle, Zap, CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

export function PowerBiProblemSolution() {
  return (
    <section className="py-24 md:py-32 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El cambio de paradigma"
          title={
            <>
              Lo que aprendiste sigue siendo útil.{" "}
              <span className="font-serif-italic text-academy">La forma de crearlo cambió</span>.
            </>
          }
          description="Durante años, dominar Power BI significaba memorizar funciones DAX complejas, repetir transformaciones mecánicas en Power Query y resolver problemas solo frente a una pantalla. Hoy, la Inteligencia Artificial redefine cada paso del proceso analítico."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Bloque Problema */}
          <div className="rounded-2xl border border-hairline bg-surface/20 p-8 lg:p-10 relative overflow-hidden transition-all duration-300 hover:border-red-500/20">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-red-500/5 blur-3xl"
            />
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-red-400">
              <AlertTriangle className="w-4 h-4" />
              El Enfoque Tradicional
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
              Aprendiste Power BI cuando todavía hacíamos todo{" "}
              <span className="text-red-400/90 font-mono">manualmente</span>.
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Horas invertidas escribiendo fórmulas DAX desde cero con miedo a alterar el contexto
              de filtro, limpiando datos en Power Query paso por paso y buscando soluciones en foros
              obsoletos.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground/90">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                <span>Escribir DAX a prueba y error hasta que el cálculo coincida.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                <span>Modelado relacional manual sin validación preventiva de calidad.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                <span>Diseñar la estética del dashboard desde un lienzo en blanco.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                <span>Trabajo solitario resolviendo bugs complejos de rendimiento.</span>
              </li>
            </ul>
          </div>

          {/* Bloque Oportunidad */}
          <div className="rounded-2xl border border-academy/30 bg-surface/40 p-8 lg:p-10 relative overflow-hidden shadow-[0_0_50px_-20px_rgba(249,115,22,0.15)] transition-all duration-300 hover:border-academy/50">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-academy/15 blur-3xl"
            />
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-academy">
              <Zap className="w-4 h-4" />
              El Nuevo Estándar
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
              La IA está cambiando completamente la forma de desarrollar{" "}
              <span className="font-serif-italic text-academy">Business Intelligence</span>.
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              No se trata de reemplazar tu criterio analítico, sino de multiplicarlo. Ahora diriges
              a modelos de lenguaje y agentes para concebir, auditar y acelerar la construcción de
              soluciones analíticas de alto impacto.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-foreground/90">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 flex-shrink-0" />
                <span>
                  Diseño y depuración de medidas DAX complejas en segundos con contexto exacto.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 flex-shrink-0" />
                <span>Generación automática de código M y profilado instantáneo de datos.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 flex-shrink-0" />
                <span>
                  Propuestas estructuradas de arquitectura visual y storytelling ejecutivo.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 flex-shrink-0" />
                <span>Coworkers y agentes de IA operando el entorno de desarrollo contigo.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
