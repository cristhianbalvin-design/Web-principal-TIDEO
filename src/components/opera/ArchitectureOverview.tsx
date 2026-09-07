import { SectionHeader } from "@/components/site/SectionHeader";

const momDomains = [
  { abv: "CMMS", name: "Mantenimiento", desc: "Órdenes, preventivos, fallas." },
  { abv: "MES", name: "Producción", desc: "Control de planta y rutas." },
  { abv: "WMS", name: "Almacenes", desc: "Inventario, ubicaciones, lotes." },
  { abv: "FSM", name: "Servicios de Campo", desc: "Despacho, rutas, SLAs." },
  { abv: "HSE", name: "Seguridad y Salud", desc: "Incidentes, EPP, permisos." }
];

const erpDomains = [
  "Comercial & CRM",
  "Finanzas & Contabilidad",
  "Compras & Abastecimiento",
  "RRHH & Nómina",
  "Business Intelligence"
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

        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
              Capa Operativa (MOM)
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {momDomains.map((dom, i) => (
                <div key={i} className="p-4 rounded-xl border border-hairline bg-surface/30 hover:bg-surface/70 hover:border-primary/20 transition-colors cursor-default">
                  <div className="font-mono text-xs font-bold text-primary mb-1">{dom.abv}</div>
                  <div className="font-semibold text-foreground mb-1">{dom.name}</div>
                  <div className="text-xs text-muted-foreground">{dom.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="inline-flex px-3 py-1 rounded-full bg-muted border border-hairline text-muted-foreground text-xs font-bold tracking-wide uppercase">
              Capa Administrativa (ERP)
            </div>
            <div className="flex flex-col gap-3">
              {erpDomains.map((dom, i) => (
                <div key={i} className="px-5 py-4 rounded-xl border border-hairline bg-background flex items-center justify-between hover:bg-surface/40 hover:border-primary/20 transition-colors cursor-default group">
                   <span className="font-medium text-foreground/90 group-hover:text-primary transition-colors">{dom}</span>
                   <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
