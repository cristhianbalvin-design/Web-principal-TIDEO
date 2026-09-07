import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { OperaLandingPage } from "@/components/opera/OperaLandingPage";
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

const getServerHostname = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  return request?.headers.get("host") || "";
});

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const isServer = typeof document === "undefined";
    const hostname = isServer ? await getServerHostname() : window.location.host;
    const isOpera = hostname === "opera.tideo.tech" || hostname === "www.opera.tideo.tech";
    return { isOpera };
  },
  component: () => {
    const { isOpera } = Route.useRouteContext();
    return isOpera ? <OperaLandingPage /> : <Index />;
  },
  head: ({ context }) => {
    if (context?.isOpera) {
      return {
        meta: [
          { title: "OPERA | El ERP + MOM para activos intensivos" },
          {
            name: "description",
            content: "OPERA es la plataforma que une el ERP y la operación de activos intensivos. Diseñada para alquiler de maquinaria, talleres y servicios en campo.",
          },
        ],
      };
    }
    return {
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
    };
  },
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

      <span
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg cursor-default transition-transform hover:scale-105"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
    </div>
  );
}
