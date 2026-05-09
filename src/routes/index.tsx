import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TIDEO Tech & Strategy | Tecnología que entiende tu negocio" },
      {
        name: "description",
        content:
          "TIDEO diseña, automatiza y construye soluciones digitales para empresas que buscan ordenar procesos, integrar datos y crecer con tecnología, IA y desarrollo ágil.",
      },
      { property: "og:title", content: "TIDEO Tech & Strategy" },
      {
        property: "og:description",
        content: "Tecnología que entiende tu negocio. Procesos, datos e IA para empresas medianas.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <SelectedWork />
        <Ecosystem />
        <LabsFeature />
        <Methodology />
        <Differential />
        <Insights />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
