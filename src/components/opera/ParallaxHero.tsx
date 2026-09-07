import { useRef } from "react";
import { useParallax } from "@/hooks/useParallax";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function ParallaxHero() {
  const containerRef = useRef<HTMLElement>(null);
  const parallaxOffset1 = useParallax(containerRef, 0.2);
  const parallaxOffset2 = useParallax(containerRef, 0.5);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero pt-20">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="hero-cyan-pulse pointer-events-none absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-background/10" />
      {/* Parallax layers */}
      <div 
        className="absolute inset-0 z-0 bg-surface/20"
        style={{ transform: `translateY(${parallaxOffset1}px)`, willChange: 'transform' }}
      >
         <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-muted-foreground/30 font-mono text-sm border-2 border-dashed border-primary/20 m-10">
           PLACEHOLDER: Capa maquinaria lejana
         </div>
      </div>
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset2}px)`, willChange: 'transform' }}
      >
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-center pb-20 text-muted-foreground/30 font-mono text-sm border-2 border-dashed border-primary/40 m-10">
           PLACEHOLDER: Capa maquinaria cercana
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-gradient">
          La plataforma que une el ERP y la <br className="hidden md:block"/>
          <span className="hero-highlight-word font-serif-italic text-primary">operación</span> de activos intensivos
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Primero el proceso, luego la tecnología. Un ERP + MOM construido sobre una sola base de datos, sin duplicación de información.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <HoverBorderGradient as="a" href="#arquitectura" containerClassName="rounded-full" className="px-8 py-3 text-sm md:text-base font-semibold bg-primary text-primary-foreground shadow-glow">
            Ver cómo funciona
          </HoverBorderGradient>
          <a href="#calificacion" className="px-8 py-3 rounded-full text-sm md:text-base font-medium border border-hairline hover:bg-surface transition-all text-foreground">
            Agendar una conversación
          </a>
        </div>
      </div>
    </section>
  );
}
