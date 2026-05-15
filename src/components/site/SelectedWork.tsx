import { useState, useRef } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { SectionHeader } from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CSSProperties } from "react";

// Coloca el archivo de video en /public/demo-tideo.mp4
// O reemplaza esta ruta por tu embed de YouTube si lo prefieres
const VIDEO_SRC = "/demo-tideo.mp4";

function DiagButton({ color, onClick }: { color: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full rounded-xl px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider transition-all duration-200"
      style={{
        border: `1px solid color-mix(in oklab, ${color} ${hovered ? "90%" : "45%"}, transparent)`,
        background: `color-mix(in oklab, ${color} ${hovered ? "22%" : "10%"}, transparent)`,
        color: hovered ? color : undefined,
        boxShadow: hovered ? `0 0 16px color-mix(in oklab, ${color} 20%, transparent)` : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      Realizar diagnóstico de la empresa
      <span
        className="ml-1.5 inline-block transition-transform duration-200"
        style={{ transform: hovered ? "translateX(3px)" : "none", opacity: hovered ? 1 : 0.7 }}
      >
        →
      </span>
    </button>
  );
}

const cards = [
  {
    n: "01",
    tag: "ERP",
    title: "ERP Operativo a medida",
    rubro: "Empresas de servicios, operaciones o mantenimiento",
    enfoque: "Procesos, costos, órdenes de trabajo, compras, almacén y reportes.",
    impact: "Control integral de la operación desde una sola plataforma.",
  },
  {
    n: "02",
    tag: "CRM",
    title: "CRM Comercial Inteligente",
    rubro: "Empresas B2B con venta consultiva",
    enfoque: "Pipeline, tareas, interacciones y reportes comerciales.",
    impact: "Menos oportunidades perdidas y mayor trazabilidad comercial.",
  },
  {
    n: "03",
    tag: "Automatización",
    title: "Automatización Administrativa",
    rubro: "Áreas administrativas, finanzas, RRHH y operaciones",
    enfoque: "Aprobaciones, notificaciones, registros y control documental.",
    impact: "Menos tareas manuales, menos errores y mayor velocidad.",
  },
  {
    n: "04",
    tag: "Datos & BI",
    title: "Dashboards Gerenciales",
    rubro: "Gerencias que necesitan visibilidad",
    enfoque: "Power BI, KPIs, modelos de datos y reportes ejecutivos.",
    impact: "Decisiones con información centralizada y confiable.",
  },
  {
    n: "05",
    tag: "Apps internas",
    title: "Portales y Apps Internas",
    rubro: "Equipos de campo, ventas, operaciones o soporte",
    enfoque: "Captura de datos, formularios y trazabilidad en tiempo real.",
    impact: "Digitalización del trabajo operativo en tiempo real.",
  },
  {
    n: "06",
    tag: "IA aplicada",
    title: "Agentes e IA aplicada",
    rubro: "Empresas que buscan aumentar productividad",
    enfoque: "Atención, clasificación, resumen y generación con IA.",
    impact: "Procesos más rápidos y equipos mejor asistidos.",
  },
];

const cardColors: Record<string, string> = {
  "01": "var(--color-consulting)",
  "02": "var(--color-labs)",
  "03": "var(--color-academy)",
  "04": "var(--color-labs)",
  "05": "var(--color-consulting)",
  "06": "var(--color-studio)",
};

export function SelectedWork({ onDiagnostic }: { onDiagnostic?: () => void }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleOpenVideo() {
    setVideoOpen(true);
  }

  function handleCloseVideo(open: boolean) {
    if (!open) {
      videoRef.current?.pause();
    }
    setVideoOpen(open);
  }

  return (
    <section id="trabajo" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Selected Work"
          title={
            <>
              Diseñamos sistemas para{" "}
              <span className="font-serif-italic text-primary">operaciones reales</span>.
            </>
          }
          description="Cada solución nace de un proceso de negocio concreto: ventas, operaciones, logística, mantenimiento, finanzas, capacitación o gestión comercial."
        />

        <FocusCards className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {({ focusedIndex, setFocusedIndex }) =>
            cards.map((c, index) => (
              <article
                key={c.n}
                onMouseEnter={() => setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                tabIndex={0}
                className={`focus-product-card group relative bg-background p-8 outline-none transition-all duration-300 hover:bg-surface/60 focus-visible:bg-surface/60 md:p-10 ${
                  focusedIndex !== null && focusedIndex !== index
                    ? "scale-[0.98] opacity-45 blur-[1.5px]"
                    : "scale-100 opacity-100 blur-0"
                }`}
                style={{ "--focus-card-color": cardColors[c.n] } as CSSProperties}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="focus-product-index">{c.n}</span>
                  <span className="focus-product-tag">{c.tag}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.rubro}</p>
                <p className="mt-6 text-sm leading-relaxed text-foreground/80">
                  {c.enfoque}
                </p>
                <div className="mt-8 pt-6 border-t border-hairline">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Resultado esperado
                  </div>
                  <p className="mt-2 text-sm">{c.impact}</p>

                  {c.n === "01" && (
                    <div className="mt-6 flex flex-col gap-2">
                      <DiagButton color={cardColors[c.n]} onClick={onDiagnostic} />
                      <button
                        onClick={handleOpenVideo}
                        className="flex items-center gap-2 px-1 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <circle cx="8.5" cy="8.5" r="7.5" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M7 6.2l5 2.3-5 2.3V6.2z" fill="currentColor" />
                        </svg>
                        Ver video
                      </button>
                    </div>
                  )}
                </div>
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--focus-card-color), transparent)",
                  }}
                />
              </article>
            ))
          }
        </FocusCards>
      </div>

      <Dialog open={videoOpen} onOpenChange={handleCloseVideo}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-hairline bg-black">
          <DialogTitle className="sr-only">Demo Tideo</DialogTitle>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            controls
            autoPlay
            className="w-full aspect-video"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
