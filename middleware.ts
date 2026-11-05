import { rewrite, next } from "@vercel/functions";

import {
  HOME_MARKDOWN,
  GUIA_MARKDOWN,
  METALMECANICA_MARKDOWN,
  NOT_FOUND_MARKDOWN,
  OPERA_MARKDOWN,
  isKnownPath,
  normalizePath,
  prefersMarkdown,
} from "./src/lib/agent-content";
import {
  fromLandingPath,
  isUnderLanding,
  landingForHost,
  toLandingPath,
} from "./src/lib/host-routes";

export const config = {
  matcher: "/:path*",
};

const isStaticAsset = (pathname: string) => {
  return pathname.startsWith("/assets/") || /\.[a-zA-Z0-9]+$/.test(pathname);
};

/** La respuesta depende del header Accept (HTML vs Markdown). */
const VARY = { Vary: "Accept" };

const markdown = (body: string, status: number) =>
  new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      ...VARY,
    },
  });

export default function middleware(request: Request) {
  const hostname = request.headers.get("host") || "";
  const url = new URL(request.url);
  const landing = landingForHost(hostname);

  // Versión Markdown de la home, enlazable desde llms.txt.
  if (!landing && url.pathname === "/index.md") {
    return markdown(HOME_MARKDOWN, 200);
  }

  if (!isStaticAsset(url.pathname)) {
    // En el subdominio, /opera/… (o /powerbi-ia/…) es la misma página que su URL limpia:
    // redirigir evita URLs duplicadas (p. ej. opera.tideo.tech/opera/metalmecanica).
    if (landing && isUnderLanding(landing, url.pathname)) {
      const clean = fromLandingPath(landing, url.pathname);
      return Response.redirect(new URL(clean + url.search, request.url), 308);
    }

    // Ruta efectiva tras el mapeo de subdominio (mismo criterio que el rewrite de abajo).
    // (Las rutas bajo el prefijo ya se redirigieron arriba.)
    const effectivePath = landing ? toLandingPath(landing, url.pathname) : url.pathname;

    if (prefersMarkdown(request.headers.get("accept"))) {
      if (normalizePath(effectivePath) === "/") return markdown(HOME_MARKDOWN, 200);
      if (normalizePath(effectivePath) === "/opera") return markdown(OPERA_MARKDOWN, 200);
      if (normalizePath(effectivePath) === "/guias/del-tablero-al-agente")
        return markdown(GUIA_MARKDOWN, 200);
      if (normalizePath(effectivePath) === "/opera/metalmecanica") {
        return markdown(METALMECANICA_MARKDOWN, 200);
      }
      if (!isKnownPath(effectivePath)) return markdown(NOT_FOUND_MARKDOWN, 404);
      // Rutas existentes sin versión Markdown: siguen al HTML.
    }

    if (effectivePath !== url.pathname) {
      return rewrite(new URL(effectivePath + url.search, request.url), { headers: VARY });
    }
    return next({ headers: VARY });
  }

  return next();
}
