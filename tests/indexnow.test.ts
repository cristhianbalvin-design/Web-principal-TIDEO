import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { buildPayloads, findKey, urlsFromSitemap } from "../scripts/indexnow.mjs";

describe("IndexNow", () => {
  it("la clave es de 32 hex y su archivo contiene exactamente la clave", () => {
    const key = findKey();
    expect(key).toMatch(/^[0-9a-f]{32}$/);
    expect(readFileSync(new URL(`../public/${key}.txt`, import.meta.url), "utf8")).toBe(key);
  });

  it("agrupa las URLs del sitemap en un envío por host", () => {
    const xml = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
    const payloads = buildPayloads(urlsFromSitemap(xml), "k".repeat(32));
    const hosts = payloads.map((p) => p.host).sort();
    expect(hosts).toEqual(["opera.tideo.tech", "powerbi-ia.tideo.tech", "www.tideo.tech"]);
    for (const p of payloads) {
      expect(p.keyLocation).toBe(`https://${p.host}/${"k".repeat(32)}.txt`);
      for (const u of p.urlList) expect(new URL(u).host).toBe(p.host);
    }
    expect(payloads.find((p) => p.host === "www.tideo.tech")?.urlList).toHaveLength(6);
  });
});
