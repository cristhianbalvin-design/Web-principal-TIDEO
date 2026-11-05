import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AUDIENCE_NO, AUDIENCE_YES } from "@/content/excel-app-ia";
import { Section } from "./shared";

/** Sección 4: para quién es (y para quién no). */
export function ExcelAppAudience() {
  return (
    <Section id="para-quien" className="border-t border-hairline">
      <SectionHeader
        eyebrow="¿Para quién es?"
        title={
          <>
            Diseñado para profesionales que conocen el negocio y quieren{" "}
            <span className="font-serif-italic text-academy">construir soluciones</span>
          </>
        }
        description="Pensado para quienes identifican problemas y oportunidades de mejora en su trabajo, pero no necesariamente tienen experiencia desarrollando software."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-academy/30 bg-surface/40 p-6 sm:p-8">
          <h3 className="text-sm font-mono uppercase tracking-widest text-academy">
            Es para ti si…
          </h3>
          <ul className="mt-5 space-y-4">
            {AUDIENCE_YES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-academy/15 text-academy">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl border border-hairline bg-surface/40 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              No necesitas ser programador profesional.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Sí debes manejar una computadora con soltura, tener disposición para experimentar con
              herramientas digitales y dedicar tiempo a desarrollar tu proyecto durante y entre las
              sesiones.
            </p>
          </div>
          <div className="rounded-2xl border border-hairline bg-background/60 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <X className="h-4 w-4" /> ¿Para quién no es?
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{AUDIENCE_NO}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
