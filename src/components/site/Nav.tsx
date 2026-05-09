import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/", label: "Trabajo", hash: "#trabajo" },
  { to: "/", label: "Ecosistema", hash: "#ecosistema" },
  { to: "/", label: "Insights", hash: "#insights" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
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
          ? "backdrop-blur-xl bg-background/70 border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-glow" />
          <span className="font-semibold tracking-tight text-foreground">
            TIDEO
            <span className="text-muted-foreground font-normal"> / Tech & Strategy</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) =>
            "hash" in l && l.hash ? (
              <a
                key={l.label}
                href={l.hash}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <Link
          to="/contacto"
          className="hidden sm:inline-flex items-center rounded-full border border-hairline px-4 py-2 text-sm hover:bg-surface transition-colors"
        >
          Cuéntanos tu proceso →
        </Link>
      </div>
    </header>
  );
}
