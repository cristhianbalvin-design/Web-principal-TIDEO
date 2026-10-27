import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Ecosystem } from "@/components/site/Ecosystem";
import { LabsFeature } from "@/components/site/LabsFeature";
import { Methodology } from "@/components/site/Methodology";
import { Differential } from "@/components/site/Differential";
import { Insights } from "@/components/site/Insights";
import { FinalCTA } from "@/components/site/FinalCTA";
import { DiagnosticModal } from "@/components/diagnostic/DiagnosticModal";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import {
  canonicalLink,
  canonicalUrl,
  jsonLdScript,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TIDEO Tech & Strategy | OPERA ERP y sistemas a medida para empresas" },
      {
        name: "description",
        content:
          "TIDEO ofrece OPERA, su ERP para talleres, flotas y empresas con activos, y desarrolla sistemas a medida, CRM, automatizaciones, BI, IA y MVP en semanas para ordenar procesos y crecer con tecnología.",
      },
      {
        property: "og:title",
        content: "TIDEO Tech & Strategy | OPERA ERP y sistemas a medida",
      },
      {
        property: "og:description",
        content:
          "Tecnología que entiende tu negocio. OPERA ERP, sistemas a medida, datos e IA para empresas medianas.",
      },
      { property: "og:url", content: canonicalUrl("/") },
    ],
    links: [canonicalLink(canonicalUrl("/"))],
    scripts: [jsonLdScript(organizationJsonLd), jsonLdScript(websiteJsonLd)],
  }),
});

function Index() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <TracingBeam>
          <Hero />
          <TrustBar />
          <SelectedWork onDiagnostic={() => setDiagOpen(true)} />
          <Ecosystem />
          <LabsFeature />
          <Methodology />
          <Differential />
          <Insights />
          <FinalCTA />
        </TracingBeam>
      </main>
      <Footer />

      <DiagnosticModal isOpen={diagOpen} onClose={() => setDiagOpen(false)} />

      <WhatsAppFloat />
    </div>
  );
}
