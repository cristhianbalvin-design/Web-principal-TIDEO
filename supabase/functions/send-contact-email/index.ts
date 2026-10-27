import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {
  clientIp,
  clip,
  corsFor,
  EMAIL_RE,
  escapeHtml,
  json,
  originRejected,
  rateLimited,
  readJson,
} from "../_shared/guard.ts";

interface ContactPayload {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  whatsapp: string;
  rubro: string;
  proceso: string;
  herramientas: string;
  urgencia: string;
  servicio?: string;
  website?: string;
}

function buildInternalEmail(p: ContactPayload): string {
  const rows = [
    ["Nombre", p.nombre],
    ["Empresa", p.empresa],
    ["Cargo", p.cargo || "—"],
    ["Correo", p.correo],
    ["WhatsApp", p.whatsapp || "—"],
    ["Rubro", p.rubro || "—"],
    ["Urgencia", p.urgencia],
    ["Servicio de interés", p.servicio || "—"],
  ].map(([label, value]) => [label, escapeHtml(value)]);

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:40%;font-size:13px;font-weight:600;color:#607D8B;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td style="background:#ffffff;border-radius:8px 8px 0 0;padding:28px 32px 16px;border-bottom:2px solid #00BCD4;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">TIDEO — Formulario de Contacto</p>
          <h1 style="margin:0;font-size:20px;font-weight:700;color:#060B14;">Nuevo mensaje desde tideo.tech</h1>
        </td></tr>

        <tr><td style="background:#ffffff;padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
            ${tableRows}
          </table>
        </td></tr>

        <tr><td style="padding:0 32px 32px;background:#ffffff;border-radius:0 0 8px 8px;">
          <div style="background:#f8f8f8;border-radius:8px;border-left:4px solid #00BCD4;padding:16px 20px;margin-top:8px;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">Proceso a mejorar</p>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${escapeHtml(p.proceso)}</p>
          </div>
          ${p.herramientas ? `
          <div style="background:#f8f8f8;border-radius:8px;border-left:4px solid #607D8B;padding:16px 20px;margin-top:12px;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">Herramientas actuales</p>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${escapeHtml(p.herramientas)}</p>
          </div>` : ""}
        </td></tr>

        <tr><td style="padding:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">TIDEO Tech &amp; Strategy — Notificación interna</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail(p: ContactPayload): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#060B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#060B14;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding-bottom:24px;text-align:center;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#00BCD4;letter-spacing:2px;">TIDEO</p>
          <p style="margin:4px 0 0;font-size:12px;color:#607D8B;letter-spacing:1px;">TECH &amp; STRATEGY</p>
        </td></tr>
        <tr><td style="background:#1A2B4A;border-radius:8px;padding:28px 32px;">
          <h1 style="margin:0 0 12px;font-size:20px;color:#F7F8FA;">${escapeHtml(p.nombre)}, recibimos tu mensaje</h1>
          <p style="margin:0 0 12px;font-size:15px;color:#C8D6E5;line-height:1.7;">
            Gracias por contarnos qué proceso quieres mejorar${p.empresa ? ` en ${escapeHtml(p.empresa)}` : ""}.
            Lo revisaremos y te escribiremos a la brevedad para coordinar la conversación inicial.
          </p>
          <p style="margin:0;font-size:13px;color:#607D8B;line-height:1.6;">
            Si prefieres hablar ahora, escríbenos a contacto@tideo.tech o por WhatsApp al +51 919 102 556.
          </p>
        </td></tr>
        <tr><td style="padding:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#607D8B;">TIDEO Tech &amp; Strategy — www.tideo.tech</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  const cors = corsFor(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405, cors);
  if (originRejected(req)) return json({ error: "Forbidden" }, 403, cors);
  if (rateLimited(`contact:${clientIp(req)}`, 5, 10 * 60_000)) {
    return json({ error: "Too Many Requests" }, 429, cors);
  }

  let raw: ContactPayload;
  try {
    raw = await readJson<ContactPayload>(req);
  } catch (e) {
    const big = e instanceof Error && e.message === "too_large";
    return json({ error: big ? "Payload Too Large" : "Bad Request" }, big ? 413 : 400, cors);
  }

  // Honeypot: finge éxito sin enviar nada.
  if (raw.website) return json({ success: true }, 200, cors);

  const p: ContactPayload = {
    nombre: clip(raw.nombre, 200),
    empresa: clip(raw.empresa, 200),
    cargo: clip(raw.cargo, 120),
    correo: clip(raw.correo, 200),
    whatsapp: clip(raw.whatsapp, 50),
    rubro: clip(raw.rubro, 120),
    proceso: clip(raw.proceso, 4000),
    herramientas: clip(raw.herramientas, 2000),
    urgencia: clip(raw.urgencia, 120),
    servicio: clip(raw.servicio, 160),
  };
  if (!p.nombre || !p.empresa || !p.proceso || !EMAIL_RE.test(p.correo)) {
    return json({ error: "Datos inválidos" }, 400, cors);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("send-contact-email: falta RESEND_API_KEY");
    return json({ error: "Email no configurado" }, 502, cors);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: "TIDEO <hola@tideo.tech>",
        to: "cristhian@tideo.tech",
        reply_to: p.correo,
        subject: `Nuevo contacto — ${p.nombre} | ${p.empresa}`.replace(/[\r\n]+/g, " "),
        html: buildInternalEmail(p),
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return json({ error: "No se pudo enviar el mensaje" }, 502, cors);
    }
  } catch (err) {
    console.error("send-contact-email error:", err);
    return json({ error: "No se pudo enviar el mensaje" }, 502, cors);
  }

  // Confirmación a quien escribió. Es secundaria: si falla, el aviso interno ya salió.
  try {
    const conf = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: "TIDEO <hola@tideo.tech>",
        to: p.correo,
        reply_to: "contacto@tideo.tech",
        subject: "Recibimos tu mensaje — TIDEO Tech & Strategy",
        html: buildConfirmationEmail(p),
      }),
    });
    if (!conf.ok) console.error("Resend (confirmación) error:", conf.status, await conf.text());
  } catch (err) {
    console.error("send-contact-email (confirmación) error:", err);
  }

  return json({ success: true }, 200, cors);
});
