import { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeader } from "@/components/site/SectionHeader";

const steps = [
  { n: "01", t: "Levantamiento", d: "Mapeamos tus procesos actuales y diseñamos el flujo ideal sobre OPERA." },
  { n: "02", t: "Configuración", d: "Parametrizamos el sistema a las reglas específicas de tu negocio." },
  { n: "03", t: "Migración", d: "Trasladamos de forma segura tu información histórica y catálogos." },
  { n: "04", t: "Capacitación", d: "Entrenamiento focalizado por rol: operarios, técnicos y gerencia." },
  { n: "05", t: "Puesta en marcha", d: "Acompañamiento presencial y remoto durante el arranque del sistema." },
  { n: "06", t: "Mejora continua", d: "Evaluación post-implementación y ajustes de optimización." }
];

const row1 = steps.slice(0, 3);
const row2 = steps.slice(3, 6);

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--hover-x", `${x}%`);
  event.currentTarget.style.setProperty("--hover-y", `${y}%`);
}

function renderStepCard(s: { n: string; t: string; d: string }) {
  return (
    <article
      key={s.n}
      onMouseMove={handleCardPointer}
      className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-6 md:p-7 flex flex-col h-full"
    >
      <div className="text-xs font-mono text-primary font-semibold">{s.n}</div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{s.t}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {s.d}
      </p>
    </article>
  );
}

function renderArrow(key: string) {
  return (
    <div key={key} className="flex items-center justify-center self-center py-2 lg:py-0">
      <ArrowRight className="w-8 h-8 text-muted-foreground/40 shrink-0 rotate-90 lg:rotate-0" />
    </div>
  );
}

export function ImplementationSteps() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Cómo lo hacemos"
          title={
            <>
              Un despliegue sin <span className="font-serif-italic text-primary">traumas operacionales</span>.
            </>
          }
        />

        <HoverEffect className="mt-16 space-y-6 lg:space-y-8">
          {/* Fila 1: Levantamiento → Configuración → Migración */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 lg:gap-4">
            {renderStepCard(row1[0])}
            {renderArrow("arrow-1-2")}
            {renderStepCard(row1[1])}
            {renderArrow("arrow-2-3")}
            {renderStepCard(row1[2])}
          </div>

          {/* Fila 2: Capacitación → Puesta en marcha → Mejora continua */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 lg:gap-4">
            {renderStepCard(row2[0])}
            {renderArrow("arrow-4-5")}
            {renderStepCard(row2[1])}
            {renderArrow("arrow-5-6")}
            {renderStepCard(row2[2])}
          </div>
        </HoverEffect>
        
        <div className="methodology-flow mt-14 flex flex-wrap items-center justify-center gap-2 md:gap-3 opacity-50">
           <p className="text-sm font-mono text-muted-foreground text-center">
             Un proyecto exitoso no termina el día del Go-Live, recién empieza.
           </p>
        </div>
      </div>
    </section>
  );
}
