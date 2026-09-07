import { MouseEvent } from "react";
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

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--hover-x", `${x}%`);
  event.currentTarget.style.setProperty("--hover-y", `${y}%`);
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

        <HoverEffect className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              onMouseMove={handleCardPointer}
              className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-6 md:p-7"
            >
              <div className="text-xs font-mono text-primary">{s.n}</div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.d}
              </p>
            </article>
          ))}
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
