/**
 * Píxel de Meta (Facebook / Instagram) de TIDEO.
 *
 * El conjunto de datos "TIDEO Tech & Strategy" vive en el portafolio comercial de Meta.
 * El código base se inyecta en el <head> desde __root.tsx, así que cubre todas las páginas
 * (www.tideo.tech y las landings opera.tideo.tech y powerbi-ia.tideo.tech comparten app).
 *
 * Reglas de privacidad: los eventos se envían SIN datos personales (nada del contenido de
 * los formularios). Si se cambia esto, hay que actualizar /privacidad.
 */
export const META_PIXEL_ID = "1680592706979697";

/** Código oficial del píxel (carga fbevents.js, registra el ID y dispara PageView). */
export const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`;

type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    window.fbq("track", event, params);
  } catch {
    // La medición nunca debe romper el sitio.
  }
}

/** Visita de página tras una navegación interna (la primera la dispara el código base). */
export function trackPageView() {
  track("PageView");
}

/** Alguien envió un formulario con éxito. `source` identifica cuál (sin datos personales). */
export function trackLead(source: "contacto" | "diagnostico" | "opera" | "powerbi_ia") {
  track("Lead", { content_name: source });
}
