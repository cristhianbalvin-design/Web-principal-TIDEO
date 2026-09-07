import { SectionHeader } from "@/components/site/SectionHeader";
import { AlertTriangle, Database, Clock, ShieldAlert, FileText } from "lucide-react";

const problems = [
  {
    title: "Información dispersa",
    description: "Operaciones en Excel, mantenimiento en papel y finanzas en un ERP que no conversa con nadie.",
    icon: <Database className="w-5 h-5 text-destructive" />
  },
  {
    title: "Costos que se descubren tarde",
    description: "Te enteras de la rentabilidad real de un proyecto o equipo semanas después del cierre.",
    icon: <Clock className="w-5 h-5 text-destructive" />
  },
  {
    title: "Disponibilidad gestionada a ojo",
    description: "Falta de visibilidad en tiempo real sobre qué equipos están operativos, en falla o en mantenimiento preventivo.",
    icon: <AlertTriangle className="w-5 h-5 text-destructive" />
  },
  {
    title: "HSE como un trámite, no prevención",
    description: "Auditorías lentas, reportes de incidentes que se pierden y falta de trazabilidad en seguridad.",
    icon: <ShieldAlert className="w-5 h-5 text-destructive" />
  },
  {
    title: "Doble digitación y reprocesos",
    description: "El operario anota en papel y un asistente lo pasa a Excel. Pérdida de horas hombre y margen de error humano.",
    icon: <FileText className="w-5 h-5 text-destructive" />
  }
];

export function SectorProblem() {
  return (
    <section className="py-24 md:py-32 bg-surface/30 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El problema del sector"
          title={
            <>
              El divorcio entre la <span className="font-serif-italic text-primary">operación</span> y la <span className="font-serif-italic text-primary">gestión</span>.
            </>
          }
          description="Los ERP tradicionales están hechos para contadores, no para jefes de mantenimiento ni supervisores de campo. Esto genera problemas críticos."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <div key={i} className="p-6 rounded-2xl border border-hairline bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                {problem.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
