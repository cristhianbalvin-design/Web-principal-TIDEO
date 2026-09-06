import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "https://www.tideo.tech";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadPayload {
  nombre?: string;
  empresa?: string;
  correo?: string;
  telefono?: string;
  cargo?: string;
  canal?: string;
  campaña?: string;
  notas?: string;
  lead_ref?: string;
}

serve(async (req) => {
  // Manejo de preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: LeadPayload = await req.json();

    const ERP_SUPABASE_URL = Deno.env.get("ERP_SUPABASE_URL");
    const ERP_API_KEY = Deno.env.get("ERP_API_KEY");

    if (!ERP_SUPABASE_URL || !ERP_API_KEY) {
      console.error("Faltan variables de entorno para integración con ERP");
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mapeo hacia el formato que espera api-prospectos
    const erpPayload = {
      nombre_contacto: body.nombre,
      nombre_empresa: body.empresa,
      email: body.correo,
      telefono: body.telefono,
      cargo: body.cargo,
      fuente: body.canal,
      notas: body.notas,
      campana_id: body.campaña,
    };

    // Llamada al ERP
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
      return new Response(JSON.stringify({ error: "Error al procesar el prospecto" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error no controlado:", error);
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
