import { SectionHeader } from "@/components/site/SectionHeader";

const rows = [
  { feature: "Base de datos", erp: "Unificada", mom: "Separada por software", old: "Excel / Papel" },
  { feature: "Doble digitación", erp: "Cero", mom: "Constante", old: "Alta" },
  { feature: "Costo real", erp: "En tiempo real", mom: "Estimado", old: "A fin de mes" },
  { feature: "Trazabilidad de activos", erp: "Total", mom: "Parcial", old: "Nula" },
  { feature: "Seguridad / HSE", erp: "Integrado", mom: "Software aparte", old: "Carpetas físicas" },
  { feature: "Diseñado para activos", erp: "Nativo", mom: "Adaptado", old: "Improvisado" },
  { feature: "Costo Total (TCO)", erp: "Eficiente", mom: "Alto (licencias multi)", old: "Oculto (reprocesos)" }
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
          <div className="hidden md:grid grid-cols-4 bg-surface/60 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="p-5">Criterio</div>
            <div className="p-5 text-primary font-bold">OPERA (ERP+MOM)</div>
            <div className="p-5">Software nicho (Solo MOM)</div>
            <div className="p-5">Status Quo</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid md:grid-cols-4 border-t border-hairline">
              <div className="p-5 md:p-6 text-foreground/90 font-medium md:font-normal bg-surface/20 md:bg-transparent">{r.feature}</div>
              <div className="p-5 md:p-6 text-primary font-semibold bg-primary/5">{r.erp}</div>
              <div className="p-5 md:p-6 text-muted-foreground">{r.mom}</div>
              <div className="p-5 md:p-6 text-muted-foreground">{r.old}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
