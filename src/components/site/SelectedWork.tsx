import { useState, useRef } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { SectionHeader } from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { operaUrl, powerbiUrl } from "@/lib/site";
import type { CSSProperties } from "react";

// Coloca el archivo de video en /public/demo-tideo.mp4
// O reemplaza esta ruta por tu embed de YouTube si lo prefieres
const VIDEO_SRC = "/demo-tideo.mp4";

/** Color-mix de acento reutilizado por los botones de la sección. */
function accentStyle(color: string, hovered: boolean): CSSProperties {
  return {
    border: `1px solid color-mix(in oklab, ${color} ${hovered ? "90%" : "45%"}, transparent)`,
    background: `color-mix(in oklab, ${color} ${hovered ? "22%" : "10%"}, transparent)`,
    color: hovered ? color : undefined,
    boxShadow: hovered ? `0 0 16px color-mix(in oklab, ${color} 20%, transparent)` : "none",
    transform: hovered ? "translateY(-1px)" : "none",
  };
}

const buttonClass =
  "inline-flex items-center rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200";

/** Botón de acento: enlace (href) o acción (onClick). */
function AccentButton({
  color,
  href,
  onClick,
  children,
  className = "",
}: {
  color: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const common = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: accentStyle(color, hovered),
    className: `${buttonClass} ${className}`,
  };
  const arrow = (
    <span
      aria-hidden
      className="ml-1.5 inline-block transition-transform duration-200"
      style={{ transform: hovered ? "translateX(3px)" : "none", opacity: hovered ? 1 : 0.7 }}
    >
      →
    </span>
  );
  if (href) {
    return (
      <a href={href} {...common}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...common}>
      {children}
      {arrow}
    </button>
  );
}

const operaSectors = [
  "Talleres de mantenimiento",
  "Alquiler de maquinaria",
  "Metalmecánica",
  "Flotas de servicio",
  "Minería y construcción",
];

type Service = {
  n: string;
  tag: string;
  title: string;
  rubro: string;
  enfoque: string;
  impact: string;
  color: string;
  /** Valor de ?servicio= en /contacto. */
  slug: string;
  cta: string;
  extra?: { label: string; href: string };
};

const services: Service[] = [
  {
    n: "02",
    tag: "Servicio · Sistemas",
    title: "Sistemas a medida sobre OPERA",
    rubro: "Empresas con activos u operaciones que necesitan más que la base",
    enfoque:
      "Partimos de OPERA y lo adaptamos: módulos nuevos, integraciones y reglas de tu operación. Por ejemplo, ampliar almacén, flota o producción, o sumar transporte (TMS).",
    impact: "Un sistema que ya funciona, adaptado a cómo genera valor tu negocio.",
    color: "var(--color-labs)",
    slug: "sistemas-a-medida",
    cta: "Cuéntanos tu caso",
  },
  {
    n: "03",
    tag: "Servicio · Comercial",
    title: "Gestión comercial y clientes",
    rubro: "Empresas B2B con venta consultiva y postventa",
    enfoque:
      "CRM, cotizaciones, seguimiento de oportunidades, portal de clientes y postventa conectados a tu operación.",
    impact: "Menos oportunidades perdidas y trazabilidad de la consulta a la postventa.",
    color: "var(--color-consulting)",
    slug: "comercial",
    cta: "Cuéntanos tu caso",
  },
  {
    n: "04",
    tag: "Servicio · Automatización",
    title: "Automatización e integraciones",
    rubro: "Áreas administrativas, finanzas, RRHH y operaciones",
    enfoque:
      "Aprobaciones, notificaciones, registros, control documental, apps de campo y conexión entre los sistemas que ya usas.",
    impact: "Menos tareas manuales, menos errores y mayor velocidad.",
    color: "var(--color-academy)",
    slug: "automatizacion",
    cta: "Cuéntanos tu caso",
  },
  {
    n: "05",
    tag: "Servicio · Datos & BI",
    title: "Datos y BI",
    rubro: "Gerencias que necesitan visibilidad",
    enfoque: "Power BI, KPIs, modelos de datos y reportes ejecutivos.",
    impact: "Decisiones con información centralizada y confiable.",
    color: "var(--color-labs)",
    slug: "datos-bi",
    cta: "Cuéntanos tu caso",
    extra: { label: "Ver programa Power BI + IA", href: powerbiUrl("home_card_powerbi") },
  },
  {
    n: "06",
    tag: "Servicio · IA aplicada",
    title: "IA aplicada",
    rubro: "Empresas que buscan aumentar productividad",
    enfoque:
      "Agentes sobre tus sistemas u OPERA: atención, clasificación, resúmenes y alertas con IA.",
    impact: "Procesos más rápidos y equipos mejor asistidos.",
    color: "var(--color-studio)",
    slug: "ia",
    cta: "Cuéntanos tu caso",
  },
  {
    n: "07",
    tag: "Servicio · MVP",
    title: "MVP en semanas",
    rubro: "Emprendedores, startups y áreas que quieren validar antes de invertir",
    enfoque:
      "Definimos el alcance, construimos la versión mínima que se puede probar con usuarios reales y medimos antes de escalar.",
    impact: "Una herramienta funcionando en semanas, con datos reales para decidir el siguiente paso.",
    color: "var(--color-amber)",
    slug: "mvp",
    cta: "Cuéntanos tu idea",
  },
];

const OPERA_COLOR = "var(--color-consulting)";

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
              Un producto listo. Y sistemas{" "}
              <span className="font-serif-italic text-primary">a medida</span> cuando no alcanza.
            </>
          }
          description="OPERA resuelve la operación de talleres, flotas y empresas con activos. Si tu caso necesita más, partimos de OPERA y lo adaptamos; y si apenas estás validando una idea, empezamos por un MVP."
        />

        {/* Producto: OPERA */}
        <article
          id="opera"
          className="mt-16 relative overflow-hidden rounded-2xl border bg-background p-8 md:p-12"
          style={{ borderColor: `color-mix(in oklab, ${OPERA_COLOR} 40%, transparent)` }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ background: OPERA_COLOR }}
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span style={{ color: OPERA_COLOR }}>01</span>
                <span
                  className="rounded-full border px-3 py-1 font-semibold"
                  style={{
                    color: OPERA_COLOR,
                    borderColor: `color-mix(in oklab, ${OPERA_COLOR} 50%, transparent)`,
                    background: `color-mix(in oklab, ${OPERA_COLOR} 12%, transparent)`,
                  }}
                >
                  Producto
                </span>
              </div>
              <h3 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                OPERA <span className="text-muted-foreground font-normal">· ERP Operativo</span>
              </h3>
              <p className="mt-4 text-base md:text-lg text-foreground/85 max-w-2xl leading-relaxed">
                ERP + MOM para empresas que dependen de activos físicos: órdenes de trabajo,
                repuestos, mantenimiento y costos en tiempo real, en una sola base de datos.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {operaSectors.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-hairline bg-surface/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <AccentButton color={OPERA_COLOR} href={operaUrl("home_card_opera")}>
                Conocer OPERA
              </AccentButton>
              <a
                href={operaUrl("home_card_opera_metalmecanica", "metalmecanica")}
                className="px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Ver ERP para metalmecánica →
              </a>
              <button
                type="button"
                onClick={handleOpenVideo}
                className="flex items-center gap-2 px-1 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
                  <circle cx="8.5" cy="8.5" r="7.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 6.2l5 2.3-5 2.3V6.2z" fill="currentColor" />
                </svg>
                Ver video
              </button>
            </div>
          </div>
        </article>

        {/* Servicios */}
        <FocusCards className="mt-6 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {({ focusedIndex, setFocusedIndex }) =>
            services.map((c, index) => (
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
                style={{ "--focus-card-color": c.color } as CSSProperties}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="focus-product-index">{c.n}</span>
                  <span className="focus-product-tag">{c.tag}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.rubro}</p>
                <p className="mt-6 text-sm leading-relaxed text-foreground/80">{c.enfoque}</p>
                <div className="mt-8 pt-6 border-t border-hairline">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Resultado esperado
                  </div>
                  <p className="mt-2 text-sm">{c.impact}</p>
                  <div className="mt-6 flex flex-col items-start gap-2">
                    <AccentButton color={c.color} href={`/contacto?servicio=${c.slug}`}>
                      {c.cta}
                    </AccentButton>
                    {c.extra && (
                      <a
                        href={c.extra.href}
                        className="px-1 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {c.extra.label} →
                      </a>
                    )}
                  </div>
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

        {/* Diagnóstico: entrada común a las tres rutas */}
        <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-hairline bg-surface/30 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              ¿No sabes si te conviene OPERA, algo a medida o un MVP?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Responde el diagnóstico de madurez digital y te decimos por dónde empezar.
            </p>
          </div>
          <AccentButton
            color="var(--color-labs)"
            onClick={onDiagnostic}
            className="shrink-0 justify-center"
          >
            Realizar diagnóstico de la empresa
          </AccentButton>
        </div>
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
