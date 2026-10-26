import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { KNOWN_PATHS } from "../src/lib/agent-content";
import { SITE_URL } from "../src/lib/site";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

describe("public/sitemap.xml", () => {
  const xml = read("public/sitemap.xml");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("es un urlset válido con lastmod en cada URL", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(locs.length).toBeGreaterThan(0);
    expect([...xml.matchAll(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)].length).toBe(locs.length);
  });

  it("lista las URLs canónicas de www y de las landings en subdominio", () => {
    for (const loc of locs.filter((l) => l.startsWith(`${SITE_URL}/`))) {
      const path = loc.slice(SITE_URL.length) || "/";
      expect(KNOWN_PATHS).toContain(path);
    }
    expect(locs).toEqual([
      ...["/", "/contacto", "/nosotros", "/privacidad"].map((p) =>
        p === "/" ? `${SITE_URL}/` : SITE_URL + p,
      ),
      "https://opera.tideo.tech/",
      "https://opera.tideo.tech/metalmecanica",
      "https://powerbi-ia.tideo.tech/",
    ]);
  });
});

describe("public/robots.txt", () => {
  it("permite el rastreo y apunta al sitemap", () => {
    const txt = read("public/robots.txt");
    expect(txt).toMatch(/^User-agent: \*$/m);
    expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});

describe("public/llms.txt", () => {
  const txt = read("public/llms.txt");

  it("sigue el formato llms.txt (H1, resumen en blockquote, secciones H2)", () => {
    const lines = txt.split("\n");
    expect(lines[0]).toBe("# TIDEO Tech & Strategy");
    expect(txt).toMatch(/^> .{40,}/m);
    expect([...txt.matchAll(/^## /gm)].length).toBeGreaterThanOrEqual(3);
  });

  it("incluye la sección de cuándo usar TIDEO y cómo contactar", () => {
    expect(txt).toMatch(/^## When to use TIDEO/m);
    expect(txt).toMatch(/^Use TIDEO when /m);
    expect(txt).toMatch(/^## How an agent should contact TIDEO/m);
    expect(txt).toContain("contacto@tideo.tech");
  });

  it("todos sus enlaces del sitio principal apuntan a rutas existentes o archivos públicos", () => {
    const links = [...txt.matchAll(/https:\/\/www\.tideo\.tech(\/[^\s)]*)/g)].map((m) => m[1]);
    const allowedFiles = ["/sitemap.xml", "/index.md", "/llms.txt"];
    for (const path of links) {
      expect([...KNOWN_PATHS, ...allowedFiles]).toContain(path);
    }
  });
});

describe("vercel.json", () => {
  const cfg = JSON.parse(read("vercel.json"));

  it("ya no reescribe todas las rutas a index.html (causa de los soft-404)", () => {
    const rewrites: Array<{ destination: string }> = cfg.rewrites ?? [];
    expect(rewrites.some((r) => r.destination === "/index.html")).toBe(false);
  });

  it("redirige /about y /privacy a las páginas en español", () => {
    expect(cfg.redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "/about", destination: "/nosotros", permanent: true }),
        expect.objectContaining({
          source: "/privacy",
          destination: "/privacidad",
          permanent: true,
        }),
      ]),
    );
  });
});
