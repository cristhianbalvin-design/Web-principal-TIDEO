import { useRef } from "react";
import { useScrollScrubbing } from "@/hooks/useScrollScrubbing";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function ParallaxHero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useScrollScrubbing(containerRef, canvasRef, {
    frameCount: 64,
    framePath: (index) => `/opera-frames/frame_${String(index + 1).padStart(3, "0")}.webp`,
    fit: "contain",
    scaleFactor: 0.94,
  });

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-hero">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* Background Canvas for Scroll-Scrubbing Video */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="h-full w-full opacity-70"
            aria-hidden
          />
        </div>

        {/* Aesthetic Overlays for Depth, Glow & Text Readability */}
        <div className="absolute inset-0 z-0 grid-bg opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
        <div aria-hidden className="hero-cyan-pulse pointer-events-none absolute inset-0 z-0" />
        <div aria-hidden className="absolute inset-0 z-0 bg-background/15 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/70 via-background/40 to-background pointer-events-none" />

        {/* Content remains static & visible during sticky scroll */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-gradient">
            La plataforma que une el ERP y la <br className="hidden md:block"/>
            <span className="hero-highlight-word font-serif-italic text-primary">operación</span> de activos intensivos
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Primero el proceso, luego la tecnología. Un ERP + MOM construido sobre una sola base de datos, sin duplicación de información.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#arquitectura" className="px-8 py-3 rounded-full text-sm md:text-base font-medium border border-hairline hover:bg-surface transition-all text-foreground">
              Ver cómo funciona
            </a>
            <HoverBorderGradient as="a" href="#calificacion" containerClassName="rounded-full" className="px-8 py-3 text-sm md:text-base font-semibold bg-primary text-primary-foreground shadow-glow">
              Agendar una conversación
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </section>
  );
}
