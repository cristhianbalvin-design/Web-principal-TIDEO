// Verifica el HTML prerenderizado. Corre después de `npm run build`; si no hay build, se omite.
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const dist = new URL("../dist/client/", import.meta.url);
const hasBuild = existsSync(new URL("index.html", dist));
const page = (p: string) => readFileSync(new URL(p, dist), "utf8");

const decode = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function jsonLd(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(decode(m[1])),
  );
}

function mainText(html: string) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  return decode(main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

describe.skipIf(!hasBuild)("HTML prerenderizado", () => {
  it("la home declara idioma, canonical, og:image absoluta y og:type", () => {
    const html = page("index.html");
    expect(html).toMatch(/<html[^>]*lang="es"/);
    expect(html).toContain('<link rel="canonical" href="https://www.tideo.tech/"');
    expect(html).toContain('property="og:image" content="https://www.tideo.tech/og-image.png"');
    expect(html).toContain('property="og:type" content="website"');
  });

  it("el título de la home nombra el producto principal (ERP a medida)", () => {
    const html = page("index.html");
    expect(html).toMatch(/<title>TIDEO[^<]*ERP a medida[^<]*<\/title>/);
    expect(html).toContain('property="og:title" content="TIDEO Tech &amp; Strategy | ERP a medida');
  });

  it("la home tiene JSON-LD Organization con contactPoint y address", () => {
    const org = jsonLd(page("index.html")).find((d) => d["@type"] === "Organization");
    expect(org).toBeDefined();
    expect(org.name).toBe("TIDEO Tech & Strategy");
    expect(org.url).toBe("https://www.tideo.tech/");
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.addressCountry).toBe("PE");
    expect(org.contactPoint[0]).toMatchObject({
      "@type": "ContactPoint",
      email: "contacto@tideo.tech",
    });
    expect(org.contactPoint[0].contactType).toBeTruthy();
  });

  it.each([
    ["contacto/index.html", "https://www.tideo.tech/contacto"],
    ["nosotros/index.html", "https://www.tideo.tech/nosotros"],
    ["privacidad/index.html", "https://www.tideo.tech/privacidad"],
    ["opera/index.html", "https://opera.tideo.tech/"],
    ["powerbi-ia/index.html", "https://powerbi-ia.tideo.tech/"],
  ])("%s tiene un único canonical %s", (file, href) => {
    const canonicals = [...page(file).matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(
      (m) => m[1],
    );
    expect(canonicals).toEqual([href]);
  });

  it.each(["nosotros/index.html", "privacidad/index.html", "contacto/index.html"])(
    "%s tiene más de 500 caracteres de contenido",
    (file) => {
      expect(mainText(page(file)).length).toBeGreaterThan(500);
    },
  );

  it("ninguna página normal lleva la marca de 404", () => {
    for (const f of [
      "index.html",
      "contacto/index.html",
      "nosotros/index.html",
      "privacidad/index.html",
    ]) {
      expect(page(f)).not.toContain('name="tideo:page"');
    }
  });

  it("existe 404.html en la raíz, en español y con noindex", () => {
    const html = page("404.html");
    expect(html).toContain("Página no encontrada");
    expect(html).toContain('name="robots" content="noindex"');
    // Marca que el router usa para hidratar 404.html en cualquier URL sin error #418.
    expect(html).toContain('<meta name="tideo:page" content="not-found"');
    expect(existsSync(new URL("404/index.html", dist))).toBe(false);
  });

  it("copia robots.txt, sitemap.xml y llms.txt a la salida", () => {
    for (const f of ["robots.txt", "sitemap.xml", "llms.txt"])
      expect(existsSync(new URL(f, dist))).toBe(true);
  });
});
