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

  it("el botón flotante de WhatsApp de la home abre el chat con el número de TIDEO", () => {
    const html = page("index.html");
    const link = html.match(/<a[^>]*aria-label="Escríbenos por WhatsApp"[^>]*>/)?.[0] ?? "";
    expect(link).toContain('href="https://wa.me/51919102556?text=');
    expect(link).toContain('target="_blank"');
    expect(link).toContain('rel="noopener noreferrer"');
  });

  it("el footer enlaza la página de LinkedIn y el JSON-LD la incluye en sameAs", () => {
    const html = page("index.html");
    const link = html.match(/<a[^>]*aria-label="LinkedIn"[^>]*>/)?.[0] ?? "";
    expect(link).toContain('href="https://www.linkedin.com/company/tideo-tech-strategy/"');
    expect(link).toContain('rel="noopener noreferrer"');
    const org = jsonLd(html).find((d) => d["@type"] === "Organization");
    expect(org.sameAs).toContain("https://www.linkedin.com/company/tideo-tech-strategy/");
    expect(org.sameAs).toContain("https://maps.google.com/?cid=11732253999648614933");
    expect(org.hasMap).toBe("https://maps.google.com/?cid=11732253999648614933");
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

  it("OPERA se presenta como ERP para talleres con JSON-LD SoftwareApplication", () => {
    const html = page("opera/index.html");
    expect(html).toMatch(/<title>OPERA \| ERP para talleres[^<]*<\/title>/);
    const app = jsonLd(html).find((d) => d["@type"] === "SoftwareApplication");
    expect(app).toBeDefined();
    expect(app.name).toBe("OPERA");
    expect(app.url).toBe("https://opera.tideo.tech/");
    expect(app.applicationCategory).toBe("BusinessApplication");
    expect(app.provider.name).toBe("TIDEO Tech & Strategy");
  });

  it("la página de metalmecánica tiene título, canonical y JSON-LD de FAQ y breadcrumb", () => {
    const html = page("opera/metalmecanica/index.html");
    expect(html).toMatch(/<title>ERP para metalmecánica en Perú[^<]*<\/title>/);
    expect(html).toContain('<link rel="canonical" href="https://opera.tideo.tech/metalmecanica"');
    expect(html).toMatch(/<h1[^>]*>[\s\S]*metalmecánica[\s\S]*<\/h1>/);
    const ld = jsonLd(html);
    const faq = ld.find((d) => d["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBe(6);
    const crumbs = ld.find((d) => d["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((i: { item: string }) => i.item)).toEqual([
      "https://opera.tideo.tech/",
      "https://opera.tideo.tech/metalmecanica",
    ]);
  });

  it("las respuestas del FAQ están en el HTML y no se publica nada PENDIENTE", () => {
    const html = page("opera/metalmecanica/index.html");
    expect(html).toContain("La Hoja de Costeo toma la tarifa por cargo desde planilla");
    expect(html).not.toContain("PENDIENTE");
    expect(html).not.toMatch(/factura electrónica/i);
  });

  it.each([
    ["opera/index.html", "OPERA"],
    ["opera/metalmecanica/index.html", "taller metalmec"],
    ["index.html", "proceso de mi empresa"],
  ])("%s tiene el botón flotante de WhatsApp con su mensaje", (file, text) => {
    const link = page(file).match(/<a[^>]*aria-label="Escríbenos por WhatsApp"[^>]*>/)?.[0] ?? "";
    expect(link).toContain('href="https://wa.me/51919102556?text=');
    const msg = decodeURIComponent(link.match(/text=([^"&]+)/)?.[1] ?? "");
    expect(msg).toContain(text);
  });

  it("la landing de OPERA enlaza a la página de metalmecánica", () => {
    expect(page("opera/index.html")).toMatch(/<a[^>]*href="\/opera\/metalmecanica"/);
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
