import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  userName: string;
  companyName: string;
  userEmail: string;
  userPhone: string;
  diagnosticResult: string;
  maturityLevel: string;
  maturityPercentage: number;
  criticalAreas: string[];
  recommendedService: string;
  urgencia: string;
}

function buildUserEmail(p: EmailPayload): string {
  const criticalList = p.criticalAreas
    .map((a) => `<li style="margin-bottom:6px;color:#C8D6E5;">${a}</li>`)
    .join("");

  const diagLines = p.diagnosticResult
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("- ")) {
        return `<p style="margin:6px 0;padding-left:14px;color:#C8D6E5;line-height:1.7;font-size:15px;">· ${line.slice(2)}</p>`;
      }
      if (line.startsWith("**") || line.match(/^[A-ZÁÉÍÓÚ][^:]{2,30}:/)) {
        return `<p style="margin:20px 0 6px;font-weight:700;color:#F7F8FA;font-size:15px;">${line.replace(/\*\*/g, "")}</p>`;
      }
      return `<p style="margin:6px 0;color:#C8D6E5;line-height:1.7;font-size:15px;">${line}</p>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#060B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#060B14;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;text-align:center;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#00BCD4;letter-spacing:2px;">TIDEO</p>
          <p style="margin:4px 0 0;font-size:12px;color:#607D8B;letter-spacing:1px;">TECH &amp; STRATEGY</p>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding-bottom:8px;">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#F7F8FA;line-height:1.3;">
            ${p.userName}, este es tu diagnóstico de madurez digital
          </h1>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <p style="margin:0;font-size:14px;color:#607D8B;">
            Basado en las respuestas de tu evaluación — ${p.companyName}
          </p>
        </td></tr>

        <!-- Maturity card -->
        <tr><td style="padding-bottom:32px;">
          <div style="background:#1A2B4A;border-radius:8px;border-left:4px solid #00BCD4;padding:20px 24px;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">
              NIVEL DE MADUREZ DIGITAL
            </p>
            <p style="margin:0;font-size:28px;font-weight:800;color:#00BCD4;line-height:1.2;">${p.maturityLevel}</p>
            <p style="margin:6px 0 0;font-size:16px;color:#F7F8FA;">${p.maturityPercentage}%</p>
          </div>
        </td></tr>

        <!-- Critical areas -->
        ${p.criticalAreas.length ? `
        <tr><td style="padding-bottom:24px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#607D8B;text-transform:uppercase;">Áreas críticas identificadas</p>
          <ul style="margin:0;padding-left:0;list-style:none;">${criticalList}</ul>
        </td></tr>` : ""}

        <!-- Diagnostic content -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #1A2B4A;">
          ${diagLines}
        </td></tr>

        <!-- CTA block -->
        <tr><td style="padding:32px 0;">
          <div style="background:#1A2B4A;border-radius:8px;padding:32px;text-align:center;">
            <p style="margin:0 0 10px;font-size:18px;font-weight:700;color:#F7F8FA;">El primer paso no cuesta nada.</p>
            <p style="margin:0 0 24px;font-size:14px;color:#607D8B;line-height:1.6;">
              Cuéntanos cómo debe operar tu negocio y construimos el sistema que lo haga posible.
            </p>
            <a href="https://www.tideo.tech/contacto"
              style="display:inline-block;background:#00BCD4;color:#060B14;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:6px;">
              Agenda tu auditoría gratuita →
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="border-top:1px solid #1A2B4A;padding-top:24px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#607D8B;">© 2026 TIDEO Tech &amp; Strategy — www.tideo.tech</p>
          <p style="margin:0;font-size:11px;color:#607D8B;">
            Recibiste este correo porque completaste el diagnóstico de madurez digital en tideo.tech
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildInternalEmail(p: EmailPayload): string {
  const criticalStr = p.criticalAreas.join(", ") || "—";

  const diagLines = p.diagnosticResult
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("**") || line.match(/^[A-ZÁÉÍÓÚ][^:]{2,30}:/)) {
        return `<p style="margin:10px 0 4px;font-weight:700;color:#060B14;font-size:14px;">${line.replace(/\*\*/g, "")}</p>`;
      }
      return `<p style="margin:4px 0;color:#374151;line-height:1.7;font-size:14px;">${line}</p>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Title -->
        <tr><td style="background:#ffffff;border-radius:8px 8px 0 0;padding:28px 32px 16px;border-bottom:2px solid #00BCD4;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">TIDEO — Diagnóstico Web</p>
          <h1 style="margin:0;font-size:20px;font-weight:700;color:#060B14;">Nuevo lead desde el diagnóstico web</h1>
        </td></tr>

        <!-- Lead table -->
        <tr><td style="background:#ffffff;padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:40%;font-size:13px;font-weight:600;color:#607D8B;">Nombre</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${p.userName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Empresa</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${p.companyName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Teléfono</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${p.userPhone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Correo</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">
                <a href="mailto:${p.userEmail}" style="color:#00BCD4;text-decoration:none;">${p.userEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Madurez</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${p.maturityLevel} — ${p.maturityPercentage}%</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Urgencia</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${p.urgencia}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#607D8B;">Servicio recomendado</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:700;color:#00BCD4;">${p.recommendedService}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:13px;font-weight:600;color:#607D8B;">Áreas críticas</td>
              <td style="padding:10px 0;font-size:13px;color:#060B14;">${criticalStr}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Diagnostic result -->
        <tr><td style="padding:0 32px 32px;background:#ffffff;border-radius:0 0 8px 8px;">
          <div style="background:#f8f8f8;border-radius:8px;border-left:4px solid #00BCD4;padding:16px 20px;margin-top:8px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">DIAGNÓSTICO COMPLETO</p>
            ${diagLines}
          </div>
        </td></tr>

        <!-- Footer -->
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
    const p = await req.json() as EmailPayload;
    const apiKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const makeWebhookUrl = Deno.env.get("MAKE_WEBHOOK_URL");

    if (makeWebhookUrl) {
      fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: p.userName,
          companyName: p.companyName,
          userEmail: p.userEmail,
          userPhone: p.userPhone,
          diagnosticResult: p.diagnosticResult,
          maturityLevel: p.maturityLevel,
          maturityPercentage: p.maturityPercentage,
          criticalAreas: p.criticalAreas,
          recommendedService: p.recommendedService,
          urgencia: p.urgencia,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Make webhook error:", err));
    }

    const sendEmail = (payload: {
      from: string;
      to: string | string[];
      subject: string;
      html: string;
    }) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

    const [userRes, internalRes] = await Promise.all([
      sendEmail({
        from: "TIDEO <hola@tideo.tech>",
        to: p.userEmail,
        subject: `${p.userName}, tu diagnóstico de madurez digital está aquí`,
        html: buildUserEmail(p),
      }),
      sendEmail({
        from: "TIDEO <hola@tideo.tech>",
        to: "cristhian@tideo.tech",
        subject: `Nuevo lead — ${p.companyName} | ${p.maturityLevel}`,
        html: buildInternalEmail(p),
      }),
    ]);

    if (!userRes.ok || !internalRes.ok) {
      const userBody = await userRes.text().catch(() => "");
      const internalBody = await internalRes.text().catch(() => "");
      console.error("Resend error — user:", userRes.status, userBody);
      console.error("Resend error — internal:", internalRes.status, internalBody);
    }
  } catch (err) {
    console.error("send-diagnostic-email error:", err);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
