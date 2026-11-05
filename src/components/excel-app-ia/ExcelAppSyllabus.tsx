import { PackageCheck, CalendarOff } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SESSIONS } from "@/content/excel-app-ia";
import { Section } from "./shared";

/** Sección 7: qué sucederá en cada sábado. */
export function ExcelAppSyllabus() {
  return (
    <Section id="temario" className="border-t border-hairline" width="max-w-5xl">
      <SectionHeader
        align="center"
        eyebrow="Temario · Qué sucederá en cada sábado"
        title={
          <>
            Seis sesiones. Un proyecto que{" "}
            <span className="font-serif-italic text-academy">toma forma</span>.
          </>
        }
      />

      <ol className="mt-14 relative space-y-5">
        {SESSIONS.map((s) => (
          <li
            key={s.n}
            className={`rounded-2xl border p-6 sm:p-8 ${
              s.phase === 1
                ? "border-academy/30 bg-academy/[0.04]"
                : "border-hairline bg-surface/30"
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center rounded-full bg-academy/15 px-3 py-1 font-mono text-xs text-academy">
                Sesión {s.n}
              </span>
              <span className="text-sm text-muted-foreground">{s.date}</span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/80">
                4 horas · {s.phase === 1 ? "Construcción guiada" : "Laboratorio de MVP"}
              </span>
            </div>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-foreground leading-snug">
              {s.title}
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {s.topics.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-academy/70" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground/90">
              <PackageCheck className="h-4 w-4 shrink-0 text-academy mt-0.5" />
              <span>
                <strong className="text-foreground">
                  {s.plural ? "Entregables:" : "Entregable:"}
                </strong>{" "}
                {s.deliverable}
              </span>
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 flex items-start gap-3 rounded-2xl border border-hairline bg-surface/40 p-5 text-sm text-muted-foreground leading-relaxed">
        <CalendarOff className="h-5 w-5 shrink-0 text-academy" />
        <span>
          <strong className="text-foreground">
            Durante las semanas de festividades no se programan clases el 26 de diciembre ni el 2 de
            enero.
          </strong>{" "}
          Puedes usar ese periodo para avanzar por tu cuenta, sin obligación de participar en
          reuniones en esas fechas.
        </span>
      </p>
    </Section>
  );
}
