import { Info, UserCheck } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { MENTORING_STEPS, PHASES } from "@/content/excel-app-ia";
import { Section } from "./shared";

const phaseTone = [
  "border-academy/40 bg-academy/[0.07]",
  "border-amber/40 bg-amber/[0.06]",
  "border-hairline bg-surface/40",
];

/** Secciones 6 (el método) y 9 (cómo es la asesoría). */
export function ExcelAppMethod() {
  return (
    <>
      <Section id="metodo" className="border-t border-hairline">
        <SectionHeader
          align="center"
          eyebrow="El método · 24 horas, un proceso claro"
          title={
            <>
              6 horas juntos. 12 horas construyendo tu MVP.{" "}
              <span className="font-serif-italic text-academy">
                6 horas para dominar lo importante.
              </span>
            </>
          }
          description="24 horas síncronas repartidas en seis sesiones de cuatro horas. Los doce participantes asisten a todas las sesiones."
        />

        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {PHASES.map((p, i) => (
            <li key={p.tag} className={`rounded-2xl border p-6 sm:p-8 ${phaseTone[i]}`}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
                <span className="text-3xl font-semibold text-foreground">
                  {p.hours}
                  <span className="text-base font-normal text-muted-foreground"> h</span>
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1 text-xs font-mono text-academy">{p.when}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-hairline">
            <table className="w-full text-sm">
              <caption className="sr-only">Distribución de horas del programa</caption>
              <thead className="bg-surface/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Componente
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium text-right">
                    Horas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-5 py-3 text-foreground/90">Miniaplicación guiada</td>
                  <td className="px-5 py-3 text-right font-mono">6</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-foreground/90">
                    Laboratorio de MVP con asesoría individual por turnos
                  </td>
                  <td className="px-5 py-3 text-right font-mono">12</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-foreground/90">
                    Teoría aplicada y preguntas grupales
                  </td>
                  <td className="px-5 py-3 text-right font-mono">6</td>
                </tr>
                <tr className="bg-academy/[0.06]">
                  <th scope="row" className="px-5 py-3 text-left font-semibold text-foreground">
                    Total de clases en vivo por participante
                  </th>
                  <td className="px-5 py-3 text-right font-mono font-semibold text-academy">24</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-academy/30 bg-academy/[0.06] p-6">
            <Info className="w-5 h-5 text-academy shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              <strong className="text-foreground">Importante:</strong> la asesoría individual está{" "}
              <strong className="text-foreground">incluida</strong> dentro de las 12 horas de
              laboratorio. No se agrega como una hora adicional a las 24 horas anunciadas.
            </p>
          </div>
        </div>
      </Section>

      <Section id="asesoria" className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="¿Cómo es la asesoría personalizada?"
              title={
                <>
                  Tu proyecto no tiene que avanzar al ritmo del{" "}
                  <span className="font-serif-italic text-academy">ejemplo del instructor</span>.
                </>
              }
              description="Desde la tercera sesión, cada participante trabaja en su aplicación. Tendrás un plan de avance y un turno específico para revisar tu caso con el instructor."
            />
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                ["3", "turnos"],
                ["20", "min c/u"],
                ["60", "min exclusivos"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="rounded-xl border border-hairline bg-surface/40 p-4 text-center"
                >
                  <span className="block text-3xl font-semibold text-foreground">{n}</span>
                  <span className="mt-1 block text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface/40 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-academy">
              <UserCheck className="h-4 w-4" /> Así funcionan las sesiones 3 a 6
            </h3>
            <ol className="mt-6 space-y-5">
              {MENTORING_STEPS.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-academy/15 font-mono text-xs text-academy">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/90 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-hairline pt-5 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">
                No tendrás que competir por la atención del instructor en un chat masivo.
              </strong>{" "}
              Los turnos estarán planificados y serán parte del servicio que contrataste.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
