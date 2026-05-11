import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
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
            <CardContainer key={u.n}>
              <CardBody className="group/card relative h-full overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-8 transition hover:border-primary/20 hover:bg-surface/70 md:p-10">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover/card:opacity-40"
                  style={{ background: u.color }}
                />
                <div className="relative flex items-baseline gap-4">
                  <CardItem
                    as="span"
                    translateZ={48}
                    className="text-sm font-mono"
                    style={{ color: u.color }}
                  >
                    {u.n}
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={64}
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    TIDEO {u.name}
                  </CardItem>
                </div>
                <CardItem
                  as="p"
                  translateZ={42}
                  className="relative mt-4 text-sm uppercase tracking-widest text-muted-foreground"
                >
                  {u.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={34}
                  className="relative mt-6 text-base leading-relaxed text-foreground/85"
                >
                  {u.desc}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
