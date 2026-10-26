import { describe, expect, it } from "vitest";

import middleware from "../middleware";
import {
  HOME_MARKDOWN,
  METALMECANICA_MARKDOWN,
  NOT_FOUND_MARKDOWN,
  OPERA_MARKDOWN,
  prefersMarkdown,
} from "../src/lib/agent-content";

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

function req(path: string, accept?: string, host = "www.tideo.tech") {
  const headers = new Headers({ host });
  if (accept) headers.set("accept", accept);
  return new Request(`https://${host}${path}`, { headers });
}

const isPassThrough = (res: Response) => res.headers.get("x-middleware-next") === "1";
const rewriteTarget = (res: Response) => res.headers.get("x-middleware-rewrite");

describe("prefersMarkdown", () => {
  it.each([
    ["text/markdown", true],
    ["text/markdown, text/html;q=0.5", true],
    ["text/markdown;q=0.9, */*", true],
    [BROWSER_ACCEPT, false],
    ["text/html, text/markdown;q=0.5", false],
    ["text/markdown;q=0", false],
    ["*/*", false],
    ["", false],
  ])("%s → %s", (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected);
  });
});

describe("negociación de Markdown en la home", () => {
  it("responde Markdown con Content-Type y Vary correctos", async () => {
    const res = middleware(req("/", "text/markdown"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    const body = await res.text();
    expect(body).toBe(HOME_MARKDOWN);
    expect(body.startsWith("# TIDEO Tech & Strategy")).toBe(true);
  });

  it("deja pasar al HTML a los navegadores, con Vary: Accept", () => {
    const res = middleware(req("/", BROWSER_ACCEPT));
    expect(isPassThrough(res)).toBe(true);
    expect(res.headers.get("vary")).toBe("Accept");
  });

  it("sirve /index.md sin importar el Accept", async () => {
    const res = middleware(req("/index.md", BROWSER_ACCEPT));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/markdown");
    expect(await res.text()).toBe(HOME_MARKDOWN);
  });
});

describe("404 para agentes", () => {
  it("una ruta inexistente pedida en Markdown devuelve 404 con cuerpo útil", async () => {
    const res = middleware(req("/some-path-that-does-not-exist", "text/markdown"));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    const body = await res.text();
    expect(body).toBe(NOT_FOUND_MARKDOWN);
    expect(body.length).toBeGreaterThan(20);
    expect(body).toContain("https://www.tideo.tech/llms.txt");
    expect(body).toContain("https://www.tideo.tech/sitemap.xml");
  });

  it("una ruta existente pedida en Markdown sigue al HTML", () => {
    for (const path of [
      "/contacto",
      "/contacto/",
      "/nosotros",
      "/privacidad",
      "/powerbi-ia",
      "/about",
    ]) {
      expect(isPassThrough(middleware(req(path, "text/markdown")))).toBe(true);
    }
  });

  it("una ruta inexistente pedida por un navegador pasa a Vercel (que sirve 404.html)", () => {
    expect(isPassThrough(middleware(req("/no-existe", BROWSER_ACCEPT)))).toBe(true);
  });

  it("no toca archivos estáticos", () => {
    for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/assets/app.js"]) {
      const res = middleware(req(path, "text/markdown"));
      expect(isPassThrough(res)).toBe(true);
      expect(res.headers.get("vary")).toBeNull();
    }
  });
});

describe("subdominios (comportamiento existente)", () => {
  it.each([
    ["opera.tideo.tech", "/", "/opera"],
    ["www.opera.tideo.tech", "/precios", "/opera/precios"],
    ["powerbi-ia.tideo.tech", "/", "/powerbi-ia"],
    ["www.powerbi-ia.tideo.tech", "/temario", "/powerbi-ia/temario"],
  ])("%s%s se reescribe a %s", (host, path, target) => {
    const res = middleware(req(path, BROWSER_ACCEPT, host));
    expect(rewriteTarget(res)).toBe(`https://${host}${target}`);
  });

  it("conserva el query string al reescribir", () => {
    const res = middleware(req("/?utm_source=x", BROWSER_ACCEPT, "opera.tideo.tech"));
    expect(rewriteTarget(res)).toBe("https://opera.tideo.tech/opera?utm_source=x");
  });

  it("en el subdominio, /opera/… redirige con 308 a la URL limpia", () => {
    for (const [host, path, target] of [
      ["opera.tideo.tech", "/opera", "https://opera.tideo.tech/"],
      ["opera.tideo.tech", "/opera/", "https://opera.tideo.tech/"],
      [
        "opera.tideo.tech",
        "/opera/metalmecanica?utm_source=x",
        "https://opera.tideo.tech/metalmecanica?utm_source=x",
      ],
      ["powerbi-ia.tideo.tech", "/powerbi-ia", "https://powerbi-ia.tideo.tech/"],
    ]) {
      for (const accept of [BROWSER_ACCEPT, "text/markdown"]) {
        const res = middleware(req(path, accept, host));
        expect(res.status).toBe(308);
        expect(res.headers.get("location")).toBe(target);
      }
    }
  });

  it("no toca assets ni rutas que solo se parecen al prefijo", () => {
    for (const path of [
      "/assets/a.js",
      "/opera-frames/frame_001.webp",
      "/1971c59e957ba112b91b726a8a2c7d28.txt",
    ]) {
      expect(isPassThrough(middleware(req(path, BROWSER_ACCEPT, "opera.tideo.tech")))).toBe(true);
    }
    // /operaciones no es /opera/…: se reescribe como cualquier otra ruta del subdominio.
    expect(rewriteTarget(middleware(req("/operaciones", BROWSER_ACCEPT, "opera.tideo.tech")))).toBe(
      "https://opera.tideo.tech/opera/operaciones",
    );
  });

  it("en www, /opera sigue sirviéndose sin redirección", () => {
    expect(isPassThrough(middleware(req("/opera", BROWSER_ACCEPT)))).toBe(true);
    expect(isPassThrough(middleware(req("/opera/metalmecanica", BROWSER_ACCEPT)))).toBe(true);
  });

  it("OPERA responde en Markdown en su subdominio y en /opera", async () => {
    for (const [host, path] of [
      ["opera.tideo.tech", "/"],
      ["www.opera.tideo.tech", "/"],
      ["www.tideo.tech", "/opera"],
      ["www.tideo.tech", "/opera/"],
    ]) {
      const res = middleware(req(path, "text/markdown", host));
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
      expect(res.headers.get("vary")).toBe("Accept");
      const body = await res.text();
      expect(body).toBe(OPERA_MARKDOWN);
      expect(body).toContain("ERP para talleres");
    }
  });

  it("la página de metalmecánica responde en Markdown en opera.tideo.tech y en www", async () => {
    for (const [host, path] of [
      ["opera.tideo.tech", "/metalmecanica"],
      ["www.tideo.tech", "/opera/metalmecanica"],
    ]) {
      const res = middleware(req(path, "text/markdown", host));
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
      const body = await res.text();
      expect(body).toBe(METALMECANICA_MARKDOWN);
      expect(body.startsWith("# ERP para metalmecánica en Perú")).toBe(true);
      expect(body).not.toContain("PENDIENTE");
    }
  });

  it("los navegadores ven el HTML de metalmecánica en el subdominio", () => {
    const res = middleware(req("/metalmecanica", BROWSER_ACCEPT, "opera.tideo.tech"));
    expect(rewriteTarget(res)).toBe("https://opera.tideo.tech/opera/metalmecanica");
  });

  it("los navegadores siguen viendo el HTML de OPERA", () => {
    const res = middleware(req("/", BROWSER_ACCEPT, "opera.tideo.tech"));
    expect(rewriteTarget(res)).toBe("https://opera.tideo.tech/opera");
  });

  it("la raíz de Power BI no devuelve el Markdown de la home principal", () => {
    const res = middleware(req("/", "text/markdown", "powerbi-ia.tideo.tech"));
    expect(rewriteTarget(res)).toBe("https://powerbi-ia.tideo.tech/powerbi-ia");
  });
});
