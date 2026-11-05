import { AI_EXPERIENCE, COURSE, type AiExperience } from "@/content/excel-app-ia";

export interface ExcelAppFormState {
  nombre: string;
  correo: string;
  whatsapp: string;
  ocupacion: string;
  problema: string;
  experiencia_ia: AiExperience | "";
  disponibilidad: "si" | "consultar" | "";
  acepta_datos: boolean;
  acepta_comercial: boolean;
}

/** Notas que llegan al CRM: todo lo que el formulario pregunta y no tiene campo propio. */
export function buildLeadNotes(f: ExcelAppFormState): string {
  const exp = AI_EXPERIENCE.find((e) => e.value === f.experiencia_ia)?.label ?? "Sin indicar";
  return [
    `Curso: ${COURSE.name} (${COURSE.program} · ${COURSE.level}, ${COURSE.cohort})`,
    `Proceso a convertir en app: ${f.problema.trim()}`,
    `Experiencia con IA: ${exp}`,
    `Disponibilidad 6 fechas: ${f.disponibilidad === "si" ? "Sí" : "Necesita consultar"}`,
    `Acepta comunicaciones comerciales: ${f.acepta_comercial ? "Sí" : "No"}`,
    "Origen: app-ia.tideo.tech",
  ].join(" | ");
}
