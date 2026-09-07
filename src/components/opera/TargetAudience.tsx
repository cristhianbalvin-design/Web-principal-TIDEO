import { SectionHeader } from "@/components/site/SectionHeader";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const models = [
  { title: "Alquiler de maquinaria", desc: "Gestión de contratos, tarifas dinámicas, disponibilidad de flota y mantenimientos preventivos." },
  { title: "Talleres de mantenimiento", desc: "Órdenes de trabajo, asignación de mecánicos, repuestos y control de tiempos." },
  { title: "Metalmecánica", desc: "Control de producción, ruta de fabricación, costos de materiales y horas hombre." },
  { title: "Servicios con flota", desc: "Despacho, rastreo, consumo de combustible, y gestión de choferes u operarios." },
  { title: "Minería y Construcción", desc: "Control de activos pesados, HSE integrado, campamentos y valorizaciones." },
  { title: "Contratistas de mantenimiento", desc: "Gestión de SLAs, técnicos en campo (FSM), liquidación y facturación al cliente final." }
];

export function TargetAudience() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="¿Te reconoces?"
          title={
            <>
              Modelos de negocio que <span className="font-serif-italic text-primary">transformamos</span>.
            </>
          }
          description="Si tu negocio depende de activos físicos y su disponibilidad, OPERA está diseñado para ti."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <CardContainer key={i} className="w-full">
              <CardBody className="bg-background relative group/card border-hairline border w-full h-auto rounded-xl p-8 hover:shadow-glow hover:shadow-primary/10 transition-shadow">
                <CardItem translateZ="20" className="text-xl font-bold text-foreground">
                  {model.title}
                </CardItem>
                <CardItem as="p" translateZ="40" className="text-sm text-muted-foreground mt-4 leading-relaxed">
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
