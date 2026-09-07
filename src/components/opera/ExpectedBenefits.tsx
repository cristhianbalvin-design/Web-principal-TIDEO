import { SectionHeader } from "@/components/site/SectionHeader";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Wrench, CircleDollarSign, TimerOff, ShieldCheck, FileCheck, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Mayor disponibilidad mecánica",
    desc: "Predictibilidad de fallas y mantenimientos a tiempo para que la flota no pare.",
    color: "var(--color-amber)",
  },
  {
    icon: <CircleDollarSign className="w-6 h-6" />,
    title: "Costos precisos",
    desc: "Sabrás exactamente cuánto te cuesta operar cada máquina u hora hombre.",
    color: "var(--color-consulting)",
  },
  {
    icon: <TimerOff className="w-6 h-6" />,
    title: "Menos tiempos muertos",
    desc: "Logística integrada: el repuesto correcto en el momento exacto.",
    color: "var(--color-academy)",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "HSE auditable",
    desc: "Cumplimiento normativo documentado y accesible a un clic.",
    color: "var(--color-destructive)",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Cierres administrativos rápidos",
    desc: "La información financiera fluye desde la operación sin reprocesos.",
    color: "var(--color-labs)",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Decisiones con datos actuales",
    desc: "Reportes gerenciales basados en la realidad de esta mañana, no del mes pasado.",
    color: "var(--color-studio)",
  },
];

export function ExpectedBenefits() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Beneficios"
          title={
            <>
              Impacto directo en la <span className="font-serif-italic text-primary">rentabilidad</span>.
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <CardContainer key={i} className="w-full">
              <CardBody className="group/card relative h-full w-full overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-8 transition hover:border-primary/20 hover:bg-surface/70 md:p-10">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover/card:opacity-40"
                  style={{ background: b.color }}
                />
                <CardItem
                  as="div"
                  translateZ={40}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-hairline bg-surface/60 transition-colors"
                  style={{ color: b.color }}
                >
                  {b.icon}
                </CardItem>
                <CardItem
                  as="h3"
                  translateZ={50}
                  className="text-xl font-semibold tracking-tight text-foreground mb-3"
                >
                  {b.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={32}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {b.desc}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
