import { describe, expect, it } from "vitest";

import {
  NOT_FOUND_META,
  NOT_FOUND_ROUTE,
  createNotFoundRewrite,
  detectServedNotFoundPath,
} from "../src/lib/not-found-rewrite";

const fakeDoc = (pathname: string, hasMarker: boolean) => ({
  location: { pathname },
  querySelector: (selector: string) =>
    hasMarker && selector.includes(NOT_FOUND_META.name) && selector.includes(NOT_FOUND_META.content)
      ? {}
      : null,
});

describe("detectServedNotFoundPath", () => {
  it("devuelve la URL real cuando la página cargada es 404.html", () => {
    expect(detectServedNotFoundPath(fakeDoc("/ruta-inexistente", true))).toBe("/ruta-inexistente");
  });

  it("devuelve null en páginas normales, en el servidor y en /404", () => {
    expect(detectServedNotFoundPath(fakeDoc("/nosotros", false))).toBeNull();
    expect(detectServedNotFoundPath(undefined)).toBeNull();
    expect(detectServedNotFoundPath(fakeDoc(NOT_FOUND_ROUTE, true))).toBeNull();
  });
});

describe("createNotFoundRewrite", () => {
  const url = (path: string) => new URL(`https://www.tideo.tech${path}`);

  it("resuelve la URL servida a /404 y la muestra igual en la barra", () => {
    const rw = createNotFoundRewrite("/ruta-inexistente");
    const input = url("/ruta-inexistente");
    expect(rw.input(input)).toBe(true);
    expect(input.pathname).toBe(NOT_FOUND_ROUTE);

    const output = url(NOT_FOUND_ROUTE);
    expect(rw.output(output)).toBe(true);
    expect(output.pathname).toBe("/ruta-inexistente");
  });

  it("no toca otras rutas", () => {
    const rw = createNotFoundRewrite("/ruta-inexistente");
    for (const path of ["/", "/contacto", "/opera"]) {
      const u = url(path);
      expect(rw.input(u)).toBe(false);
      expect(rw.output(u)).toBe(false);
      expect(u.pathname).toBe(path);
    }
  });

  it("es inerte cuando la página no es el 404", () => {
    const rw = createNotFoundRewrite(null);
    const u = url(NOT_FOUND_ROUTE);
    expect(rw.input(url("/x"))).toBe(false);
    expect(rw.output(u)).toBe(false);
    expect(u.pathname).toBe(NOT_FOUND_ROUTE);
  });
});
