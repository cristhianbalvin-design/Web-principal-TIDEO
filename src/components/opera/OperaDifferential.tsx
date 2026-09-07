import { SectionHeader } from "@/components/site/SectionHeader";

const rows = [
  {
    feature: "Base de datos",
    opera: "Unificada",
    niche: "Separada por software",
    traditional: "Unificada (solo lado ERP)",
    statusQuo: "Excel / Papel",
  },
  {
    feature: "Doble digitación",
    opera: "Cero",
    niche: "Constante",
    traditional: "Alta (sin módulo operativo nativo)",
    statusQuo: "Alta",
  },
  {
    feature: "Costo real",
    opera: "En tiempo real",
    niche: "Estimado",
    traditional: "Estimado",
    statusQuo: "A fin de mes",
  },
  {
    feature: "Trazabilidad de activos",
    opera: "Total",
    niche: "Parcial",
    traditional: "Parcial (contable, no operativa)",
    statusQuo: "Nula",
  },
  {
    feature: "Seguridad / HSE",
    opera: "Integrado",
    niche: "Software aparte",
    traditional: "Módulo aparte (costo adicional)",
    statusQuo: "Carpetas físicas",
  },
  {
    feature: "Diseñado para activos",
    opera: "Nativo",
    niche: "Adaptado",
    traditional: "Genérico (no especializado)",
    statusQuo: "Improvisado",
  },
  {
    feature: "Costo Total (TCO)",
    opera: "Eficiente",
    niche: "Alto (licencias multi)",
    traditional: "Muy alto (licencias + consultoría)",
    statusQuo: "Oculto (reprocesos)",
  },
];

export function OperaDifferential() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Comparativa"
          title={
            <>
              OPERA vs. <span className="font-serif-italic text-primary">Alternativas</span>
            </>
          }
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-hairline">
          <div className="overflow-x-auto">
            <div className="min-w-[860px] lg:min-w-full">
              <div className="grid grid-cols-5 bg-surface/60 text-xs uppercase tracking-widest text-muted-foreground border-b border-hairline">
                <div className="p-4 lg:p-5 font-semibold">Criterio</div>
                <div className="p-4 lg:p-5 text-primary font-bold bg-primary/5">OPERA (ERP+MOM)</div>
                <div className="p-4 lg:p-5 font-semibold">Software nicho (Solo MOM)</div>
                <div className="p-4 lg:p-5 font-semibold">ERP Tradicional (SAP/Odoo)</div>
                <div className="p-4 lg:p-5 font-semibold">Status Quo</div>
              </div>
              {rows.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 border-t border-hairline first:border-t-0 hover:bg-surface/40 transition-colors cursor-default"
                >
                  <div className="p-4 lg:p-5 text-foreground/90 font-medium text-sm">
                    {r.feature}
                  </div>
                  <div className="p-4 lg:p-5 text-primary font-semibold text-sm bg-primary/5">
                    {r.opera}
                  </div>
                  <div className="p-4 lg:p-5 text-muted-foreground text-sm leading-relaxed">
                    {r.niche}
                  </div>
                  <div className="p-4 lg:p-5 text-muted-foreground text-sm leading-relaxed">
                    {r.traditional}
                  </div>
                  <div className="p-4 lg:p-5 text-muted-foreground text-sm leading-relaxed">
                    {r.statusQuo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
