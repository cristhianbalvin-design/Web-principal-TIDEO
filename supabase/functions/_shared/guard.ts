// Utilidades compartidas por las Edge Functions públicas (sin dependencias externas).

const ORIGIN_PATTERNS = [
  /^https:\/\/([a-z0-9-]+\.)?tideo\.tech$/,
  /^https:\/\/web-principal-tideo[a-z0-9-]*\.vercel\.app$/,
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
];

export function isAllowedOrigin(origin: string): boolean {
  return ORIGIN_PATTERNS.some((re) => re.test(origin));
}

/** Cabeceras CORS: solo refleja orígenes permitidos; el resto recibe el origen por defecto. */
export function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const fallback = Deno.env.get("ALLOWED_ORIGIN") ?? "https://www.tideo.tech";
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin : fallback,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    Vary: "Origin",
  };
}

/** Las peticiones desde navegador traen Origin; si viene y no es permitido, se rechaza. */
export function originRejected(req: Request): boolean {
  const origin = req.headers.get("origin");
  return !!origin && !isAllowedOrigin(origin);
}

export function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("cf-connecting-ip") ?? "unknown").trim();
}

// Límite por ventana en memoria. Es "mejor esfuerzo": cada instancia de la función
// lleva su propio contador. Para un límite estricto hace falta Turnstile o una tabla.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return recent.length > max;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export const MAX_BODY_BYTES = 64 * 1024;

/** Lee JSON con tope de tamaño. Lanza "too_large" o "bad_json". */
export async function readJson<T>(req: Request, maxBytes = MAX_BODY_BYTES): Promise<T> {
  const text = await req.text();
  if (new TextEncoder().encode(text).length > maxBytes) throw new Error("too_large");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("bad_json");
  }
}

export function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
