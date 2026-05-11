import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import isotipo from "@/assets/tideo-isotipo.png";

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
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={isotipo}
            alt=""
            aria-hidden
            className="h-6 w-6 object-contain drop-shadow-[0_0_12px_rgba(70,220,230,0.18)]"
          />
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
        <HoverBorderGradient
          as={Link}
          to="/contacto"
          containerClassName="hidden sm:inline-flex rounded-full"
          className="inline-flex items-center rounded-full bg-background/70 px-4 py-2 text-sm transition-colors hover:bg-surface"
        >
          Cuéntanos tu proceso →
        </HoverBorderGradient>
      </div>
    </header>
  );
}
