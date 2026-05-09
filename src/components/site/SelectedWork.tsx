import { SectionHeader } from "./SectionHeader";

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

export function SelectedWork() {
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

        <div className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.n}
              className="group relative bg-background p-8 md:p-10 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-primary">{c.n}</span>
                <span>{c.tag}</span>
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
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
