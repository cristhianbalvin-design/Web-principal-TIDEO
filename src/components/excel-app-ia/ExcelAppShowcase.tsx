import { useState, type KeyboardEvent } from "react";
import { Boxes, ClipboardList, Handshake, Users } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BrowserFrame, ScaleToFit } from "./mockups/frame";
import { CrmScreen, HrScreen, InventoryScreen, WorkOrdersScreen } from "./mockups/ShowcaseScreens";
import { Section } from "./shared";

const TABS = [
  {
    id: "inventario",
    label: "Inventario",
    area: "Logística",
    icon: Boxes,
    url: "almacen.tuempresa.app/inventario",
    text: "Existencias actualizadas, alertas visuales de stock mínimo y movimientos del día.",
    Screen: InventoryScreen,
  },
  {
    id: "crm",
    label: "CRM",
    area: "Ventas",
    icon: Handshake,
    url: "ventas.tuempresa.app/oportunidades",
    text: "Embudo de oportunidades por etapa, montos y responsables de cada cliente.",
    Screen: CrmScreen,
  },
  {
    id: "rrhh",
    label: "RR. HH.",
    area: "Recursos humanos",
    icon: Users,
    url: "personas.tuempresa.app/vacaciones",
    text: "Solicitudes de vacaciones y permisos con aprobación, y seguimiento del onboarding.",
    Screen: HrScreen,
  },
  {
    id: "ot",
    label: "Órdenes de trabajo",
    area: "Mantenimiento",
    icon: ClipboardList,
    url: "mantenimiento.tuempresa.app/ordenes",
    text: "Órdenes por equipo y técnico, avance de cada trabajo e historial de la intervención.",
    Screen: WorkOrdersScreen,
  },
] as const;

/** Vitrina de ejemplos ilustrativos de aplicaciones que se pueden construir en el curso. */
export function ExcelAppShowcase() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <Section id="ejemplos" className="border-t border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[46rem] max-w-full h-[24rem] rounded-full bg-academy/10 blur-[120px] -z-10"
      />
      <SectionHeader
        align="center"
        eyebrow="Así se ve lo que vas a construir"
        title={
          <>
            Aplicaciones empresariales{" "}
            <span className="font-serif-italic text-academy">de verdad</span>, para tu propio
            proceso
          </>
        }
        description="Ejemplos ilustrativos del tipo de aplicación que puedes desarrollar en el curso: con base de datos, usuarios, estados y reglas de negocio."
      />

      <div
        role="tablist"
        aria-label="Ejemplos de aplicaciones"
        className="mt-12 flex flex-wrap justify-center gap-2"
      >
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const selected = i === active;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-academy bg-academy/15 text-foreground"
                  : "border-hairline bg-surface/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${selected ? "text-academy" : ""}`} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${tab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        className="mt-8 mx-auto max-w-5xl"
      >
        <ScaleToFit width={1000} height={560}>
          <BrowserFrame url={tab.url}>
            <tab.Screen />
          </BrowserFrame>
        </ScaleToFit>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          <span className="font-mono text-xs uppercase tracking-widest text-academy">
            {tab.area}
          </span>
          <span className="mx-2 text-hairline">·</span>
          {tab.text}
        </p>
      </div>
    </Section>
  );
}
