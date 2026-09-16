import { SectionHeader } from "@/components/site/SectionHeader";
import { Award, CheckCircle2, BookOpen, Sparkles } from "lucide-react";
import instructorPhoto from "@/assets/instructor-cristhian-balvin.jpg";

export function PowerBiInstructor() {
  return (
    <section className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Facilitador del curso"
          title={
            <>
              Aprende con{" "}
              <span className="font-serif-italic text-academy">experiencia práctica</span> en
              proyectos reales.
            </>
          }
          description="Formación impartida por profesionales que implementan activamente soluciones de Business Intelligence, integración de datos e Inteligencia Artificial en el sector corporativo."
        />

        <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-academy/30 bg-surface/30 p-6 sm:p-10 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-black/50">
          {/* Subtle background ambient glow matching instructor rim light */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-academy/15 blur-3xl"
          />

          <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Instructor Photo Container */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden border border-academy/40 bg-[#060B14] shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] group">
                <img
                  src={instructorPhoto}
                  alt="Cristhian Balvin - Instructor de Power BI + IA Agéntica"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient vignette at bottom */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-transparent to-transparent opacity-60"
                />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-background/80 backdrop-blur-md text-foreground border border-academy/30 shadow-lg">
                    <Sparkles className="w-3 h-3 text-academy" />
                    Cristhian Balvin
                  </span>
                </div>
              </div>
              <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-surface border border-hairline text-muted-foreground">
                <Award className="w-3 h-3 text-academy" />
                Instructor & Consultor Principal
              </div>
            </div>

            {/* Bio Information */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-academy/10 text-academy border border-academy/30">
                TIDEO Academy · Instructor
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Cristhian Balvin
              </h3>

              <p className="text-sm font-mono text-academy font-medium">
                Fundador de TIDEO · Especialista en Business Intelligence & IA
              </p>

              <div className="rounded-xl border border-hairline/80 bg-background/70 p-5 text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground/90 leading-relaxed">
                  Consultor y formador en analítica de datos, Business Intelligence y arquitectura
                  de soluciones digitales. Con más de 10 años de experiencia transformando
                  operaciones complejas en dashboards interactivos y modelos de decisión, lidera la
                  integración de agentes y modelos de IA en flujos reales de trabajo en TIDEO.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-academy shrink-0" />
                  <span>Enfoque 100% aplicado a negocio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-academy shrink-0" />
                  <span>Casos reales de empresas</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-academy shrink-0" />
                  <span>Acompañamiento en vivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-academy shrink-0" />
                  <span>Metodología probada TIDEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
