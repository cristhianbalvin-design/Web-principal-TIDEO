import { Link } from "@tanstack/react-router";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function FinalCTA() {
  return (
    <section className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-gradient">
          Tienes un proceso que puede{" "}
          <span className="font-serif-italic text-primary">funcionar mejor</span>.
        </h2>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Si tu empresa depende de Excel, WhatsApp, correos o sistemas que no
          conversan entre sí, podemos ayudarte a ordenar el proceso y convertirlo
          en una solución digital funcional.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <HoverBorderGradient
            as={Link}
            to="/contacto"
            containerClassName="final-cta-gradient rounded-full"
            className="final-cta-button inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition"
          >
            Cuéntanos tu proceso -&gt;
          </HoverBorderGradient>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Analizamos tu operación, identificamos oportunidades y te mostramos cómo
          convertir un proceso manual en una solución digital viable.
        </p>
      </div>
    </section>
  );
}
