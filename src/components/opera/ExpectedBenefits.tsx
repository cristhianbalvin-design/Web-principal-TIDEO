import { SectionHeader } from "@/components/site/SectionHeader";
import { Wrench, CircleDollarSign, TimerOff, ShieldCheck, FileCheck, TrendingUp } from "lucide-react";

const benefits = [
  { icon: <Wrench />, title: "Mayor disponibilidad mecánica", desc: "Predictibilidad de fallas y mantenimientos a tiempo para que la flota no pare." },
  { icon: <CircleDollarSign />, title: "Costos precisos", desc: "Sabrás exactamente cuánto te cuesta operar cada máquina u hora hombre." },
  { icon: <TimerOff />, title: "Menos tiempos muertos", desc: "Logística integrada: el repuesto correcto en el momento exacto." },
  { icon: <ShieldCheck />, title: "HSE auditable", desc: "Cumplimiento normativo documentado y accesible a un clic." },
  { icon: <FileCheck />, title: "Cierres administrativos rápidos", desc: "La información financiera fluye desde la operación sin reprocesos." },
  { icon: <TrendingUp />, title: "Decisiones con datos actuales", desc: "Reportes gerenciales basados en la realidad de esta mañana, no del mes pasado." }
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 rounded-xl border border-hairline bg-background/50 backdrop-blur">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {b.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
