/**
 * Hidratación de la página 404.
 *
 * Vercel sirve dist/client/404.html (prerenderizado en la ruta /404) para cualquier
 * URL que no exista. Si el cliente hidratara ese HTML con la URL real (p. ej.
 * /ruta-inexistente), el router renderizaría otro árbol y otro <head> → React #418.
 *
 * Solución: 404.html lleva una marca en el <head>. Al arrancar, el cliente la detecta
 * y resuelve esa URL a la ruta /404 (input), mostrando en la barra la URL original
 * (output). La navegación posterior funciona normal.
 */
export const NOT_FOUND_ROUTE = "/404";

export const NOT_FOUND_META = { name: "tideo:page", content: "not-found" } as const;

type DocumentLike = {
  querySelector: (selector: string) => unknown;
  location: { pathname: string };
};

/** Ruta con la que el navegador cargó 404.html, o null si la página no es el 404. */
export function detectServedNotFoundPath(doc: DocumentLike | undefined): string | null {
  if (!doc) return null;
  const marker = doc.querySelector(
    `meta[name="${NOT_FOUND_META.name}"][content="${NOT_FOUND_META.content}"]`,
  );
  if (!marker) return null;
  const path = doc.location.pathname;
  return path === NOT_FOUND_ROUTE ? null : path;
}

/** Reglas de rewrite para TanStack Router. Cada una devuelve true si modificó la URL. */
export function createNotFoundRewrite(servedPath: string | null) {
  return {
    input(url: URL): boolean {
      if (!servedPath || url.pathname !== servedPath) return false;
      url.pathname = NOT_FOUND_ROUTE;
      return true;
    },
    output(url: URL): boolean {
      if (!servedPath || url.pathname !== NOT_FOUND_ROUTE) return false;
      url.pathname = servedPath;
      return true;
    },
  };
}
