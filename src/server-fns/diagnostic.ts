import { createServerFn } from "@tanstack/react-start";

interface DiagInput {
  allAnswers: string;
  moduleScores: Record<string, number>;
  maturityPercentage: number;
  criticalAreas: string[];
  companySizeContext: string;
  userName: string;
  companyName: string;
}

export const getDiagnosis = createServerFn({ method: "POST" })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .handler(async (ctx: any) => {
    const data = ctx.data as DiagInput;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        text: "⚠ SUPABASE_URL y SUPABASE_ANON_KEY no están configuradas en el servidor.",
      };
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/get-diagnostic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { text: `Error ${res.status} al llamar a la Edge Function de diagnóstico.` };
    }

    const json = await res.json() as { diagnostic?: string; error?: string };
    return { text: json.diagnostic ?? json.error ?? "Sin resultado" };
  });
