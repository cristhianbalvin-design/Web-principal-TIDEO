import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {
  clientIp,
  clip,
  corsFor,
  EMAIL_RE,
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

    return json({ success: true, data: responseData }, 200, corsHeaders);
  } catch (error) {
    console.error("Error no controlado:", error);
    return json({ error: "Bad Request" }, 400, corsHeaders);
  }
});
