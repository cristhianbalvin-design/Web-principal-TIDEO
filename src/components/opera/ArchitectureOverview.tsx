import { MouseEvent } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HoverEffect } from "@/components/ui/card-hover-effect";

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--hover-x", `${x}%`);
  event.currentTarget.style.setProperty("--hover-y", `${y}%`);
}

const momDomains = [
  {
    n: "01",
    abv: "CMMS",
    name: "Mantenimiento",
    desc: "Órdenes de trabajo, preventivos y fallas.",
  },
  {
    n: "02",
    abv: "MES",
    name: "Producción",
    desc: "Control de planta y rutas de fabricación.",
  },
  {
    n: "03",
    abv: "WMS",
    name: "Almacenes",
    desc: "Inventario en tiempo real, repuestos y lotes.",
  },
  {
    n: "04",
    abv: "FSM",
    name: "Servicios de Campo",
    desc: "Despacho, técnicos en ruta y SLAs de servicio.",
  },
  {
    n: "05",
    abv: "HSE",
    name: "Seguridad y Salud",
    desc: "Incidentes, control de EPPs y permisos.",
  },
];

const erpDomains = [
  {
    n: "01",
    name: "Comercial & CRM",
    desc: "Pipeline, cotizaciones y clientes B2B.",
  },
  {
    n: "02",
    name: "Finanzas & Contabilidad",
    desc: "Facturación, tesorería y balances.",
  },
  {
    n: "03",
    name: "Compras & Abastecimiento",
    desc: "Requerimientos, órdenes y proveedores.",
  },
  {
    n: "04",
    name: "RRHH & Nómina",
    desc: "Asistencia, tareo y planillas.",
  },
  {
    n: "05",
    name: "Business Intelligence",
    desc: "KPIs, dashboards y rentabilidad.",
  },
];

export function ArchitectureOverview() {
  return (
    <section id="arquitectura" className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Arquitectura"
          title={
            <>
              El ecosistema <span className="font-serif-italic text-primary">ERP + MOM</span>.
            </>
          }
          description="Sin integraciones frágiles. Sin silos de datos. Un solo sistema nervioso central para tu empresa."
        />

        <div className="mt-16 space-y-12">
          {/* Fila 1: Capa Operativa (MOM) */}
          <div className="space-y-5">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
              Capa Operativa (MOM)
            </div>
            <HoverEffect className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {momDomains.map((dom) => (
                <article
                  key={dom.n}
                  onMouseMove={handleCardPointer}
                  className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-5 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-primary font-semibold">{dom.n}</span>
                    <span className="text-[10px] font-mono font-medium tracking-wider text-primary/80 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {dom.abv}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {dom.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {dom.desc}
                  </p>
                </article>
              ))}
            </HoverEffect>
          </div>

          {/* Fila 2: Capa Administrativa (ERP) */}
          <div className="space-y-5">
            <div className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide uppercase">
              Capa Administrativa (ERP)
            </div>
            <HoverEffect className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {erpDomains.map((dom) => (
                <article
                  key={dom.n}
                  onMouseMove={handleCardPointer}
                  className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-5 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-indigo-400 font-semibold">{dom.n}</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {dom.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {dom.desc}
                  </p>
                </article>
              ))}
            </HoverEffect>
          </div>
        </div>
      </div>
    </section>
  );
}
