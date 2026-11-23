import type { ReactNode } from "react";

import { OperaNav } from "@/components/opera/OperaNav";
import { Footer } from "@/components/site/Footer";

/** Correo para privacidad y eliminación de datos de OPERA (línea #742 del ERP). */
export const OPERA_PRIVACIDAD_EMAIL = "cristhian@tideo.tech";

export function OperaCorreo({ asunto }: { asunto: string }) {
  return (
    <a
      className="text-primary hover:underline"
      href={`mailto:${OPERA_PRIVACIDAD_EMAIL}?subject=${encodeURIComponent(asunto)}`}
    >
      {OPERA_PRIVACIDAD_EMAIL}
    </a>
  );
}

export function Bloque({
  id,
  titulo,
  children,
}: {
  id?: string;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-2xl font-semibold tracking-tight">{titulo}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}

/** Página legal de OPERA (opera.tideo.tech): misma marca y navegación que la landing. */
export function OperaLegalPage({
  etiqueta,
  titulo,
  actualizado,
  children,
}: {
  etiqueta: string;
  titulo: string;
  actualizado: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OperaNav links={[]} homeLink />
      <main className="pt-32 pb-20">
        <article className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-6 h-px bg-primary/60" />
            {etiqueta}
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gradient">
            {titulo}
          </h1>
          <p className="mt-4 text-base text-foreground">OPERA by Tideo Tech &amp; Strategy</p>
          <p className="mt-2 text-sm text-muted-foreground">Última actualización: {actualizado}</p>
          {children}
        </article>
      </main>
      <Footer variant="subdomain" />
    </div>
  );
}
