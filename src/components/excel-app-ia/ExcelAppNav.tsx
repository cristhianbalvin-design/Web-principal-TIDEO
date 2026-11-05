import { useEffect, useState } from "react";
import isotipo from "@/assets/tideo-isotipo.png";

const navLinks = [
  { href: "#metodo", label: "Método" },
  { href: "#temario", label: "Temario" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#ruta", label: "Ruta" },
  { href: "#inversion", label: "Inversión" },
  { href: "#faq", label: "Preguntas" },
];

export function ExcelAppNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "backdrop-blur-xl bg-background/80 border-b border-hairline shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 min-w-0">
          <img
            src={isotipo}
            alt="TIDEO"
            className="h-6 w-6 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]"
          />
          <span className="font-semibold tracking-tight text-foreground flex items-center gap-2 min-w-0">
            TIDEO
            <span className="truncate inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-academy/15 text-academy border border-academy/30">
              AI Business Builder
            </span>
          </span>
        </a>

        <nav aria-label="Secciones del curso" className="hidden lg:flex items-center gap-7 text-sm">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#inscripcion"
          className="hidden sm:inline-flex items-center justify-center rounded-full bg-academy px-5 py-2 text-sm font-medium text-background hover:bg-academy/90 transition-colors shadow-[0_0_24px_-4px_rgba(249,115,22,0.45)] shrink-0"
        >
          Inscribirme →
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-b border-hairline bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground py-1.5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#inscripcion"
            onClick={() => setOpen(false)}
            className="block text-center rounded-full bg-academy px-4 py-2.5 text-sm font-semibold text-background mt-3"
          >
            Quiero construir mi propia app →
          </a>
        </div>
      )}
    </header>
  );
}
