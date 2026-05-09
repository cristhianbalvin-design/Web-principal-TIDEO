import { Link } from "@tanstack/react-router";

const pillars = [
  { t: "Proceso antes que software", d: "Mapeamos cómo trabaja tu empresa, qué decisiones se toman y qué información necesita cada rol." },
  { t: "MVP en semanas", d: "Versiones funcionales rápidas para validar, corregir y escalar sin esperar largos ciclos." },
  { t: "Tecnología adaptable", d: "Herramientas modernas, integraciones, bases cloud, IA y automatización para construir soluciones flexibles." },
  { t: "Acompañamiento real", d: "Iteramos contigo, capacitamos al equipo y ajustamos la solución a medida que el negocio cambia." },
];

export function LabsFeature() {
  return (
    <section className="relative py-28 md:py-36 border-t border-hairline overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
            <span className="w-6 h-px bg-primary" />
            TIDEO Labs
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-gradient">
            No desarrollamos software. Diseñamos sistemas para{" "}
            <span className="font-serif-italic text-primary">operar mejor</span>.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Nuestra unidad de desarrollo ágil. Creamos soluciones digitales a medida
            para empresas que necesitan controlar mejor su operación, integrar
            procesos y lanzar tecnología funcional sin esperar meses.
          </p>
          <p className="mt-8 text-lg font-medium">
            El código viene después. Primero entendemos el proceso.
          </p>
          <Link
            to="/contacto"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition shadow-glow"
          >
            Solicitar auditoría gratuita →
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
            {pillars.map((p, i) => (
              <div key={p.t} className="bg-background p-7">
                <div className="text-xs font-mono text-primary">0{i + 1}</div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
