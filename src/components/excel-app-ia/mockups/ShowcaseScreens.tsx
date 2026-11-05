import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  Boxes,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Cog,
  Handshake,
  LayoutDashboard,
  Users,
  UserPlus,
  Wrench,
} from "lucide-react";
import { AppShell, Chip, Kpi, ScreenHeader, type Tone } from "./frame";

/* Todos los datos son ficticios y solo ilustran el tipo de aplicación. */

export function InventoryScreen() {
  const items: [string, string, number, number, string][] = [
    ["FH-210", "Filtro hidráulico HF-35", 8, 20, "Repuestos"],
    ["RD-6205", "Rodamiento 6205-2RS", 64, 30, "Repuestos"],
    ["EP-112", "Guantes de nitrilo (caja)", 12, 25, "EPP"],
    ["PL-001", "Pallet de madera 1,2 m", 140, 60, "Embalaje"],
    ["AC-15W", "Aceite 15W-40 (balde)", 22, 15, "Lubricantes"],
  ];
  const bars = [34, 52, 41, 66, 58, 72, 86];
  return (
    <AppShell
      appName="Almacén"
      nav={[
        { icon: LayoutDashboard, label: "Panel" },
        { icon: Boxes, label: "Inventario", active: true },
        { icon: ArrowDownToLine, label: "Entradas" },
        { icon: ArrowUpFromLine, label: "Salidas" },
        { icon: BarChart3, label: "Reportes" },
      ]}
      user={{ initials: "JM", name: "Jorge Medina", role: "Almacenero" }}
    >
      <ScreenHeader
        title="Inventario"
        subtitle="Existencias en tiempo real"
        action="+ Registrar movimiento"
      />
      <div className="mt-4 grid grid-cols-[1fr_1fr_1fr_1.6fr] gap-2.5">
        <Kpi label="Productos" value="1 248" />
        <Kpi label="Bajo stock mínimo" value="14" accent />
        <Kpi label="Movimientos hoy" value="86" />
        <div className="rounded-xl border border-hairline bg-surface/50 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Movimientos · 7 días
          </p>
          <div className="mt-2 flex h-10 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-sm ${i === bars.length - 1 ? "bg-academy" : "bg-primary/40"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-hairline">
        <table className="w-full text-[11px]">
          <thead className="bg-surface/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              {["Código", "Producto", "Categoría", "Existencias", "Estado"].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {items.map(([code, name, stock, min, cat]) => {
              const low = stock < min;
              return (
                <tr key={code}>
                  <td className="px-3 py-2 font-mono text-academy">{code}</td>
                  <td className="px-3 py-2">{name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{cat}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right font-mono">{stock}</span>
                      <span className="h-1.5 w-24 overflow-hidden rounded-full bg-foreground/10">
                        <span
                          className={`block h-full rounded-full ${low ? "bg-academy" : "bg-primary/70"}`}
                          style={{ width: `${Math.min(100, (stock / (min * 2.5)) * 100)}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Chip tone={low ? "orange" : "cyan"}>{low ? "Bajo mínimo" : "Disponible"}</Chip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

export function CrmScreen() {
  const columns: { name: string; total: string; cards: [string, string, string][] }[] = [
    {
      name: "Prospecto",
      total: "S/ 42 000",
      cards: [
        ["Agroexport Norte", "S/ 18 000", "VR"],
        ["Clínica San Marcos", "S/ 24 000", "LP"],
      ],
    },
    {
      name: "Propuesta",
      total: "S/ 65 500",
      cards: [
        ["Minera Los Andes", "S/ 38 500", "VR"],
        ["Textil Pacífico", "S/ 27 000", "MT"],
      ],
    },
    {
      name: "Negociación",
      total: "S/ 51 000",
      cards: [["Constructora Lima Sur", "S/ 51 000", "LP"]],
    },
    {
      name: "Ganado",
      total: "S/ 33 800",
      cards: [
        ["Transportes Rímac", "S/ 21 300", "MT"],
        ["Ferretería Central", "S/ 12 500", "VR"],
      ],
    },
  ];
  return (
    <AppShell
      appName="Ventas"
      nav={[
        { icon: LayoutDashboard, label: "Panel" },
        { icon: Handshake, label: "Oportunidades", active: true },
        { icon: Briefcase, label: "Clientes" },
        { icon: CalendarDays, label: "Actividades" },
        { icon: BarChart3, label: "Reportes" },
      ]}
      user={{ initials: "VR", name: "Valeria Ruiz", role: "Ejecutiva comercial" }}
    >
      <ScreenHeader
        title="Embudo de oportunidades"
        subtitle="Noviembre · 9 oportunidades abiertas"
        action="+ Nueva oportunidad"
      />
      <div className="mt-4 grid grid-cols-4 gap-3">
        {columns.map((c, ci) => (
          <div key={c.name} className="rounded-xl border border-hairline bg-surface/40 p-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold">{c.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{c.total}</span>
            </div>
            <div className="mt-2.5 space-y-2">
              {c.cards.map(([company, amount, owner]) => (
                <div
                  key={company}
                  className={`rounded-lg border bg-background/80 p-2.5 ${
                    ci === 3
                      ? "border-primary/40"
                      : ci === 2
                        ? "border-academy/40"
                        : "border-hairline"
                  }`}
                >
                  <p className="text-[11px] font-medium leading-snug">{company}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10.5px] text-academy">{amount}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[8.5px] font-semibold text-primary">
                      {owner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Kpi label="Pipeline abierto" value="S/ 158 500" />
        <Kpi label="Tasa de cierre" value="31 %" accent />
        <Kpi label="Ciclo promedio" value="24 días" />
      </div>
    </AppShell>
  );
}

export function HrScreen() {
  const requests: [string, string, string, string, [string, Tone]][] = [
    ["Rosa Quispe", "Contabilidad", "Vacaciones", "16–27 dic.", ["Pendiente", "orange"]],
    ["Luis Paredes", "Operaciones", "Permiso médico", "12 nov.", ["Aprobada", "cyan"]],
    ["Carla Vega", "Logística", "Vacaciones", "2–6 ene.", ["En revisión", "amber"]],
    ["Diego Salas", "Ventas", "Licencia", "20–21 nov.", ["Aprobada", "cyan"]],
  ];
  const steps: [string, boolean][] = [
    ["Contrato firmado", true],
    ["Alta en planilla", true],
    ["Equipo y accesos", true],
    ["Inducción SST", false],
    ["Capacitación del puesto", false],
  ];
  return (
    <AppShell
      appName="Personas"
      nav={[
        { icon: LayoutDashboard, label: "Panel" },
        { icon: Users, label: "Colaboradores" },
        { icon: CalendarDays, label: "Vacaciones y permisos", active: true },
        { icon: UserPlus, label: "Onboarding" },
        { icon: BarChart3, label: "Reportes" },
      ]}
      user={{ initials: "PV", name: "Patricia Vela", role: "Analista de RR. HH." }}
    >
      <ScreenHeader
        title="Vacaciones y permisos"
        subtitle="4 solicitudes esta semana"
        action="+ Nueva solicitud"
      />
      <div className="mt-4 grid grid-cols-[1.55fr_1fr] gap-3">
        <div className="overflow-hidden rounded-xl border border-hairline">
          <table className="w-full text-[11px]">
            <thead className="bg-surface/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Colaborador", "Tipo", "Fechas", "Estado"].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {requests.map(([name, area, type, dates, [st, tone]]) => (
                <tr key={name}>
                  <td className="px-3 py-2">
                    <p className="font-medium">{name}</p>
                    <p className="text-[10px] text-muted-foreground">{area}</p>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{type}</td>
                  <td className="px-3 py-2 font-mono text-[10.5px]">{dates}</td>
                  <td className="px-3 py-2">
                    <Chip tone={tone}>{st}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-academy/30 bg-academy/[0.05] p-3.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Onboarding</p>
          <p className="mt-1 text-[12px] font-semibold">Andrea Flores · Asistente de compras</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <span className="block h-full w-3/5 rounded-full bg-academy" />
          </div>
          <ul className="mt-3 space-y-2">
            {steps.map(([s, done]) => (
              <li key={s} className="flex items-center gap-2 text-[11px]">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                    done
                      ? "bg-academy text-background"
                      : "border border-hairline text-muted-foreground"
                  }`}
                >
                  {done ? "✓" : ""}
                </span>
                <span className={done ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Kpi label="Colaboradores" value="86" />
        <Kpi label="Días de vacaciones pendientes" value="412" />
        <Kpi label="Ingresos del mes" value="3" accent />
      </div>
    </AppShell>
  );
}

export function WorkOrdersScreen() {
  const orders: [string, string, string, string, [string, Tone], number][] = [
    [
      "OT-0231",
      "Cargador frontal CF-01",
      "Cambio de filtros",
      "R. Huamán",
      ["En ejecución", "amber"],
      60,
    ],
    [
      "OT-0230",
      "Compresor de tornillo C-02",
      "Revisión de fugas",
      "J. Soto",
      ["Programada", "muted"],
      0,
    ],
    [
      "OT-0229",
      "Grupo electrógeno 250 kVA",
      "Mantenimiento preventivo",
      "R. Huamán",
      ["Cerrada", "cyan"],
      100,
    ],
    [
      "OT-0228",
      "Faja transportadora F-02",
      "Cambio de rodillos",
      "M. Ríos",
      ["En espera de repuesto", "orange"],
      35,
    ],
  ];
  const timeline: [string, string, boolean][] = [
    ["Creada", "08:10", true],
    ["Asignada a R. Huamán", "08:25", true],
    ["Repuestos despachados", "09:40", true],
    ["En ejecución", "10:05", true],
    ["Cierre y conformidad", "—", false],
  ];
  return (
    <AppShell
      appName="Mantenimiento"
      nav={[
        { icon: LayoutDashboard, label: "Panel" },
        { icon: ClipboardList, label: "Órdenes de trabajo", active: true },
        { icon: Cog, label: "Equipos" },
        { icon: Wrench, label: "Técnicos" },
        { icon: BarChart3, label: "Indicadores" },
      ]}
      user={{ initials: "EC", name: "Eduardo Campos", role: "Jefe de mantenimiento" }}
    >
      <ScreenHeader
        title="Órdenes de trabajo"
        subtitle="Semana 46 · 18 órdenes"
        action="+ Nueva orden"
      />
      <div className="mt-4 grid grid-cols-[1.7fr_1fr] gap-3">
        <div className="space-y-2">
          {orders.map(([id, equip, task, tech, [st, tone], pct], i) => (
            <div
              key={id}
              className={`rounded-xl border p-3 ${i === 0 ? "border-academy/40 bg-academy/[0.05]" : "border-hairline bg-surface/40"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-academy">{id}</span>
                <Chip tone={tone}>{st}</Chip>
              </div>
              <p className="mt-1 text-[12px] font-medium">{equip}</p>
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-muted-foreground">
                <span>
                  {task} · {tech}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-20 overflow-hidden rounded-full bg-foreground/10">
                    <span
                      className="block h-full rounded-full bg-primary/70"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-7 text-right font-mono">{pct}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-hairline bg-surface/40 p-3.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Detalle · OT-0231
          </p>
          <p className="mt-1 text-[12px] font-semibold">Cargador frontal CF-01</p>
          <ol className="mt-3 space-y-3 border-l border-hairline pl-3">
            {timeline.map(([label, time, done]) => (
              <li key={label} className="relative text-[11px]">
                <span
                  className={`absolute -left-[17px] top-1 h-2 w-2 rounded-full ${done ? "bg-academy" : "border border-hairline bg-background"}`}
                />
                <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">{time}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
