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
}

export interface SubmitLeadResult {
  success: boolean;
  leadId: string;
  data?: Record<string, unknown>;
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

  // Lectura dinámica de parámetros UTM desde la URL
  let campana = params.campana || "Pendiente";
  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmCampaign = urlParams.get("utm_campaign");
      if (utmCampaign) {
        campana = utmCampaign;
      }
    } catch {
      // ignore
    }
  }

  const canal = params.canal || params.fuente;
  const tipo_documento = params.tipo_documento || (params.empresa ? "RUC" : "DNI");

  const payload = {
    ...params,
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
