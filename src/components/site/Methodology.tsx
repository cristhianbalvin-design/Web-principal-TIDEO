import { SectionHeader } from "./SectionHeader";

const steps = [
  { n: "01", t: "Entendemos", d: "Conversamos con los equipos, revisamos documentos y comprendemos la lógica real del negocio." },
  { n: "02", t: "Ordenamos", d: "Mapeamos procesos, roles, datos, reglas y excepciones críticas." },
  { n: "03", t: "Diseñamos", d: "Definimos flujos, pantallas, automatizaciones, reportes e integraciones." },
  { n: "04", t: "Construimos", d: "Desarrollamos MVPs funcionales con tecnología moderna e IA." },
  { n: "05", t: "Escalamos", d: "Ajustamos la solución, capacitamos usuarios y construimos el roadmap." },
];

export function Methodology() {
  return (
    <section className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Cómo trabajamos"
          title={
            <>
              De la operación al{" "}
              <span className="font-serif-italic text-primary">producto digital</span>.
            </>
          }
        />

        <ol className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="bg-background p-6 md:p-7">
              <div className="text-xs font-mono text-primary">{s.n}</div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.d}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted-foreground">
          Entender → Ordenar → Diseñar → Construir → Escalar
        </p>
      </div>
    </section>
  );
}
