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

interface LeadPayload {
  id_lead?: string;
  nombre?: string;
  nombre_contacto?: string;
  empresa?: string;
  nombre_empresa?: string;
  correo?: string;
  email?: string;
  telefono?: string;
  cargo?: string;
  canal?: string;
  fuente?: string;
  campaña?: string;
  campana?: string;
  campana_id?: string;
  notas?: string;
  lead_ref?: string;
  industria?: string;
  urgencia?: string;
  presupuesto_mayor_7000?: string;
  tipo_documento?: string;
  registrado_desde?: string;
  /** Honeypot: los humanos lo dejan vacío. */
  website?: string;
}

const BRAND_ROW = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:40%;font-size:13px;font-weight:600;color:#607D8B;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#060B14;">${escapeHtml(value) || "—"}</td>
  </tr>`;

function internalLeadEmail(d: Record<string, string>): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:28px 32px;">
    <tr><td>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#607D8B;text-transform:uppercase;">TIDEO — OPERA</p>
      <h1 style="margin:0 0 16px;font-size:20px;color:#060B14;">Nuevo lead desde la landing de OPERA</h1>
      <table width="100%" style="border-collapse:collapse;">
        ${BRAND_ROW("Estado", d.estado)}
        ${BRAND_ROW("Nombre", d.nombre)}
        ${BRAND_ROW("Empresa", d.empresa)}
        ${BRAND_ROW("Correo", d.email)}
        ${BRAND_ROW("Teléfono", d.telefono)}
        ${BRAND_ROW("Tipo de operación", d.industria)}
        ${BRAND_ROW("Presupuesto > US$7,000", d.presupuesto)}
        ${BRAND_ROW("Plazo (urgencia)", d.urgencia)}
        ${BRAND_ROW("Campaña", d.campana)}
        ${BRAND_ROW("Notas", d.notas)}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function confirmationLeadEmail(nombre: string): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#060B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" style="padding:40px 20px;background:#060B14;"><tr><td align="center">
    <table width="100%" style="max-width:560px;">
      <tr><td style="padding-bottom:24px;text-align:center;">
        <p style="margin:0;font-size:22px;font-weight:800;color:#00BCD4;letter-spacing:2px;">OPERA</p>
        <p style="margin:4px 0 0;font-size:12px;color:#607D8B;letter-spacing:1px;">BY TIDEO TECH &amp; STRATEGY</p>
      </td></tr>
      <tr><td style="background:#1A2B4A;border-radius:8px;padding:28px 32px;">
        <h1 style="margin:0 0 12px;font-size:20px;color:#F7F8FA;">${escapeHtml(nombre)}, recibimos tus datos</h1>
        <p style="margin:0 0 12px;font-size:15px;color:#C8D6E5;line-height:1.7;">
          Gracias por tu interés en OPERA. Evaluaremos junto contigo si es el fit correcto para tu operación.
          Si ya reservaste tu sesión estratégica, recibirás la confirmación del calendario en este mismo correo.
        </p>
        <p style="margin:0;font-size:13px;color:#607D8B;line-height:1.6;">
          ¿Prefieres hablar ahora? Escríbenos a contacto@tideo.tech o por WhatsApp al +51 919 102 556.
        </p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

/** Avisos por correo de los leads de OPERA. Es secundario: nunca debe hacer fallar el registro. */
async function notifyOperaLead(d: Record<string, string>, qualified: boolean): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("submit-lead: falta RESEND_API_KEY, no se enviaron avisos");
    return;
  }
  const send = (to: string, subject: string, html: string, replyTo?: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: "TIDEO <hola@tideo.tech>",
        to,
        subject: subject.replace(/[\r\n]+/g, " "),
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    }).then(async (res) => {
      if (!res.ok) console.error(`Resend error (${to}):`, res.status, await res.text());
    });

  const jobs = [
    send(
      "cristhian@tideo.tech",
      `Nuevo lead OPERA${qualified ? "" : " (descartado)"} — ${d.nombre} | ${d.empresa}`,
      internalLeadEmail(d),
      d.email,
    ),
  ];
  // La confirmación solo va a quienes califican; a los descartados ya se les muestra un mensaje en la web.
  if (qualified) {
    jobs.push(
      send(d.email, "Recibimos tus datos — OPERA by TIDEO", confirmationLeadEmail(d.nombre), "contacto@tideo.tech"),
    );
  }
  await Promise.allSettled(jobs);
}

serve(async (req) => {
  const corsHeaders = corsFor(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405, corsHeaders);
    if (originRejected(req)) return json({ error: "Forbidden" }, 403, corsHeaders);

    const ip = clientIp(req);
    if (rateLimited(`lead:${ip}`, 5, 10 * 60_000)) {
      return json({ error: "Too Many Requests" }, 429, corsHeaders);
    }

    let raw: LeadPayload;
    try {
      raw = await readJson<LeadPayload>(req);
    } catch (e) {
      const tooLarge = e instanceof Error && e.message === "too_large";
      return json({ error: tooLarge ? "Payload Too Large" : "Bad Request" }, tooLarge ? 413 : 400, corsHeaders);
    }

    // Honeypot: responde como si hubiera funcionado, sin enviar nada al ERP.
    if (raw.website) return json({ success: true, data: {} }, 200, corsHeaders);

    const email = clip(raw.email || raw.correo, 200);
    const nombreContacto = clip(raw.nombre_contacto || raw.nombre, 200);
    if (!nombreContacto || !EMAIL_RE.test(email)) {
      return json({ error: "Datos inválidos" }, 400, corsHeaders);
    }
    if (rateLimited(`lead-email:${email.toLowerCase()}`, 3, 10 * 60_000)) {
      return json({ error: "Too Many Requests" }, 429, corsHeaders);
    }

    const body: LeadPayload = {
      ...raw,
      email,
      correo: undefined,
      nombre_contacto: nombreContacto,
      nombre: undefined,
      empresa: clip(raw.empresa, 200),
      nombre_empresa: clip(raw.nombre_empresa, 200),
      telefono: clip(raw.telefono, 50),
      cargo: clip(raw.cargo, 120),
      industria: clip(raw.industria, 120),
      notas: clip(raw.notas, 4000),
      campana: clip(raw.campana || raw.campana_id || raw.campaña, 120),
      campana_id: undefined,
      campaña: undefined,
    };

    const ERP_SUPABASE_URL = Deno.env.get("ERP_SUPABASE_URL");
    const ERP_API_KEY = Deno.env.get("ERP_API_KEY");

    if (!ERP_SUPABASE_URL || !ERP_API_KEY) {
      console.error("Faltan variables de entorno para integración con ERP");
      return json({ error: "Internal Server Error" }, 500, corsHeaders);
    }

    let estado = "nuevo";
    let motivo_descarte = undefined;

    if (body.presupuesto_mayor_7000 === "No") {
      estado = "descartado";
      motivo_descarte = "presupuesto_insuficiente";
    }

    // Generar id_lead con el formato lead_<timestamp>_<random> si no viene en el body
    const id_lead =
      body.id_lead || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const fuente = body.fuente || body.canal || "powerbi_ia_landing";
    const campana = body.campana || body.campana_id || body.campaña || "Pendiente";
    const tipo_documento =
      body.tipo_documento || (body.empresa || body.nombre_empresa ? "RUC" : "DNI");

    // Mapeo hacia el formato que espera api-prospectos (tenant emp_20609996464)
    const erpPayload: Record<string, unknown> = {
      id_lead,
      nombre_contacto: body.nombre_contacto || body.nombre,
      email: body.email || body.correo,
      telefono: body.telefono,
      cargo: body.cargo,
      fuente: fuente,
      registrado_desde: body.registrado_desde || "api",
      tipo_documento: tipo_documento,
      notas: body.notas,
      campana_id: campana,
      campana: campana,
      industria: body.industria,
      urgencia: body.urgencia || "media",
      estado: estado,
      motivo_descarte: motivo_descarte,
    };

    // Solo incluir nombre_empresa si existe (persona jurídica)
    if (body.nombre_empresa || body.empresa) {
      erpPayload.nombre_empresa = body.nombre_empresa || body.empresa;
    }

    // Llamada al ERP: endpoint api-prospectos
    const response = await fetch(`${ERP_SUPABASE_URL}/functions/v1/api-prospectos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ERP_API_KEY,
      },
      body: JSON.stringify(erpPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al enviar lead al ERP:", response.status, errorText);
      // No exponer el detalle interno del ERP al cliente
      return json({ error: "Error al procesar el prospecto" }, 500, corsHeaders);
    }

    // Intentar extraer JSON de la respuesta del ERP
    let responseData = {};
    try {
      responseData = await response.json();
    } catch (e) {
      console.error("No se pudo parsear el JSON del ERP:", e);
    }

    if (fuente === "opera_landing") {
      try {
        await notifyOperaLead(
          {
            estado,
            nombre: body.nombre_contacto ?? "",
            empresa: body.nombre_empresa || body.empresa || "",
            email: body.email ?? "",
            telefono: body.telefono ?? "",
            industria: body.industria ?? "",
            presupuesto: clip(body.presupuesto_mayor_7000, 40),
            urgencia: clip(body.urgencia, 40),
            campana,
            notas: body.notas ?? "",
          },
          estado !== "descartado",
        );
      } catch (err) {
        console.error("submit-lead: error enviando avisos:", err);
      }
    }

    return json({ success: true, data: responseData }, 200, corsHeaders);
  } catch (error) {
    console.error("Error no controlado:", error);
    return json({ error: "Bad Request" }, 400, corsHeaders);
  }
});
