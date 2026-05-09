import { SectionHeader } from "./SectionHeader";

const units = [
  {
    n: "01",
    name: "Consulting",
    title: "Estrategia y procesos",
    desc: "Diagnosticamos la operación, identificamos cuellos de botella, diseñamos flujos y priorizamos oportunidades de transformación digital.",
    color: "var(--color-consulting)",
  },
  {
    n: "02",
    name: "Labs",
    title: "Desarrollo ágil y soluciones digitales",
    desc: "Construimos MVPs, ERPs personalizados, CRMs, automatizaciones, apps internas e integraciones con tecnología moderna e IA.",
    color: "var(--color-labs)",
  },
  {
    n: "03",
    name: "Academy",
    title: "Capacitación y adopción",
    desc: "Entrenamos equipos en IA, automatización, Power BI, herramientas no-code y nuevas formas de trabajo digital.",
    color: "var(--color-academy)",
  },
  {
    n: "04",
    name: "Studio",
    title: "Diseño, experiencia y comunicación",
    desc: "Diseñamos interfaces, presentaciones, identidad visual, contenido digital y experiencias claras y usables.",
    color: "var(--color-studio)",
  },
];

export function Ecosystem() {
  return (
    <section id="ecosistema" className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Ecosistema TIDEO"
          title={
            <>
              Cuatro capacidades. Una sola dirección:{" "}
              <span className="font-serif-italic text-primary">resultados</span>.
            </>
          }
          description="Cada unidad de TIDEO cumple un rol dentro del mismo ciclo: entender, diseñar, construir y lograr adopción."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {units.map((u) => (
            <div
              key={u.n}
              className="group relative rounded-2xl border border-hairline bg-surface/40 p-8 md:p-10 overflow-hidden transition hover:bg-surface/70"
            >
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ background: u.color }}
              />
              <div className="relative flex items-baseline gap-4">
                <span
                  className="text-sm font-mono"
                  style={{ color: u.color }}
                >
                  {u.n}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  TIDEO {u.name}
                </h3>
              </div>
              <p className="relative mt-4 text-sm uppercase tracking-widest text-muted-foreground">
                {u.title}
              </p>
              <p className="relative mt-6 text-base leading-relaxed text-foreground/85">
                {u.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
