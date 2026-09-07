import { SectionHeader } from "@/components/site/SectionHeader";
import { CheckCircle2 } from "lucide-react";

export function WhatIsOpera() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Qué es OPERA"
          title={
            <>
              La solución definitiva para la <span className="font-serif-italic text-primary">gestión de activos</span>.
            </>
          }
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">El ERP tradicional te da una visión financiera. OPERA te da el control operativo.</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              OPERA no es solo un software de mantenimiento, ni solo un sistema contable. Es una plataforma integral que combina las capacidades de un ERP completo con un sistema MOM (Manufacturing Operations Management) en una única base de datos.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Dile adiós a la doble digitación.",
                "Costos de mantenimiento y operación en tiempo real.",
                "Gestión de almacenes, compras y activos 100% integrada.",
                "Auditable y trazable de punta a punta."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-hairline bg-surface/30 p-8 flex flex-col justify-center">
             <div className="absolute inset-0 grid-bg opacity-30" />
             <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                <div className="w-full bg-background/80 backdrop-blur border border-hairline rounded-xl p-6 text-center shadow-glow shadow-primary/20">
                   <h4 className="text-primary font-bold text-xl mb-2">ERP</h4>
                   <p className="text-sm text-muted-foreground">Comercial, Finanzas, RRHH, Compras, BI</p>
                </div>
                <div className="w-px h-8 bg-hairline" />
                <div className="w-full bg-background/80 backdrop-blur border border-hairline rounded-xl p-6 text-center shadow-glow shadow-primary/20">
                   <h4 className="text-primary font-bold text-xl mb-2">MOM</h4>
                   <p className="text-sm text-muted-foreground">CMMS, MES, WMS, FSM, HSE</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
