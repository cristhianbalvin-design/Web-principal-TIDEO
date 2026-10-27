import { describe, expect, it } from "vitest";
import { operaUrl, powerbiUrl, trackedUrl } from "../src/lib/site";

describe("enlaces con UTM entre subdominios", () => {
  it("operaUrl agrega utm_source, utm_medium y utm_campaign", () => {
    const u = new URL(operaUrl("home_hero"));
    expect(u.origin).toBe("https://opera.tideo.tech");
    expect(u.searchParams.get("utm_source")).toBe("tideo.tech");
    expect(u.searchParams.get("utm_medium")).toBe("web");
    expect(u.searchParams.get("utm_campaign")).toBe("home_hero");
  });

  it("conserva la subpágina", () => {
    const u = new URL(operaUrl("home_card_opera_metalmecanica", "metalmecanica"));
    expect(u.pathname).toBe("/metalmecanica");
  });

  it("powerbiUrl apunta al subdominio de Power BI", () => {
    expect(powerbiUrl("x")).toMatch(/^https:\/\/powerbi-ia\.tideo\.tech\/\?/);
  });

  it("trackedUrl no pisa la ruta base", () => {
    expect(trackedUrl("https://a.test/", "", "c")).toBe(
      "https://a.test/?utm_source=tideo.tech&utm_medium=web&utm_campaign=c",
    );
  });
});
