import { Award, BadgeCheck, CheckCircle2, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import instructorPhoto from "@/assets/instructor-cristhian-balvin.jpg";
import { Section } from "./shared";

const highlights = [
  "Enfoque 100% aplicado a negocio",
  "Casos reales de empresas",
  "Acompañamiento en vivo",
  "Metodología TIDEO",
];

/** Sección 15: quién te acompaña (docente del curso). */
export function ExcelAppInstructor() {
  return (
    <Section id="docente" className="border-t border-hairline">
      <SectionHeader
        align="center"
        eyebrow="Quién te acompaña"
        title={
          <>
            Aprende con experiencia de implementación, no solo con{" "}
            <span className="font-serif-italic text-academy">ejemplos académicos</span>
          </>
        }
      />

      <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-academy/30 bg-surface/30 p-6 sm:p-10 relative overflow-hidden shadow-2xl shadow-black/50">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-academy/15 blur-3xl"
        />
        <div className="relative grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden border border-academy/40 bg-background shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]">
              <img
                src={instructorPhoto}
                alt="Cristhian Balvin, docente del curso De Excel a tu Propia App con IA"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"
              />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-background/80 backdrop-blur-md text-foreground border border-academy/30">
                  <Sparkles className="w-3 h-3 text-academy" />
                  Cristhian Balvin
                </span>
              </div>
            </div>
            <span className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-surface border border-hairline text-muted-foreground">
              <Award className="w-3 h-3 text-academy" />
              Docente &amp; Consultor Principal
            </span>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-academy/10 text-academy border border-academy/30">
              AI Business Builder · Docente
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Cristhian Balvin
            </h3>
            <p className="text-sm font-mono text-academy font-medium">
              Fundador de TIDEO Tech &amp; Strategy · Creador de OPERA
            </p>
            <div className="rounded-xl border border-hairline/80 bg-background/70 p-5 text-sm leading-relaxed space-y-3">
              <p className="text-foreground/90">
                Consultor y formador en procesos empresariales, Business Intelligence y arquitectura
                de soluciones digitales. Con más de 10 años de experiencia transformando operaciones
                complejas en herramientas de gestión, lidera en TIDEO el desarrollo de software
                empresarial con IA, entre ellos OPERA, el ERP de la consultora.
              </p>
              <p className="text-muted-foreground">
                La metodología del curso recoge esos proyectos reales: cómo formular requerimientos,
                estructurar la información, probar funcionalidades y decidir qué desarrollar
                primero.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 pt-1 text-xs text-foreground/80">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-academy shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <p className="flex items-start gap-2.5 rounded-xl border border-academy/30 bg-academy/[0.06] px-4 py-3 text-sm text-foreground/90">
              <BadgeCheck className="h-4 w-4 shrink-0 text-academy mt-0.5" />
              Al culminar recibes un certificado de TIDEO Tech &amp; Strategy avalado por Cristhian
              Balvin.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-lg sm:text-xl font-medium text-foreground max-w-3xl mx-auto">
        En TIDEO creemos en una idea clara:{" "}
        <span className="font-serif-italic text-academy">
          primero entendemos el proceso; después elegimos y construimos la tecnología.
        </span>
      </p>
    </Section>
  );
}
