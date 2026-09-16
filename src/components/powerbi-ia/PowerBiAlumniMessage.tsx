import { Quote, Sparkles } from "lucide-react";

export function PowerBiAlumniMessage() {
  return (
    <section className="py-20 md:py-28 border-b border-hairline relative overflow-hidden bg-surface/20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[24rem] rounded-full bg-academy/10 blur-[120px] -z-10"
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="relative rounded-3xl border border-academy/30 bg-surface/40 p-8 sm:p-12 md:p-14 backdrop-blur-xl shadow-2xl shadow-black/40">
          <Quote className="h-10 w-10 text-academy/40 mb-6" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-academy/15 text-academy border border-academy/30 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Mensaje especial para exalumnos
          </div>

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-relaxed text-foreground">
            "Si llevaste conmigo un curso de Power BI, probablemente aprendiste a conectarte a
            datos, transformarlos, modelarlos, crear medidas DAX y finalmente construir dashboards.
            Pero la forma de trabajar con Power BI está cambiando...{" "}
            <span className="font-serif-italic text-academy underline decoration-academy/40 underline-offset-8">
              No volveremos a aprender Power BI desde cero.
            </span>{" "}
            Vamos a aprender cómo hacer con IA lo que antes hacíamos manualmente."
          </blockquote>

          <div className="mt-8 pt-8 border-t border-hairline/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-foreground text-base">Instructor del Programa</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                TIDEO Academy · Tech & Strategy
              </div>
            </div>
            <a
              href="#inscripcion"
              className="inline-flex items-center justify-center rounded-full bg-academy/20 border border-academy/40 px-5 py-2 text-xs font-semibold text-academy hover:bg-academy hover:text-background transition-all duration-200"
            >
              Actualizar mis habilidades →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
