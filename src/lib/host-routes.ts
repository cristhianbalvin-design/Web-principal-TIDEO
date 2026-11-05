/**
 * Mapa único subdominio → landing.
 *
 * Cada entrada hace que https://<host>/ muestre la landing `path` de este mismo proyecto:
 * - middleware.ts (Edge de Vercel) reescribe la URL en el servidor.
 * - src/router.tsx replica la reescritura en el cliente; sin eso la hidratación de React
 *   no coincide con el HTML del servidor (error #418) y devuelve al usuario a "/".
 *
 * Para publicar una landing con subdominio propio:
 *   1. Agregar una línea a LANDING_HOSTS.
 *   2. Crear la ruta en src/routes/<slug>/ y registrarla en `pages` de vite.config.ts,
 *      en KNOWN_PATHS (src/lib/agent-content.ts) y en public/sitemap.xml.
 *   3. Configurar el DNS y agregar el dominio al proyecto en Vercel.
 *
 * El alias www.<host> se acepta de forma automática. Este archivo no tiene dependencias
 * porque lo importan tanto el Edge Runtime como el navegador.
 */
export type LandingHost = {
  /** Subdominio sin "www." (ej. "opera.tideo.tech"). */
  readonly host: string;
  /** Ruta de la landing dentro de la app (ej. "/opera"). */
  readonly path: `/${string}`;
};

export const LANDING_HOSTS: readonly LandingHost[] = [
  { host: "opera.tideo.tech", path: "/opera" },
  { host: "powerbi-ia.tideo.tech", path: "/powerbi-ia" },
];

/** Landing que corresponde a un hostname, o null si es el sitio principal. */
export function landingForHost(hostname: string): string | null {
  for (const landing of LANDING_HOSTS) {
    if (hostname === landing.host || hostname === `www.${landing.host}`) return landing.path;
  }
  return null;
}

/** ¿La ruta ya está bajo la landing? Compara por segmento: "/operaciones" no cuenta como "/opera". */
export function isUnderLanding(landing: string, pathname: string): boolean {
  return pathname === landing || pathname.startsWith(`${landing}/`);
}

/** "/" → "/opera"; "/precios" → "/opera/precios". */
export function toLandingPath(landing: string, pathname: string): string {
  return pathname === "/" ? landing : `${landing}${pathname}`;
}

/** Inversa de toLandingPath: "/opera" → "/"; "/opera/precios" → "/precios". */
export function fromLandingPath(landing: string, pathname: string): string {
  return pathname.slice(landing.length) || "/";
}
