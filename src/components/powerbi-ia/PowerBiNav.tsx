import { useState, useEffect } from "react";
import isotipo from "@/assets/tideo-isotipo.png";

const navLinks = [
  { href: "#niveles", label: "3 Niveles de IA" },
  { href: "#aprendizaje", label: "Qué aprenderás" },
  { href: "#temario", label: "Programa" },
  { href: "#inversion", label: "Inversión" },
  { href: "#metodo-cia", label: "Método C.I.A." },
  { href: "#faq", label: "Preguntas frecuentes" },
];

export function PowerBiNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-hairline shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={isotipo}
            alt="TIDEO"
            className="h-6 w-6 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]"
          />
          <span className="font-semibold tracking-tight text-foreground flex items-center gap-2">
            TIDEO
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-academy/15 text-academy border border-academy/30">
              Academy
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#inscripcion"
            className="inline-flex items-center justify-center rounded-full bg-academy px-5 py-2 text-sm font-medium text-background hover:bg-academy/90 transition-colors shadow-[0_0_24px_-4px_rgba(249,115,22,0.45)]"
          >
            Inscribirme →
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-hairline bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground py-1.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inscripcion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center rounded-full bg-academy px-4 py-2.5 text-sm font-semibold text-background mt-3"
          >
            Inscribirme al curso →
          </a>
        </div>
      )}
    </header>
  );
}
