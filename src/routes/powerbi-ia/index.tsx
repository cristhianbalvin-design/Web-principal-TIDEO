import { createFileRoute } from "@tanstack/react-router";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Footer } from "@/components/site/Footer";

// Page Components in exact order
import { PowerBiNav } from "@/components/powerbi-ia/PowerBiNav";
import { PowerBiHero } from "@/components/powerbi-ia/PowerBiHero";
import { PowerBiTrustBar } from "@/components/powerbi-ia/PowerBiTrustBar";
import { PowerBiProblemSolution } from "@/components/powerbi-ia/PowerBiProblemSolution";
import { PowerBiAiLevels } from "@/components/powerbi-ia/PowerBiAiLevels";
import { PowerBiCurriculumOutcomes } from "@/components/powerbi-ia/PowerBiCurriculumOutcomes";
import { PowerBiProgramSessions } from "@/components/powerbi-ia/PowerBiProgramSessions";
import { PowerBiPricingDates } from "@/components/powerbi-ia/PowerBiPricingDates";
import { PowerBiToolsGrid } from "@/components/powerbi-ia/PowerBiToolsGrid";
import { PowerBiDifferentialTable } from "@/components/powerbi-ia/PowerBiDifferentialTable";
import { PowerBiCiaMethod } from "@/components/powerbi-ia/PowerBiCiaMethod";
import { PowerBiTargetAudience } from "@/components/powerbi-ia/PowerBiTargetAudience";
import { PowerBiAlumniMessage } from "@/components/powerbi-ia/PowerBiAlumniMessage";
import { PowerBiInstructor } from "@/components/powerbi-ia/PowerBiInstructor";
import { PowerBiFaq } from "@/components/powerbi-ia/PowerBiFaq";
import { PowerBiLeadForm } from "@/components/powerbi-ia/PowerBiLeadForm";
import { PowerBiFloatingWhatsApp } from "@/components/powerbi-ia/PowerBiFloatingWhatsApp";

export const Route = createFileRoute("/powerbi-ia/")({
  component: PowerBiIaLanding,
  head: () => ({
    meta: [
      { title: "Power BI + IA Agéntica — Del Asistente al Operador | TIDEO Academy" },
      {
        name: "description",
        content:
          "12 horas para dominar Power BI + IA Agéntica (Del Asistente al Operador). Aprende a construir dashboards utilizando ChatGPT, Claude, Gemini y Google Antigravity.",
      },
      {
        property: "og:title",
        content: "Power BI + IA Agéntica — Del Asistente al Operador | TIDEO Academy",
      },
      {
        property: "og:description",
        content:
          "Ya sabes Power BI. Ahora aprende a construir dashboards con IA Agéntica: del asistente al operador.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Power BI + IA Agéntica — Del Asistente al Operador | TIDEO Academy",
      },
      {
        name: "twitter:description",
        content:
          "Ya sabes Power BI. Ahora aprende a construir dashboards con IA Agéntica: del asistente al operador.",
      },
      { name: "theme-color", content: "#060B14" },
    ],
  }),
});

function PowerBiIaLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-academy/30 selection:text-foreground">
      {/* Navigation */}
      <PowerBiNav />

      {/* Main Content with TracingBeam wrapper */}
      <main>
        <TracingBeam>
          {/* 1. Hero */}
          <PowerBiHero />

          {/* 2. Barra de confianza */}
          <PowerBiTrustBar />

          {/* 3. Problema -> Oportunidad */}
          <PowerBiProblemSolution />

          {/* 4. Los 3 niveles de IA (sección ancla) */}
          <PowerBiAiLevels />

          {/* 5. Qué aprenderás */}
          <PowerBiCurriculumOutcomes />

          {/* 6. Programa (4 sesiones de 3h) */}
          <PowerBiProgramSessions />

          {/* 7. Inversión y fechas (descuento lanzamiento & countdown) */}
          <PowerBiPricingDates />

          {/* 8. Herramientas del curso */}
          <PowerBiToolsGrid />

          {/* 9. Power BI tradicional vs. Power BI + IA */}
          <PowerBiDifferentialTable />

          {/* 10. Framework propio - Método C.I.A. */}
          <PowerBiCiaMethod />

          {/* 11. A quién está dirigido / A quién no */}
          <PowerBiTargetAudience />

          {/* 12. Mensaje a antiguos alumnos */}
          <PowerBiAlumniMessage />

          {/* 13. Instructor */}
          <PowerBiInstructor />

          {/* 14. Preguntas frecuentes (FAQ) */}
          <PowerBiFaq />

          {/* 15. CTA final e Inscripción */}
          <PowerBiLeadForm />
        </TracingBeam>
      </main>

      {/* Botón flotante global de WhatsApp */}
      <PowerBiFloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
