import { createFileRoute } from "@tanstack/react-router";
import { OperaLandingPage } from "@/components/opera/OperaLandingPage";

export const Route = createFileRoute("/opera/")({
  component: OperaLandingPage,
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
