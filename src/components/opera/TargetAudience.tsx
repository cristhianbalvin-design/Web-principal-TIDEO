import { SectionHeader } from "@/components/site/SectionHeader";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const models = [
  {
    n: "01",
    title: "Alquiler de maquinaria",
    subtitle: "Flota pesada y contratos",
    desc: "Gestión de contratos, tarifas dinámicas, disponibilidad de flota y mantenimientos preventivos.",
    color: "var(--color-amber)",
  },
  {
    n: "02",
    title: "Talleres de mantenimiento",
    subtitle: "Servicio técnico y overhaul",
    desc: "Órdenes de trabajo, asignación de mecánicos, repuestos y control de tiempos.",
    color: "var(--color-labs)",
  },
  {
    n: "03",
    title: "Metalmecánica",
    subtitle: "Manufactura y mecanizado",
    desc: "Control de producción, ruta de fabricación, costos de materiales y horas hombre.",
    color: "var(--color-academy)",
  },
  {
    n: "04",
    title: "Servicios con flota",
    subtitle: "Despacho y logística operativa",
    desc: "Despacho, rastreo, consumo de combustible, y gestión de choferes u operarios.",
    color: "var(--color-consulting)",
  },
  {
    n: "05",
    title: "Minería y Construcción",
    subtitle: "Operaciones en faena crítica",
    desc: "Control de activos pesados, HSE integrado, campamentos y valorizaciones.",
    color: "var(--color-destructive)",
  },
  {
    n: "06",
    title: "Contratistas de mantenimiento",
    subtitle: "Field service y SLAs",
    desc: "Gestión de SLAs, técnicos en campo (FSM), liquidación y facturación al cliente final.",
    color: "var(--color-studio)",
  },
];

export function TargetAudience() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="¿Te reconoces?"
          title={
            <>
              Modelos de negocio que{" "}
              <span className="font-serif-italic text-primary">transformamos</span>.
            </>
          }
          description="Si tu negocio depende de activos físicos y su disponibilidad, OPERA está diseñado para ti."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <CardContainer key={model.n} className="w-full">
              <CardBody className="group/card relative h-full w-full overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-8 transition hover:border-primary/20 hover:bg-surface/70 md:p-10">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover/card:opacity-40"
                  style={{ background: model.color }}
                />
                <div className="relative flex items-baseline gap-4">
                  <CardItem
                    as="span"
                    translateZ={48}
                    className="text-sm font-mono"
                    style={{ color: model.color }}
                  >
                    {model.n}
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={64}
                    className="text-2xl font-semibold tracking-tight md:text-3xl text-foreground"
                  >
                    {model.title}
                  </CardItem>
                </div>
                <CardItem
                  as="p"
                  translateZ={42}
                  className="relative mt-4 text-sm uppercase tracking-widest text-muted-foreground"
                >
                  {model.subtitle}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={34}
                  className="relative mt-6 text-base leading-relaxed text-foreground/85"
                >
                  {model.desc}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
