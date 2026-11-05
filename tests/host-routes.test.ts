import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { KNOWN_PATHS } from "../src/lib/agent-content";
import {
  LANDING_HOSTS,
  fromLandingPath,
  isUnderLanding,
  landingForHost,
  toLandingPath,
} from "../src/lib/host-routes";

describe("LANDING_HOSTS (integridad del mapa)", () => {
  it("cada host es un subdominio de tideo.tech, en minúsculas y sin www", () => {
    for (const { host } of LANDING_HOSTS) {
      expect(host).toMatch(/^[a-z0-9-]+\.tideo\.tech$/);
      expect(host.startsWith("www.")).toBe(false);
    }
  });

  it("cada ruta es de un solo segmento (/slug) y no se repite host ni ruta", () => {
    for (const { path } of LANDING_HOSTS) expect(path).toMatch(/^\/[a-z0-9-]+$/);
    const hosts = LANDING_HOSTS.map((l) => l.host);
    const paths = LANDING_HOSTS.map((l) => l.path);
    expect(new Set(hosts).size).toBe(hosts.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("cada landing está en KNOWN_PATHS (si no, los agentes recibirían 404 en Markdown)", () => {
    for (const { path } of LANDING_HOSTS) {
      expect((KNOWN_PATHS as readonly string[]).includes(path)).toBe(true);
    }
  });

  it("cada landing está registrada en `pages` de vite.config.ts (si no, no se prerenderiza)", () => {
    const viteConfig = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");
    for (const { path } of LANDING_HOSTS) {
      expect(viteConfig).toContain(`{ path: "${path}" }`);
    }
  });
});

describe("landingForHost", () => {
  it.each([
    ["opera.tideo.tech", "/opera"],
    ["www.opera.tideo.tech", "/opera"],
    ["powerbi-ia.tideo.tech", "/powerbi-ia"],
    ["www.powerbi-ia.tideo.tech", "/powerbi-ia"],
    ["excel-app.tideo.tech", "/excel-app-ia"],
    ["www.excel-app.tideo.tech", "/excel-app-ia"],
  ])("%s → %s", (host, landing) => {
    expect(landingForHost(host)).toBe(landing);
  });

  it.each(["www.tideo.tech", "tideo.tech", "otro.tideo.tech", "opera.tideo.tech.evil.com", ""])(
    "%j es el sitio principal (null)",
    (host) => {
      expect(landingForHost(host)).toBeNull();
    },
  );
});

describe("helpers de ruta", () => {
  it("isUnderLanding compara por segmento", () => {
    expect(isUnderLanding("/opera", "/opera")).toBe(true);
    expect(isUnderLanding("/opera", "/opera/")).toBe(true);
    expect(isUnderLanding("/opera", "/opera/metalmecanica")).toBe(true);
    expect(isUnderLanding("/opera", "/")).toBe(false);
    expect(isUnderLanding("/opera", "/operaciones")).toBe(false);
  });

  it("toLandingPath antepone la landing", () => {
    expect(toLandingPath("/opera", "/")).toBe("/opera");
    expect(toLandingPath("/opera", "/precios")).toBe("/opera/precios");
    expect(toLandingPath("/opera", "/operaciones")).toBe("/opera/operaciones");
  });

  it("fromLandingPath es la inversa de toLandingPath", () => {
    expect(fromLandingPath("/opera", "/opera")).toBe("/");
    expect(fromLandingPath("/opera", "/opera/")).toBe("/");
    expect(fromLandingPath("/opera", "/opera/metalmecanica")).toBe("/metalmecanica");
    for (const p of ["/", "/precios", "/a/b", "/operaciones"]) {
      expect(fromLandingPath("/opera", toLandingPath("/opera", p))).toBe(p);
    }
  });
});
