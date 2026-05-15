import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  ];

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
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${p.proceso}</p>
          </div>
          ${p.herramientas ? `
          <div style="background:#f8f8f8;border-radius:8px;border-left:4px solid #607D8B;padding:16px 20px;margin-top:12px;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">Herramientas actuales</p>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${p.herramientas}</p>
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const p = await req.json() as ContactPayload;
    const apiKey = Deno.env.get("RESEND_API_KEY") ?? "";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "TIDEO <hola@tideo.tech>",
        to: "cristhian@tideo.tech",
        reply_to: p.correo,
        subject: `Nuevo contacto — ${p.nombre} | ${p.empresa}`,
        html: buildInternalEmail(p),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error:", res.status, body);
    }
  } catch (err) {
    console.error("send-contact-email error:", err);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
