import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Piezas comunes de las maquetas de la landing.
 *
 * Son ejemplos ilustrativos dibujados en código (no capturas de clientes): el copy pide no
 * presentar pantallas ficticias como resultados reales, así que todo marco lleva el rótulo
 * ILLUSTRATIVE_LABEL de forma visible.
 */
export const ILLUSTRATIVE_LABEL = "Ejemplo ilustrativo";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Dibuja `children` a un ancho de diseño fijo y lo escala para que quepa en su contenedor.
 * Así la maqueta conserva sus proporciones en móvil en vez de reacomodarse.
 */
export function ScaleToFit({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left transition-opacity duration-500"
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Ventana de navegador con barra de dirección y rótulo de ejemplo ilustrativo. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl shadow-black/70 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-background/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        </div>
        <div className="flex-1 rounded-md border border-hairline bg-background/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {url}
        </div>
        <span className="rounded-full border border-academy/40 bg-academy/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-academy">
          {ILLUSTRATIVE_LABEL}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

/** Esqueleto de app: barra lateral con navegación + contenido. */
export function AppShell({
  appName,
  nav,
  user,
  compact = false,
  children,
}: {
  appName: string;
  nav: NavItem[];
  user: { initials: string; name: string; role: string };
  /** Barra lateral más angosta, para maquetas de menor tamaño. */
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full bg-background text-foreground">
      <aside
        className={`flex shrink-0 flex-col border-r border-hairline bg-surface/60 p-4 ${compact ? "w-[150px]" : "w-[190px]"}`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-academy text-[11px] font-bold text-background">
            {appName.charAt(0)}
          </span>
          <span className="text-sm font-semibold">{appName}</span>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] ${
                active ? "bg-academy/15 font-medium text-academy" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-hairline bg-background/60 p-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
            {user.initials}
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-medium">{user.name}</p>
            <p className="text-[10px] text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-5">{children}</main>
    </div>
  );
}

export type Tone = "orange" | "cyan" | "amber" | "muted" | "red";

const toneClass: Record<Tone, string> = {
  orange: "bg-academy/15 text-academy",
  cyan: "bg-primary/15 text-primary",
  amber: "bg-amber/15 text-amber",
  muted: "bg-foreground/10 text-muted-foreground",
  red: "bg-red-400/15 text-red-300",
};

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

export function Kpi({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        accent ? "border-academy/40 bg-academy/[0.07]" : "border-hairline bg-surface/50"
      }`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
      {hint && <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Encabezado de pantalla con título y botón de acción principal. */
export function ScreenHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <span className="rounded-lg bg-academy px-3 py-1.5 text-[11px] font-semibold text-background">
        {action}
      </span>
    </div>
  );
}
