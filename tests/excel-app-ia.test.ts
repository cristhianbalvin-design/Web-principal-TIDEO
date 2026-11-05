import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

import middleware from "../middleware";
import { buildLeadNotes } from "../src/components/excel-app-ia/lead-notes";
import * as content from "../src/content/excel-app-ia";

const BROWSER_ACCEPT = "text/html,application/xhtml+xml,*/*;q=0.8";

function req(path: string, host: string) {
  return new Request(`https://${host}${path}`, {
    headers: new Headers({ host, accept: BROWSER_ACCEPT }),
  });
}

describe("app-ia.tideo.tech (subdominio)", () => {
  it("la raíz se reescribe a /app-ia conservando el query string", () => {
    const res = middleware(req("/?utm_campaign=meta_dic", "app-ia.tideo.tech"));
    expect(res.headers.get("x-middleware-rewrite")).toBe(
      "https://app-ia.tideo.tech/app-ia?utm_campaign=meta_dic",
    );
  });

  it("/app-ia en el subdominio redirige con 308 a la URL limpia", () => {
    const res = middleware(req("/app-ia", "www.app-ia.tideo.tech"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://www.app-ia.tideo.tech/");
  });

  it("vercel.json redirige la ruta anterior /excel-app-ia a /app-ia", () => {
    const cfg = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
    expect(cfg.redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/excel-app-ia",
          destination: "/app-ia",
          permanent: true,
        }),
      ]),
    );
  });

  it("en www la ruta /app-ia pasa directo (misma página)", () => {
    const res = middleware(req("/app-ia", "www.tideo.tech"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});

describe("notas del lead para el CRM", () => {
  const base = {
    nombre: "Ana",
    correo: "ana@x.pe",
    whatsapp: "999",
    ocupacion: "Logística",
    problema: "  Solicitudes de compra en Excel  ",
    experiencia_ia: "basica" as const,
    disponibilidad: "si" as const,
    acepta_datos: true,
    acepta_comercial: false,
  };

  it("incluye curso, problema, experiencia, disponibilidad, consentimiento y origen", () => {
    const notes = buildLeadNotes(base);
    expect(notes).toContain("Curso: De Excel a tu Propia App con IA");
    expect(notes).toContain("Proceso a convertir en app: Solicitudes de compra en Excel |");
    expect(notes).toContain("Experiencia con IA: Básica");
    expect(notes).toContain("Disponibilidad 6 fechas: Sí");
    expect(notes).toContain("Acepta comunicaciones comerciales: No");
    expect(notes).toContain("Origen: app-ia.tideo.tech");
  });

  it("marca 'Necesita consultar' cuando no confirma las fechas", () => {
    expect(buildLeadNotes({ ...base, disponibilidad: "consultar" })).toContain(
      "Disponibilidad 6 fechas: Necesita consultar",
    );
  });
});

describe("contenido publicado", () => {
  it("no filtra notas internas del documento de copy ([...])", () => {
    // Ningún texto publicado debe llevar corchetes: en el copy solo marcan notas internas.
    const strings: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === "string") strings.push(v);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(content);
    expect(strings.length).toBeGreaterThan(50);
    for (const s of strings) expect(s).not.toMatch(/[[\]]/);
    const dir = new URL("../src/components/excel-app-ia/", import.meta.url);
    for (const file of readdirSync(dir, { recursive: true }) as string[]) {
      if (!/\.tsx?$/.test(file)) continue;
      const src = readFileSync(new URL(file, dir), "utf8");
      expect(src, file).not.toMatch(
        /\[(Diseño|Nota operativa|Completar|Indicar|Definir|Confirmar|BOTÓN)/i,
      );
    }
  });

  it("las 6 sesiones caen en sábado y coinciden con inicio y fin del curso", () => {
    const months: Record<string, number> = { diciembre: 11, enero: 0 };
    const dates = content.SESSIONS.map((s) => {
      const m = s.date.match(/(\d+) de (\w+) de (\d{4})/);
      if (!m) throw new Error(s.date);
      return new Date(Date.UTC(Number(m[3]), months[m[2]], Number(m[1])));
    });
    for (const d of dates) expect(d.getUTCDay()).toBe(6);
    expect(dates[0].toISOString().slice(0, 10)).toBe(content.COURSE.startDate);
    expect(dates.at(-1)!.toISOString().slice(0, 10)).toBe(content.COURSE.endDate);
  });

  it("no usa lenguaje que minimice lo que se construye", () => {
    const strings: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === "string") strings.push(v);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    // AI_EXPERIENCE describe la experiencia del alumno ("Básica"), no el MVP.
    const { AI_EXPERIENCE: _skip, ...rest } = content;
    walk(rest);
    const MINIMIZING = /b[aá]sic|sencill|simple|pequeñ|mini ?app|miniaplic|acotad/i;
    for (const s of strings) expect(s).not.toMatch(MINIMIZING);
    const dir = new URL("../src/components/excel-app-ia/", import.meta.url);
    for (const file of readdirSync(dir, { recursive: true }) as string[]) {
      if (!/\.tsx?$/.test(file)) continue;
      const src = readFileSync(new URL(file, dir), "utf8");
      expect(src, file).not.toMatch(MINIMIZING);
    }
  });

  it("el stack incluye las plataformas y agentes del curso", () => {
    expect(content.STACK.map((t) => t.name)).toEqual(["Lovable", "Supabase", "GitHub", "Vercel"]);
    expect(content.STACK[0]).toMatchObject({ alt: "Claude Design" });
    expect(content.AGENTS.map((a) => a.name)).toEqual(["Claude Code", "Codex", "Gemini"]);
  });

  it("las maquetas van rotuladas como ejemplo ilustrativo", () => {
    const dir = new URL("../src/components/excel-app-ia/", import.meta.url);
    const frame = readFileSync(new URL("mockups/frame.tsx", dir), "utf8");
    expect(frame).toContain('ILLUSTRATIVE_LABEL = "Ejemplo ilustrativo"');
    expect(frame).toMatch(/\{ILLUSTRATIVE_LABEL\}/);
    for (const f of ["mockups/ExcelToApp.tsx", "ExcelAppShowcase.tsx"]) {
      expect(readFileSync(new URL(f, dir), "utf8"), f).toContain("<BrowserFrame");
    }
  });

  it("las horas por fase suman las 24 anunciadas", () => {
    expect(content.PHASES.reduce((s, p) => s + p.hours, 0)).toBe(content.COURSE.hours);
  });
});
