import { describe, expect, it } from "vitest";

import { messageWithRef, originFrom, shortCampaign } from "../src/lib/whatsapp-origin";

describe("marca de origen de WhatsApp", () => {
  it("acorta el nombre de campaña de Meta", () => {
    expect(shortCampaign("TIDEO_ACAD_LEADS_PE_202611")).toBe("leads");
    expect(shortCampaign("TIDEO_ACAD_WHATSAPP_PE_25-44_TEST_202611")).toBe("whatsapp-25-44-test");
  });

  it("usa utm_source + campaña corta", () => {
    expect(originFrom("?utm_source=meta&utm_campaign=TIDEO_ACAD_LEADS_PE_202611", "")).toBe(
      "meta-leads",
    );
    expect(originFrom("?utm_source=LinkedIn", "")).toBe("linkedin");
  });

  it("fbclid sin UTM cuenta como meta", () => {
    expect(originFrom("?fbclid=abc", "")).toBe("meta");
  });

  it("sin parámetros usa el dominio de referencia o 'directo'", () => {
    expect(originFrom("", "https://l.instagram.com/")).toBe("instagram");
    expect(originFrom("", "https://www.google.com.pe/")).toBe("google");
    expect(originFrom("", "https://www.tideo.tech/")).toBe("directo");
    expect(originFrom("", "")).toBe("directo");
  });

  it("agrega el código al final del mensaje sin tocar el texto base", () => {
    const base = "Hola TIDEO, quiero información del curso De Excel a tu Propia App con IA.";
    expect(messageWithRef(base, "meta-leads", "flotante")).toBe(
      `${base} [ref: meta-leads/flotante]`,
    );
  });
});
