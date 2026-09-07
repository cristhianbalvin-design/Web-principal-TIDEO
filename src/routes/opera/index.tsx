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
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/opera/")({
  component: OperaLanding,
  head: () => ({
    meta: [
      { title: "OPERA | El ERP + MOM para activos intensivos" },
      {
        name: "description",
        content: "OPERA es la plataforma que une el ERP y la operación de activos intensivos. Diseñada para alquiler de maquinaria, talleres y servicios en campo.",
      },
    ],
  }),
});

function OperaLanding() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background relative overflow-hidden">
        <TracingBeam className="px-0">
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
    </>
  );
}
