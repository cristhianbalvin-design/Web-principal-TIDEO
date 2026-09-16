import { SectionHeader } from "@/components/site/SectionHeader";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export function PowerBiTargetAudience() {
  return (
    <section className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Perfil del participante"
          title={
            <>
              ¿Es este curso el{" "}
              <span className="font-serif-italic text-academy">adecuado para ti</span>?
            </>
          }
          description="Queremos asegurar que aproveches cada minuto de las 12 horas. Revisa con claridad a quién le aportará el máximo valor y en qué casos es preferible esperar."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Columna: Sí, es para ti */}
          <div className="rounded-2xl border border-academy/40 bg-surface/30 p-8 lg:p-10 relative overflow-hidden shadow-[0_0_40px_-20px_rgba(249,115,22,0.15)] flex flex-col justify-between">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-academy/15 blur-3xl"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-academy/15 text-academy border border-academy/30 mb-6">
                <CheckCircle2 className="w-4 h-4" />
                Sí, este curso es para ti
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Si buscas multiplicar tu velocidad y criterio con IA
              </h3>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Diseñado para profesionales que ya conocen las bases de Power BI o Excel avanzado y
                quieren dejar atrás las tareas mecánicas.
              </p>

              <ul className="mt-6 space-y-3.5 text-sm text-foreground/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 shrink-0" />
                  <span>
                    <strong>Analistas de datos, BI y negocio:</strong> que necesitan responder
                    requerimientos en horas en lugar de semanas.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 shrink-0" />
                  <span>
                    <strong>
                      Profesionales de operaciones, finanzas, logística, comercial, RRHH y
                      planeamiento:
                    </strong>{" "}
                    que construyen reportes de gestión.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 shrink-0" />
                  <span>
                    <strong>Ingenieros, administradores y consultores:</strong> que asesoran
                    empresas y deben dominar el estándar más moderno.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 shrink-0" />
                  <span>
                    <strong>Docentes y capacitadores:</strong> que forman a nuevas generaciones en
                    herramientas de análisis con IA.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-academy mt-0.5 shrink-0" />
                  <span>
                    <strong>Cualquiera que ya llevó un curso tradicional:</strong> y siente que
                    escribir DAX y Power Query a mano hoy es una pérdida de tiempo.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline/60 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                Requisito: Conocimientos básicos de Power BI
              </span>
              <a
                href="#inscripcion"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-academy hover:underline"
              >
                Inscribirme al curso <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columna: Aún no es para ti */}
          <div className="rounded-2xl border border-hairline bg-surface/20 p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-surface text-muted-foreground border border-hairline mb-6">
                <XCircle className="w-4 h-4 text-red-400" />
                Aún no es para ti
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Si buscas aprender Power BI desde cero absoluto
              </h3>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Este es un curso de actualización y aceleración con Inteligencia Artificial. No
                invertiremos tiempo explicando qué es una tabla o cómo instalar el software.
              </p>

              <ul className="mt-6 space-y-3.5 text-sm text-muted-foreground/90">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 shrink-0" />
                  <span>
                    <strong>Personas que nunca han abierto Power BI Desktop:</strong> y no están
                    familiarizadas con el concepto de relaciones o filtros.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 shrink-0" />
                  <span>
                    <strong>Quienes buscan un curso tradicional:</strong> centrado en memorizar
                    menús, botones y sintaxis paso a paso sin usar IA.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 shrink-0" />
                  <span>
                    <strong>Quienes esperan que la IA trabaje sin supervisión humana:</strong> sin
                    validar la consistencia de los datos ni la lógica de negocio.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline/60 bg-background/50 rounded-xl p-4 border border-hairline text-xs text-muted-foreground">
              <strong className="text-foreground">Recomendación honesta:</strong> Si partes desde
              cero, te recomendamos primero llevar un curso introductorio básico y luego inscribirte
              aquí para actualizar tu metodología al estándar con IA.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
