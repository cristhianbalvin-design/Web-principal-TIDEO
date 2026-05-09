import { SectionHeader } from "./SectionHeader";

const rows = [
  { a: "ERP estándar", b: "Rapidez y estructura base", c: "Adaptación real a procesos únicos" },
  { a: "ERP corporativo", b: "Robustez y mejores prácticas", c: "Velocidad, flexibilidad y costos accesibles" },
  { a: "Software legacy", b: "Conocimiento de nicho", c: "Modernidad, integración e IA" },
  { a: "Agencia de desarrollo", b: "Código y velocidad", c: "Criterio operativo y visión de negocio" },
];

export function Differential() {
  return (
    <section className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Diferencial"
          title={
            <>
              Lo que nos diferencia no es solo la tecnología. Es{" "}
              <span className="font-serif-italic text-primary">cómo pensamos el negocio</span>.
            </>
          }
          description="Una agencia construye rápido. Un ERP estándar se activa en días. Un consultor entrega un diagnóstico. Pocas soluciones combinan procesos, ejecución, diseño, capacitación y acompañamiento de largo plazo."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-hairline">
          <div className="hidden md:grid grid-cols-3 bg-surface/60 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="p-5">Alternativa</div>
            <div className="p-5">Lo que ofrece</div>
            <div className="p-5">Lo que falta</div>
          </div>
          {rows.map((r) => (
            <div key={r.a} className="grid md:grid-cols-3 border-t border-hairline">
              <div className="p-5 md:p-6 text-foreground/90">{r.a}</div>
              <div className="p-5 md:p-6 text-muted-foreground">{r.b}</div>
              <div className="p-5 md:p-6 text-muted-foreground">{r.c}</div>
            </div>
          ))}
          <div className="grid md:grid-cols-3 border-t border-hairline bg-primary/5">
            <div className="p-5 md:p-6 font-semibold text-primary">TIDEO</div>
            <div className="p-5 md:p-6">Procesos + tecnología + adopción</div>
            <div className="p-5 md:p-6">Socio estratégico de evolución digital</div>
          </div>
        </div>

        <p className="mt-10 text-xl md:text-2xl font-medium max-w-3xl">
          No automatizamos problemas. Rediseñamos procesos para que la tecnología
          tenga <span className="font-serif-italic text-primary">impacto real</span>.
        </p>
      </div>
    </section>
  );
}
