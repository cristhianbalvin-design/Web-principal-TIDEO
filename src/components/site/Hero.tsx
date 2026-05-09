import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-tideo.jpg";
import heroVideo from "@/assets/hero-tideo-animated.webm";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
        }}
      />
      <video
        aria-hidden
        className="hero-bg-video absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        poster={heroImg}
      >
        <source src={heroVideo} type="video/webm" />
      </video>
      <div aria-hidden className="hero-cyan-pulse pointer-events-none absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-background/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="w-8 h-px bg-primary/60" />
          TIDEO · Tech & Strategy
        </div>

        <h1 className="mt-8 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.95] max-w-5xl text-gradient">
          Tecnología que entiende tu{" "}
          <span className="font-serif-italic text-primary">negocio</span>.
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Diseñamos, automatizamos y construimos soluciones digitales para empresas
          que necesitan ordenar su operación, integrar procesos y crecer con control.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#trabajo"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition shadow-glow"
          >
            Ver soluciones <span aria-hidden>→</span>
          </a>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-sm font-medium hover:bg-surface transition"
          >
            Cuéntanos tu proceso
          </Link>
        </div>

        <p className="mt-16 max-w-xl text-sm text-muted-foreground">
          Para empresas medianas que ya no quieren seguir operando con Excel,
          WhatsApp, correos y sistemas que no conversan entre sí.
        </p>
      </div>
    </section>
  );
}
