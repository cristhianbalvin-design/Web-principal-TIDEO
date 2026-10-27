export interface SubmitLeadParams {
  nombre: string;
  correo: string;
  telefono?: string;
  empresa?: string;
  fuente: "opera_landing" | "powerbi_ia_landing" | string;
  canal?: string;
  tipo_documento?: "DNI" | "RUC" | string;
  campana?: string;
  notas?: string;
  cargo?: string;
  industria?: string;
  urgencia?: string;
  presupuesto_mayor_7000?: string;
  /** Campo trampa (honeypot): debe ir vacío; los bots suelen rellenarlo. */
  website?: string;
}

export interface SubmitLeadResult {
  success: boolean;
  leadId: string;
  data?: Record<string, unknown>;
}

const ATTRIBUTION_KEY = "tideo:attribution";

export interface Attribution {
  campaign?: string;
  source?: string;
  medium?: string;
  content?: string;
}

function readUtm(search: string): Attribution {
  const q = new URLSearchParams(search);
  const out: Attribution = {};
  const campaign = q.get("utm_campaign");
  const source = q.get("utm_source");
  const medium = q.get("utm_medium");
  const content = q.get("utm_content");
  if (campaign) out.campaign = campaign;
  if (source) out.source = source;
  if (medium) out.medium = medium;
  if (content) out.content = content;
  return out;
}

/**
 * Guarda la atribución (UTM) de la primera página con parámetros, para no perderla
 * si el visitante pasa de la landing de OPERA a /metalmecanica antes de enviar el formulario.
 * Se llama una vez al montar la app.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const fresh = readUtm(window.location.search);
    if (Object.keys(fresh).length === 0) return;
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fresh));
  } catch {
    // sessionStorage puede no estar disponible (modo privado, bloqueo de cookies)
  }
}

/** Atribución vigente: la de la URL actual si trae UTM; si no, la guardada en la sesión. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const fromUrl = readUtm(window.location.search);
    if (Object.keys(fromUrl).length > 0) return fromUrl;
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return stored ? (JSON.parse(stored) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Solo utm_campaign viaja como campo propio al CRM; el resto va en notas. */
function attributionNote(a: Attribution): string {
  const parts = [
    a.source && `utm_source=${a.source}`,
    a.medium && `utm_medium=${a.medium}`,
    a.content && `utm_content=${a.content}`,
  ].filter(Boolean);
  return parts.length ? `Atribución: ${parts.join(", ")}` : "";
}

export function generateLeadId(): string {
  const now = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `lead_${now}_${randomStr}`;
}

export async function submitLead(params: SubmitLeadParams): Promise<SubmitLeadResult> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Configuración del servidor no disponible en este momento.");
  }

  // Generar ID de lead con el patrón establecido: lead_<timestamp>_<random>
  const id_lead = generateLeadId();

  // Atribución: UTM de la URL o, si el visitante navegó entre páginas, la guardada al llegar.
  const attribution = getAttribution();
  const campana = attribution.campaign || params.campana || "Pendiente";
  const notas = [params.notas, attributionNote(attribution)].filter(Boolean).join(" | ");

  const canal = params.canal || params.fuente;
  const tipo_documento = params.tipo_documento || (params.empresa ? "RUC" : "DNI");

  const payload = {
    ...params,
    notas,
    id_lead,
    canal,
    fuente: params.fuente,
    campana,
    campaña: campana,
    campana_id: campana,
    registrado_desde: "api",
    tipo_documento,
  };

  const response = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorDetail = "No se pudo registrar la información en el sistema.";
    try {
      const errJson = await response.json();
      if (errJson.error) errorDetail = errJson.error;
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  const json = await response.json();
  const returnedLeadId = json.data?.lead_id || json.data?.id_lead || id_lead;

  return {
    success: true,
    leadId: returnedLeadId,
    data: json.data,
  };
}
