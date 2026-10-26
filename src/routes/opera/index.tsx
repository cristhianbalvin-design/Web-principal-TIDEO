import { createFileRoute } from "@tanstack/react-router";
import { ParallaxHero } from "@/components/opera/ParallaxHero";
import { SectorProblem } from "@/components/opera/SectorProblem";
import { WhatIsOpera } from "@/components/opera/WhatIsOpera";
import { TargetAudience } from "@/components/opera/TargetAudience";
import { ArchitectureOverview } from "@/components/opera/ArchitectureOverview";
import { NativeIntegration } from "@/components/opera/NativeIntegration";
import { OperaDifferential } from "@/components/opera/OperaDifferential";
import { ExpectedBenefits } from "@/components/opera/ExpectedBenefits";
import { ImplementationSteps } from "@/components/opera/ImplementationSteps";
import { QualificationForm } from "@/components/opera/QualificationForm";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { OperaNav } from "@/components/opera/OperaNav";
import { Footer } from "@/components/site/Footer";
import { OPERA_URL, jsonLdScript, operaJsonLd } from "@/lib/site";

export const Route = createFileRoute("/opera/")({
  component: OperaLanding,
  head: () => ({
    meta: [
      { title: "OPERA | ERP para talleres, alquiler de maquinaria y servicios en campo" },
      {
        name: "description",
        content:
          "OPERA es el ERP para talleres de mantenimiento, alquiler de maquinaria y servicios en campo: órdenes de trabajo, repuestos, mantenimiento y costos en tiempo real en una sola plataforma ERP + MOM.",
      },
      {
        property: "og:title",
        content: "OPERA | ERP para talleres, alquiler de maquinaria y servicios en campo",
      },
      { property: "og:url", content: OPERA_URL },
    ],
    // La landing vive en su subdominio; /opera en www es la misma página.
    links: [{ rel: "canonical", href: OPERA_URL }],
    scripts: [jsonLdScript(operaJsonLd)],
  }),
});

function OperaLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OperaNav />
      <main>
        <TracingBeam>
          <ParallaxHero />
          <SectorProblem />
          <WhatIsOpera />
          <TargetAudience />
          <ArchitectureOverview />
          <NativeIntegration />
          <OperaDifferential />
          <ExpectedBenefits />
          <ImplementationSteps />
          <QualificationForm />
        </TracingBeam>
      </main>
      <Footer />
    </div>
  );
}
