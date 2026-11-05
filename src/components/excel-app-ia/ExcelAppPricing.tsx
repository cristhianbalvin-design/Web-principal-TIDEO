import { ArrowRight, Check, ShieldAlert, Laptop } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { COURSE, INCLUDES, REQUIREMENTS, SESSIONS, formatPEN } from "@/content/excel-app-ia";
import { PrimaryCta, Section } from "./shared";

const modality = [
  ["Modalidad", "Virtual en vivo."],
  [
    "Duración",
    "24 horas síncronas de participación por alumno, distribuidas en 6 sesiones de 4 horas.",
  ],
  ["Grupo", "Máximo 12 participantes."],
  [
    "Mentoría exclusiva",
    "60 minutos acumulados por alumno, incluidos dentro de las horas del programa.",
  ],
  [
    "Herramientas",
    "Lovable o Claude Design, Supabase, GitHub y Vercel para construir y publicar, y agentes de desarrollo como Claude Code, Codex y Gemini. Algunas herramientas requieren cuentas personales y pueden tener límites o costos según el uso.",
  ],
] as const;

/** Secciones 12 (fechas), 13 (inversión) y 14 (requisitos). */
export function ExcelAppPricing() {
  return (
    <>
      <Section id="fechas" className="border-t border-hairline">
        <SectionHeader
          eyebrow="Fechas, horarios y modalidad"
          title={
            <>
              Primera cohorte ·{" "}
              <span className="font-serif-italic text-academy">Diciembre 2026 – Enero 2027</span>
            </>
          }
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="overflow-x-auto rounded-2xl border border-hairline">
            <table className="w-full text-sm">
              <caption className="sr-only">Calendario de sesiones de la primera cohorte</caption>
              <thead className="bg-surface/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Sesión
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                    Hora (Perú)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {SESSIONS.map((s) => (
                  <tr key={s.n}>
                    <td className="px-4 py-3 font-mono text-academy">{s.n}</td>
                    <td className="px-4 py-3 text-foreground/90">{s.date}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {COURSE.scheduleShort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {modality.map(([k, v]) => (
              <div key={k} className="bg-background p-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-xs font-mono uppercase tracking-widest text-academy">{k}</dt>
                <dd className="mt-1.5 sm:mt-0 sm:col-span-2 text-sm text-foreground/90 leading-relaxed">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="inversion" className="border-t border-hairline" width="max-w-5xl">
        <SectionHeader
          align="center"
          eyebrow="Inversión"
          title={
            <>
              Una inversión para dejar de depender solamente de{" "}
              <span className="font-serif-italic text-academy">soluciones prefabricadas</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-academy/40 bg-surface/50 p-8 shadow-2xl shadow-black/50">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-academy/20 blur-3xl"
            />
            <p className="text-xs font-mono uppercase tracking-widest text-academy">
              Precio fundador — {COURSE.cohort}
            </p>
            <p className="mt-4 text-5xl sm:text-6xl font-semibold tracking-tight text-foreground">
              {formatPEN(COURSE.priceFounder)}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Precio regular de referencia: {formatPEN(COURSE.priceRegular)}
            </p>
            <p className="mt-6 text-sm text-foreground/90">
              <strong>Vacantes limitadas a 12 personas</strong> para preservar la atención
              personalizada.
            </p>
            <div className="mt-7">
              <PrimaryCta>
                Solicitar mi vacante
                <ArrowRight className="w-4 h-4" />
              </PrimaryCta>
            </div>
            <p className="mt-4 text-xs italic text-muted-foreground">
              La reserva queda confirmada al completar el proceso de inscripción y pago indicado por
              TIDEO.
            </p>
          </div>
          <div className="lg:col-span-3 rounded-3xl border border-hairline bg-surface/30 p-8">
            <h3 className="font-semibold text-foreground">Tu inscripción al Nivel 1 incluye:</h3>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="h-4 w-4 shrink-0 text-academy mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="requisitos" className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Qué necesitas para participar"
              title={
                <>
                  No necesitas ser programador. Sí necesitas{" "}
                  <span className="font-serif-italic text-academy">venir listo para construir</span>
                  .
                </>
              }
            />
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-amber/30 bg-amber/[0.06] p-6">
              <ShieldAlert className="h-5 w-5 shrink-0 text-amber mt-0.5" />
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong className="text-foreground">Importante sobre tus datos:</strong> construirás
                y probarás tu aplicación con datos sintéticos. Cuando esté validada, cargarás tus
                datos empresariales en tu propia base de datos, con autorización de tu empresa.
                Nunca compartas contraseñas ni información confidencial en los prompts de las
                herramientas de IA.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface/40 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-academy">
              <Laptop className="h-4 w-4" /> Recomendamos contar con
            </h3>
            <ul className="mt-5 space-y-4">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-academy" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
