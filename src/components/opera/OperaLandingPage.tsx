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

export function OperaLandingPage() {
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
