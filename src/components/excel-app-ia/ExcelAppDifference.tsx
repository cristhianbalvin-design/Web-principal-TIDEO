import { SectionHeader } from "@/components/site/SectionHeader";
import { DIFFERENCES, SKILLS } from "@/content/excel-app-ia";
import { Section } from "./shared";

/** Secciones 5 (por qué TIDEO) y 10 (no solo prompts). */
export function ExcelAppDifference() {
  return (
    <>
      <Section id="diferencia" className="border-t border-hairline">
        <SectionHeader
          eyebrow="¿Por qué TIDEO?"
          title={
            <>
              No somos una biblioteca de videos. Somos consultores que te{" "}
              <span className="font-serif-italic text-academy">acompañan a construir</span>.
            </>
          }
          description="TIDEO Tech & Strategy trabaja en consultoría de procesos, desarrollo de software empresarial, automatización y soluciones con inteligencia artificial. Llevamos al aula una forma de trabajo orientada a resolver problemas, no solo a explicar botones o repetir prompts."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENCES.map((d, i) => (
            <li key={d.title} className="bg-background p-6 sm:p-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-academy/40 bg-academy/10 font-mono text-sm text-academy">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground leading-snug">{d.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center text-base sm:text-lg text-foreground/90 max-w-3xl mx-auto">
          El diferencial de TIDEO es claro:{" "}
          <strong className="text-foreground">
            menos teoría desconectada y más construcción acompañada, con criterio empresarial.
          </strong>
        </p>
      </Section>

      <Section id="metodologia" className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeader
              eyebrow="TIDEO no te enseña solo prompts"
              title={
                <>
                  Aprender a pedir código es apenas{" "}
                  <span className="font-serif-italic text-academy">el comienzo</span>.
                </>
              }
              description="En este programa desarrollarás una manera de trabajar que puedes aplicar a otros proyectos."
            />
          </div>
          <ol className="lg:col-span-3 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {SKILLS.map((s, i) => (
              <li key={s.title} className="flex gap-5 bg-background p-5 sm:p-6">
                <span className="font-mono text-sm text-academy pt-0.5">0{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
