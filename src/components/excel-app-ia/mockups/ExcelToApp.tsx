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
  const widths = [56, 78, 120, 82, 70]; // + 24 px de la columna de filas = 430 px
  const flag = (v: string) =>
    v.startsWith("#")
      ? "text-red-300 font-semibold"
      : v === "" || v.includes("?")
        ? "bg-amber/20"
        : "";
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-[#0d1420] shadow-2xl shadow-black/70">
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2 text-[11px] text-muted-foreground">
        <FileSpreadsheet className="h-3.5 w-3.5 text-primary/80" />
        <span className="font-mono">Solicitudes_compras_FINAL_v3.xlsx</span>
      </div>
      <table className="w-full table-fixed border-collapse font-mono text-[10.5px] text-foreground/75">
        <thead>
          <tr className="bg-foreground/[0.04] text-muted-foreground">
            <th className="w-6 border border-hairline" style={{ width: 24 }} />
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
          {/* Filas vacías: completan la hoja hasta el pie, como en Excel. */}
          {[10, 11, 12, 13].map((n) => (
            <tr key={n}>
              <td className="border border-hairline py-1 text-center text-muted-foreground">{n}</td>
              {cols.map((c) => (
                <td key={c} className="border border-hairline py-1">
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto flex gap-1 border-t border-hairline px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
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
      {/* Escritorio: composición antes → después, en tres columnas alineadas. */}
      <div className="hidden md:block">
        <ScaleToFit width={1180} height={500}>
          <div className="grid h-full grid-cols-[430px_110px_640px] grid-rows-[28px_1fr]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Antes · Hoja de cálculo
            </p>
            <span />
            <p className="font-mono text-xs uppercase tracking-widest text-academy">
              Después · Tu aplicación
            </p>

            <div className="opacity-85">
              <Spreadsheet />
            </div>
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-hairline via-academy/70 to-academy"
              />
              <span className="relative z-10 flex flex-col items-center gap-1 rounded-2xl border border-academy/50 bg-background px-3 py-2.5 text-xs font-semibold text-academy shadow-[0_0_40px_-6px_rgba(249,115,22,0.7)]">
                <Sparkles className="h-4 w-4" />
                Con IA
              </span>
            </div>
            <BrowserFrame url="compras.tuempresa.app/solicitudes">
              <PurchasesApp />
            </BrowserFrame>
          </div>
        </ScaleToFit>
      </div>
      {/* Móvil: solo la app, para que el texto siga siendo legible. */}
      <div className="md:hidden">
        <ScaleToFit width={640} height={472}>
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
