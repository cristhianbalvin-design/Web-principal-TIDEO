import { SectionHeader } from "@/components/site/SectionHeader";
import { ArrowRight } from "lucide-react";

export function NativeIntegration() {
  return (
    <section className="py-24 md:py-32 border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El diferenciador"
          title={
            <>
              Integración <span className="font-serif-italic text-primary">Nativa</span>.
            </>
          }
        />

        <div className="mt-16 bg-background rounded-2xl border border-hairline p-8 md:p-12">
           <h3 className="text-xl font-semibold mb-6">El viaje de un parte diario</h3>
           <p className="text-muted-foreground mb-10 max-w-2xl">
             En una empresa típica, un parte diario de maquinaria toma horas en procesarse y viaja por 3 áreas distintas. Con OPERA, el dato se digita en campo y fluye instantáneamente.
           </p>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex-1 bg-surface/50 border border-primary/30 p-6 rounded-xl w-full text-center shadow-glow shadow-primary/20 transition-all">
                <div className="text-sm font-bold text-primary mb-2 tracking-wide uppercase">
                  1. CAMPO (MOM)
                </div>
                <div className="text-foreground">
                  Operador reporta 8h de trabajo y consumo de 5 galones.
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-muted-foreground/40 hidden md:block shrink-0" />
              <div className="flex-1 space-y-4 w-full">
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between hover:bg-indigo-500/10 transition-colors">
                  <span className="text-sm font-semibold text-foreground">
                    Nómina <span className="text-xs font-mono font-medium text-indigo-400 ml-1">(ERP)</span>
                  </span>
                  <span className="text-xs text-muted-foreground">+8h calculadas</span>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between hover:bg-indigo-500/10 transition-colors">
                  <span className="text-sm font-semibold text-foreground">
                    Costos <span className="text-xs font-mono font-medium text-indigo-400 ml-1">(ERP)</span>
                  </span>
                  <span className="text-xs text-muted-foreground">Valorización del equipo</span>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between hover:bg-indigo-500/10 transition-colors">
                  <span className="text-sm font-semibold text-foreground">
                    Inventario <span className="text-xs font-mono font-medium text-indigo-400 ml-1">(ERP)</span>
                  </span>
                  <span className="text-xs text-muted-foreground">-5 galones de stock</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
