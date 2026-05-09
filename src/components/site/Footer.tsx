import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-glow" />
            <span className="font-semibold tracking-tight">TIDEO Tech & Strategy</span>
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-medium leading-tight max-w-md">
            Tecnología que entiende tu <span className="font-serif-italic text-primary">negocio</span>.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
            <li><a href="/#trabajo" className="hover:text-primary transition-colors">Trabajo</a></li>
            <li><a href="/#ecosistema" className="hover:text-primary transition-colors">Ecosistema</a></li>
            <li><a href="/#insights" className="hover:text-primary transition-colors">Insights</a></li>
            <li><Link to="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
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
            <li className="text-muted-foreground">www.tideo.tech</li>
          </ul>
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
