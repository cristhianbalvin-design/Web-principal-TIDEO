/**
 * Marca de origen en los botones de WhatsApp.
 *
 * Problema que resuelve: los chats que llegan con el mensaje prellenado de la landing no dicen
 * de dónde vino la persona (anuncio, Instagram orgánico, Google, enlace directo…). Aquí se
 * agrega al final del mensaje un código corto, p. ej. «[ref: meta-leads/barra-fija]», que
 * TIDEO ve en el chat al recibirlo.
 *
 * Reglas:
 * - Sin datos personales: solo UTM, el dominio de referencia y el nombre del botón.
 * - El texto visible de la página no cambia; el código va solo dentro del mensaje.
 * - El href renderizado en el servidor queda igual (sin código) para no romper la hidratación;
 *   el código se agrega en el clic, antes de que el navegador abra el enlace.
 */

const STORAGE_KEY = "tideo_wa_origin";

/** Nombres de botón permitidos (aparecen en el mensaje y en el píxel). */
export type WhatsAppButton =
  "faq" | "pregunta-proyecto" | "form-exito" | "form-error" | "flotante" | "footer";

/** Acorta el nombre de campaña: TIDEO_ACAD_LEADS_PE_202611 → "leads". */
export function shortCampaign(campaign: string): string {
  return campaign
    .toLowerCase()
    .replace(/^tideo_/, "")
    .replace(/^acad_/, "")
    .replace(/_pe(?=_|$)/g, "")
    .replace(/_\d{6}$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

const REFERRER_SOURCES: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook"],
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)youtube\.com$/, "youtube"],
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt"],
];

/**
 * Origen de la visita, en orden de prioridad:
 * 1) utm_source (+ campaña corta)  2) fbclid → "meta"  3) dominio de referencia  4) "directo".
 */
export function originFrom(search: string, referrer: string): string {
  const params = new URLSearchParams(search);
  const source = (params.get("utm_source") ?? "").trim().toLowerCase();
  if (source) {
    const clean = source
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 20);
    const campaign = shortCampaign(params.get("utm_campaign") ?? "");
    return campaign ? `${clean}-${campaign}` : clean;
  }
  if (params.has("fbclid")) return "meta";
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (host.endsWith("tideo.tech")) return "directo";
      for (const [re, name] of REFERRER_SOURCES) if (re.test(host)) return name;
      return host.replace(/^www\./, "").slice(0, 30);
    } catch {
      // referrer inválido: se trata como directo
    }
  }
  return "directo";
}

/** Mensaje con el código de origen al final. */
export function messageWithRef(message: string, origin: string, button: WhatsAppButton): string {
  return `${message} [ref: ${origin}/${button}]`;
}

/**
 * Guarda el origen de la primera página vista en la sesión, para no perderlo si la persona
 * navega dentro del sitio. Un origen con UTM o fbclid reemplaza a uno "directo".
 */
export function captureOrigin(): string {
  if (typeof window === "undefined") return "directo";
  const current = originFrom(window.location.search, document.referrer);
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved && (current === "directo" || saved === current)) return saved;
    window.sessionStorage.setItem(STORAGE_KEY, current);
  } catch {
    // sessionStorage puede no estar disponible (modo privado, iframes): se usa el actual
  }
  return current;
}
