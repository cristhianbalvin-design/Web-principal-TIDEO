import {
  BarChart3,
  CheckSquare,
  FileSpreadsheet,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Truck,
} from "lucide-react";
import { AppShell, BrowserFrame, Chip, Kpi, ScaleToFit, ScreenHeader, type Tone } from "./frame";

/* Datos de ejemplo (ficticios): la misma información en Excel y en la app. */
const SHEET_ROWS: [string, string, string, string, string][] = [
  ["SC-142", "Mantto.", "Filtros hidráulicos", "en proceso", "C. Vega"],
  ["SC-141", "Logística", "Pallets de madera", "APROBADO?", "Ana"],
  ["SC-140", "Operac.", "EPP guantes nitrilo", "pendiente", "M.Torres"],
  ["SC-139", "Admin", "Tóner impresora", "ok", ""],
  ["SC-138", "Mantto.", "Rodamientos 6205", "#¡REF!", "C. Vega"],
  ["SC-138", "Mantenimiento", "Rodamientos 6205", "aprob", "Vega"],
  ["SC-137", "logistica", "Stretch film", "", "A. Ríos"],
];

const APP_ROWS: {
  id: string;
  item: string;
  owner: string;
  status: [string, Tone];
}[] = [
  {
    id: "SC-0142",

    item: "Filtros hidráulicos",
    owner: "C. Vega",
    status: ["En aprobación", "amber"],
  },
  {
    id: "SC-0141",

    item: "Pallets de madera",
    owner: "A. Ríos",
    status: ["Aprobada", "cyan"],
  },
  {
    id: "SC-0140",

    item: "EPP: guantes de nitrilo",
    owner: "M. Torres",
    status: ["Pendiente", "orange"],
  },
  {
    id: "SC-0139",

    item: "Tóner de impresora",
    owner: "L. Paz",
    status: ["Comprada", "muted"],
  },
  {
    id: "SC-0138",

    item: "Rodamientos 6205",
    owner: "C. Vega",
    status: ["Aprobada", "cyan"],
  },
];

/** Hoja de cálculo "antes": estados inconsistentes, duplicados y errores. */
function Spreadsheet() {
  const cols = ["A", "B", "C", "D", "E"];
  const widths = [64, 82, 132, 86, 70];
  const flag = (v: string) =>
    v.startsWith("#")
      ? "text-red-300 font-semibold"
      : v === "" || v.includes("?")
        ? "bg-amber/20"
        : "";
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-[#0d1420] shadow-2xl shadow-black/70">
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2 text-[11px] text-muted-foreground">
        <FileSpreadsheet className="h-3.5 w-3.5 text-primary/80" />
        <span className="font-mono">Solicitudes_compras_FINAL_v3.xlsx</span>
      </div>
      <table className="w-full border-collapse font-mono text-[10.5px] text-foreground/75">
        <thead>
          <tr className="bg-foreground/[0.04] text-muted-foreground">
            <th className="w-6 border border-hairline" />
            {cols.map((c, i) => (
              <th
                key={c}
                className="border border-hairline py-1 font-normal"
                style={{ width: widths[i] }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-hairline text-center text-muted-foreground">1</td>
            {["N°", "Área", "Producto", "Estado", "Resp."].map((h) => (
              <td
                key={h}
                className="border border-hairline px-1.5 py-1 font-semibold text-foreground/90"
              >
                {h}
              </td>
            ))}
          </tr>
          {SHEET_ROWS.map((r, i) => (
            <tr key={i}>
              <td className="border border-hairline text-center text-muted-foreground">{i + 2}</td>
              {r.map((v, j) => (
                <td
                  key={j}
                  className={`truncate border border-hairline px-1.5 py-1 ${j === 3 || j === 4 ? flag(v) : ""}`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-1 border-t border-hairline px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
        <span className="rounded bg-foreground/10 px-2 py-0.5">Hoja1</span>
        <span className="px-2 py-0.5">Hoja1 (2)</span>
        <span className="px-2 py-0.5">NO BORRAR</span>
      </div>
    </div>
  );
}

/** App "después": solicitudes de compra con estados, responsables e indicadores. */
export function PurchasesApp() {
  return (
    <AppShell
      appName="Compras"
      nav={[
        { icon: LayoutDashboard, label: "Panel" },
        { icon: ListChecks, label: "Solicitudes", active: true },
        { icon: CheckSquare, label: "Aprobaciones" },
        { icon: Truck, label: "Proveedores" },
        { icon: BarChart3, label: "Reportes" },
      ]}
      user={{ initials: "AR", name: "Ana Ríos", role: "Jefa de logística" }}
      compact
    >
      <ScreenHeader
        title="Solicitudes de compra"
        subtitle="Actualizado hace 2 min"
        action="+ Nueva solicitud"
      />
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        <Kpi label="Pendientes" value="12" accent />
        <Kpi label="En aprobación" value="5" />
        <Kpi label="Aprobadas (mes)" value="48" />
        <Kpi label="Tiempo promedio" value="1,8 d" />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-hairline">
        <table className="w-full text-[11px]">
          <thead className="bg-surface/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              {["N°", "Producto", "Responsable", "Estado"].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {APP_ROWS.map((r) => (
              <tr key={r.id}>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-academy">{r.id}</td>
                <td className="px-3 py-2">{r.item}</td>
                <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{r.owner}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <Chip tone={r.status[1]}>{r.status[0]}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

/** Visual del hero: de la hoja de cálculo a la aplicación. */
export function ExcelToApp() {
  return (
    <figure>
      {/* Escritorio: composición antes → después. */}
      <div className="hidden md:block">
        <ScaleToFit width={1180} height={560}>
          <div className="relative h-full w-full">
            <div className="absolute left-6 top-20 w-[460px] -rotate-3 opacity-80">
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Antes
              </p>
              <Spreadsheet />
            </div>
            <div className="absolute left-[400px] top-[372px] z-20 flex items-center gap-2 rounded-full border border-academy/50 bg-background px-4 py-2 text-sm font-semibold text-academy shadow-[0_0_40px_-6px_rgba(249,115,22,0.7)]">
              <Sparkles className="h-4 w-4" /> Con IA →
            </div>
            <div className="absolute right-0 top-0 h-[560px] w-[700px]">
              <BrowserFrame url="compras.tuempresa.app/solicitudes">
                <PurchasesApp />
              </BrowserFrame>
            </div>
          </div>
        </ScaleToFit>
      </div>
      {/* Móvil: solo la app, para que el texto siga siendo legible. */}
      <div className="md:hidden">
        <ScaleToFit width={640} height={500}>
          <BrowserFrame url="compras.tuempresa.app">
            <PurchasesApp />
          </BrowserFrame>
        </ScaleToFit>
      </div>
      <figcaption className="mt-5 text-center text-xs text-muted-foreground">
        Ejemplo ilustrativo: una hoja de cálculo de solicitudes convertida en una aplicación con
        estados, responsables e indicadores.
      </figcaption>
    </figure>
  );
}
