import { MouseEvent } from "react";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { n: "01", t: "Entendemos", d: "Conversamos con los equipos, revisamos documentos y comprendemos la lógica real del negocio." },
  { n: "02", t: "Ordenamos", d: "Mapeamos procesos, roles, datos, reglas y excepciones críticas." },
  { n: "03", t: "Diseñamos", d: "Definimos flujos, pantallas, automatizaciones, reportes e integraciones." },
  { n: "04", t: "Construimos", d: "Desarrollamos MVPs funcionales con tecnología moderna e IA." },
  { n: "05", t: "Escalamos", d: "Ajustamos la solución, capacitamos usuarios y construimos el roadmap." },
];

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--hover-x", `${x}%`);
  event.currentTarget.style.setProperty("--hover-y", `${y}%`);
}

export function Methodology() {
  return (
    <section className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Cómo trabajamos"
          title={
            <>
              De la operación al{" "}
              <span className="font-serif-italic text-primary">producto digital</span>.
            </>
          }
        />

        <HoverEffect className="mt-16 grid gap-3 md:grid-cols-5">
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

        <div className="methodology-flow mt-14 flex flex-wrap items-center gap-2 md:gap-3">
          {steps.flatMap((s, i) => {
            const pill = (
              <div key={s.n} className="methodology-flow-step flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary/30 bg-primary/[0.07]">
                <span className="font-mono text-[10px] font-bold text-primary leading-none">{s.n}</span>
                <span className="text-sm font-semibold tracking-tight">{s.t}</span>
              </div>
            );
            if (i < steps.length - 1) {
              return [pill, (
                <svg key={`arrow-${i}`} className="methodology-flow-arrow text-primary/70 flex-shrink-0" width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <path d="M1 8h16M13 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )];
            }
            return [pill];
          })}
        </div>
      </div>
    </section>
  );
}
