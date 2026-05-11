import { Link } from "@tanstack/react-router";
import tideoLogoVertical from "@/assets/tideo-logo-vertical.png";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 lg:grid-cols-3 lg:items-start">
        <div className="lg:order-2 flex flex-col items-center text-center">
          <img
            src={tideoLogoVertical}
            alt="TIDEO Tech & Strategy"
            className="footer-brand-logo"
            loading="lazy"
          />
          <p className="mt-5 text-xl md:text-2xl font-medium leading-tight max-w-xs">
            Tecnologia que entiende tu{" "}
            <span className="font-serif-italic text-primary">negocio</span>.
          </p>
        </div>

        <div className="lg:order-1">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Navegacion</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <a href="/#trabajo" className="hover:text-primary transition-colors">
                Trabajo
              </a>
            </li>
            <li>
              <a href="/#ecosistema" className="hover:text-primary transition-colors">
                Ecosistema
              </a>
            </li>
            <li>
              <a href="/#insights" className="hover:text-primary transition-colors">
                Insights
              </a>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-primary transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:order-3 lg:text-right">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="mailto:cristhian@cristhianbalvin.com"
                className="hover:text-primary transition-colors"
              >
                cristhian@cristhianbalvin.com
              </a>
            </li>
            <li>
              <a href="https://www.tideo.tech" className="text-muted-foreground hover:text-primary transition-colors">
                www.tideo.tech
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-center justify-end gap-3">
            <a
              href="https://www.facebook.com/tideomarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-background hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tideo.marketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-background hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-background cursor-default"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </span>
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-background cursor-default"
              aria-label="WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 TIDEO Tech & Strategy. Todos los derechos reservados.</span>
          <span>Lima · Perú</span>
        </div>
      </div>
    </footer>
  );
}
