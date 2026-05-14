export type ModuleId =
  | "crm" | "comercial" | "operaciones" | "rrhh"
  | "logistica" | "compras" | "admin" | "cs" | "ia" | "campo";

export interface Module {
  id: ModuleId;
  label: string;
  lines: string[];
  angle: number;
}

export interface Question {
  q: string;
  opts: string[];
}

export interface RadarAxis {
  label: string;
  short: string;
  modules: ModuleId[];
  angle: number;
}

// SVG node map dimensions
export const CX = 290, CY = 280, MAP_R = 210;

export const MODULES: Module[] = [
  { id: "crm",         label: "CRM & Marketing",        lines: ["CRM &", "Marketing"],  angle: -90  },
  { id: "comercial",   label: "Comercial",               lines: ["Comercial"],            angle: -54  },
  { id: "operaciones", label: "Operaciones",             lines: ["Operaciones"],          angle: -18  },
  { id: "rrhh",        label: "RRHH",                    lines: ["RRHH"],                 angle: 18   },
  { id: "logistica",   label: "Logística",               lines: ["Logística"],            angle: 54   },
  { id: "compras",     label: "Compras",                 lines: ["Compras"],              angle: 90   },
  { id: "admin",       label: "Administración",          lines: ["Admin"],                angle: 126  },
  { id: "cs",          label: "Customer Success",        lines: ["Customer", "Success"],  angle: 162  },
  { id: "ia",          label: "Inteligencia Artificial", lines: ["IA", "Aplicada"],       angle: 198  },
  { id: "campo",       label: "Campo Móvil",             lines: ["Campo", "Móvil"],       angle: 234  },
];

export const QUESTIONS: Record<ModuleId, Question[]> = {
  crm: [
    {
      q: "¿Dónde viven tus contactos y oportunidades de venta?",
      opts: [
        "En la cabeza del vendedor / WhatsApp",
        "Excel compartido",
        "CRM básico desconectado",
        "CRM integrado a mis operaciones",
      ],
    },
    {
      q: "Cuando un cliente dice «ya hablé con alguien de tu empresa», ¿puedes ver ese historial en segundos?",
      opts: [
        "No, tengo que preguntar al vendedor",
        "A veces, si lo escribieron en algún lado",
        "Sí, pero en otro sistema separado",
        "Sí, todo centralizado",
      ],
    },
  ],
  comercial: [
    {
      q: "¿Cuánto tiempo tarda un vendedor en generar una cotización?",
      opts: [
        "Más de 1 hora",
        "30–60 minutos",
        "10–30 minutos",
        "Menos de 10 min (sistema automatizado)",
      ],
    },
    {
      q: "¿Sabes en tiempo real cuál es tu tasa de cierre por vendedor?",
      opts: [
        "No tenemos ese dato",
        "Lo calculo yo manualmente cada mes",
        "Tengo un reporte, pero llega tarde",
        "Dashboard en vivo",
      ],
    },
  ],
  operaciones: [
    {
      q: "¿Cómo asignas y controlas las órdenes de trabajo o servicios?",
      opts: [
        "WhatsApp / verbal / papel",
        "Excel o planilla compartida",
        "Sistema, pero no conectado a nada más",
        "Sistema integrado a compras, almacén y facturación",
      ],
    },
    {
      q: "¿Puedes saber el costo real de un proyecto o servicio terminado?",
      opts: [
        "No podemos calcularlo",
        "Con mucho trabajo manual después de cerrar",
        "Aproximado, no exacto",
        "Automáticamente, en tiempo real",
      ],
    },
  ],
  rrhh: [
    {
      q: "¿Cómo controlas asistencia, vacaciones y horas trabajadas?",
      opts: [
        "Planilla Excel o cuaderno",
        "Sistema básico desconectado",
        "Sistema de RRHH integrado parcialmente",
        "Integrado al ERP (nómina, costos, proyectos)",
      ],
    },
    {
      q: "¿Cómo gestionas el reclutamiento y onboarding de nuevos colaboradores?",
      opts: [
        "Todo por correo, WhatsApp y papel",
        "Hojas de cálculo y documentos compartidos",
        "Proceso definido pero en herramientas desconectadas",
        "Sistema integrado con seguimiento, evaluaciones y firma digital",
      ],
    },
  ],
  logistica: [
    {
      q: "¿Tu inventario refleja en tiempo real lo que entra y sale?",
      opts: [
        "No llevamos inventario digital",
        "Actualizamos manualmente al final del día",
        "Casi siempre, hay desfases",
        "Sí, cada movimiento actualiza el stock",
      ],
    },
    {
      q: "¿Cómo gestionas la trazabilidad de tus entregas o despachos?",
      opts: [
        "No tenemos seguimiento formal de entregas",
        "Actualizamos manualmente y notificamos por WhatsApp",
        "Sistema básico de seguimiento, sin integración al resto",
        "Trazabilidad completa integrada al sistema, con alertas automáticas al cliente",
      ],
    },
  ],
  compras: [
    {
      q: "¿Tienes un proceso formal de aprobación de compras?",
      opts: [
        "No, cualquiera compra lo que necesita",
        "Por WhatsApp o correo al jefe",
        "Flujo definido pero en papel o email",
        "Workflow digital con trazabilidad completa",
      ],
    },
    {
      q: "¿Tienes visibilidad del desempeño de tus proveedores e historial de compras?",
      opts: [
        "No llevamos registro formal de proveedores",
        "Tenemos una lista básica en Excel",
        "Evaluamos proveedores pero de forma manual y esporádica",
        "Sistema con historial, evaluaciones y alertas automáticas de proveedores",
      ],
    },
  ],
  admin: [
    {
      q: "¿Cuánto demora cerrar el mes contable?",
      opts: [
        "Más de 3 semanas",
        "2–3 semanas",
        "1–2 semanas",
        "Menos de 5 días",
      ],
    },
    {
      q: "¿Tienes visibilidad en tiempo real del flujo de caja y las cuentas por cobrar/pagar?",
      opts: [
        "No, lo sabemos solo cuando el contador entrega el reporte",
        "Lo revisamos manualmente en Excel cada semana",
        "Tenemos reportes pero con varios días de retraso",
        "Dashboard en tiempo real con alertas automáticas",
      ],
    },
  ],
  cs: [
    {
      q: "¿Sabes qué clientes están en riesgo de no renovar o de irse?",
      opts: [
        "No tenemos visibilidad de eso",
        "Lo detectamos cuando ya se fueron",
        "Por feeling del equipo",
        "Indicadores automáticos de salud del cliente",
      ],
    },
  ],
  ia: [
    {
      q: "¿Tu empresa usa herramientas de analítica de datos o agentes de IA?",
      opts: [
        "No usamos ninguna",
        "Tenemos alguna pero casi nadie sabe usarla bien",
        "Las usamos pero de forma básica y sin metodología",
        "Las dominamos y generamos valor real con ellas",
      ],
    },
    {
      q: "¿Has implementado automatizaciones en tus procesos operativos?",
      opts: [
        "No, todo se hace manualmente",
        "Tenemos alguna automatización puntual, pero no es sistemático",
        "Automatizamos algunos procesos clave con herramientas como Make, n8n o Power Automate",
        "Programa de automatización robusto que cubre múltiples áreas del negocio",
      ],
    },
    {
      q: "¿Cómo toma decisiones tu equipo cuando necesita información operativa en tiempo real?",
      opts: [
        'Pregunta a quien "sabe" o busca en varios archivos',
        "Espera el reporte semanal o mensual",
        "Consulta un dashboard, pero no siempre está actualizado",
        "Tiene acceso inmediato a datos con alertas y sugerencias automáticas",
      ],
    },
  ],
  campo: [
    {
      q: "¿Tu equipo en campo registra información en tiempo real?",
      opts: [
        "Llegan a la oficina y lo escriben de memoria",
        "Fotos al WhatsApp / llamadas",
        "App básica, pero no conectada al sistema",
        "App integrada que alimenta el ERP en vivo",
      ],
    },
  ],
};

export const FINAL_QUESTIONS: Question[] = [
  {
    q: "¿Cuántas horas semanales estima que su equipo pierde en tareas manuales, reprocesos o buscar información?",
    opts: [
      "Menos de 5 horas (somos bastante eficientes)",
      "Entre 5 y 15 horas",
      "Entre 15 y 30 horas",
      "Más de 30 horas (es un problema serio)",
    ],
  },
  {
    q: "¿Ha perdido clientes, contratos u oportunidades por falta de información o lentitud operativa?",
    opts: [
      "No, nunca nos ha pasado",
      "Probablemente sí, pero no lo podemos medir",
      "Sí, alguna vez lo identificamos",
      "Sí, es algo que nos preocupa regularmente",
    ],
  },
  {
    q: "¿Qué tan urgente es para usted resolver esto?",
    opts: [
      "Estoy explorando, sin urgencia",
      "Queremos hacerlo este año",
      "Es una prioridad para este semestre",
      "Necesito una solución ya",
    ],
  },
  {
    q: "Cuando tu empresa necesita comunicar su marca, lanzar productos o generar materiales de marketing, ¿cómo lo resuelve?",
    opts: [
      "No tenemos una estrategia visual definida",
      "Lo hacemos internamente pero sin calidad profesional",
      "Contratamos freelancers o agencias con resultados irregulares",
      "Tenemos un sistema de producción de contenido consistente y de alto impacto",
    ],
  },
];

export const RADAR_AXES: RadarAxis[] = [
  { label: "Comercial",      short: "Comercial",  modules: ["crm", "comercial"],          angle: -90  },
  { label: "Operaciones",    short: "Ops",        modules: ["operaciones"],               angle: -30  },
  { label: "Administración", short: "Admin",      modules: ["rrhh", "compras", "admin"],  angle: 30   },
  { label: "Logística",      short: "Logística",  modules: ["logistica"],                 angle: 90   },
  { label: "Tecnología",     short: "Tech",       modules: ["ia", "campo"],               angle: 150  },
  { label: "Clientes",       short: "Clientes",   modules: ["cs"],                        angle: 210  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function isModuleComplete(id: ModuleId, answers: Record<string, number[]>): boolean {
  return (answers[id]?.length ?? 0) >= QUESTIONS[id].length;
}

export function countCompleted(answers: Record<string, number[]>): number {
  return MODULES.filter((m) => isModuleComplete(m.id, answers)).length;
}

function moduleAvg(id: ModuleId, answers: Record<string, number[]>): number {
  const s = answers[id];
  if (!s?.length) return 0;
  return s.reduce((a, b) => a + b, 0) / s.length;
}

export function calcRadarScores(answers: Record<string, number[]>): number[] {
  return RADAR_AXES.map((axis) => {
    const done = axis.modules.filter((m) => isModuleComplete(m, answers));
    if (!done.length) return 0;
    const avg = done.reduce((s, m) => s + moduleAvg(m, answers), 0) / done.length;
    return avg / 4;
  });
}

export function calcModuleScores(answers: Record<string, number[]>): number[] {
  return MODULES.map((m) => {
    const ans = answers[m.id];
    if (!ans?.length) return 0;
    const maxScore = 3 * QUESTIONS[m.id].length;
    if (!maxScore) return 0;
    return Math.min(1, ans.reduce((s, v) => s + v, 0) / maxScore);
  });
}

export function radarPolygonPoints(scores: number[], cx: number, cy: number, maxR: number): string {
  return RADAR_AXES.map((axis, i) => {
    const rad = (axis.angle * Math.PI) / 180;
    const r = scores[i] * maxR;
    return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
  }).join(" ");
}

export function nodePos(angle: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.round(CX + MAP_R * Math.cos(rad)),
    y: Math.round(CY + MAP_R * Math.sin(rad)),
  };
}

export interface DiagPayload {
  prompt: string;
  userName: string;
  companyName: string;
  userPhone: string;
  userEmail: string;
  companySizeContext: string;
  moduleScores: Record<string, number>;
  totalScore: number;
  maturityPercentage: number;
  criticalAreas: string[];
  impactBlock: string[];
}

export function buildDiagPayload(
  answers: Record<string, number[]>,
  finalAnswers: number[],
  context: {
    userName: string;
    companyName: string;
    userPhone: string;
    userEmail: string;
    companySizeContext: string;
  }
): DiagPayload {
  const moduleScores: Record<string, number> = {};
  for (const m of MODULES) {
    const s = answers[m.id];
    if (s?.length) moduleScores[m.id] = s.reduce((a, b) => a + b, 0);
  }

  const totalMax = MODULES.reduce((t, m) => t + QUESTIONS[m.id].length * 4, 0);
  const totalScore = Object.values(moduleScores).reduce((a, b) => a + b, 0);
  const maturityPercentage = Math.round((totalScore / totalMax) * 100);

  const completedMods = MODULES.filter((m) => isModuleComplete(m.id, answers));
  const criticalAreas = [...completedMods]
    .sort((a, b) => {
      const aAvg = (moduleScores[a.id] ?? 0) / QUESTIONS[a.id].length;
      const bAvg = (moduleScores[b.id] ?? 0) / QUESTIONS[b.id].length;
      return aAvg - bAvg;
    })
    .slice(0, 3)
    .map((m) => m.label);

  const impactBlock = FINAL_QUESTIONS.map((q, i) => {
    const s = finalAnswers[i];
    return s ? `${q.q}\n→ ${q.opts[s - 1]}` : "";
  }).filter(Boolean);

  let prompt =
    `DATOS DEL USUARIO:\n` +
    `- Nombre: ${context.userName}\n` +
    `- Empresa: ${context.companyName}\n` +
    `- Tamaño de empresa: ${context.companySizeContext}\n\n` +
    `DATOS CALCULADOS:\n` +
    `- Score total: ${totalScore}/${totalMax} puntos\n` +
    `- Madurez estimada: ${maturityPercentage}%\n` +
    `- Áreas más críticas (menor puntuación): ${criticalAreas.join(", ")}\n\n` +
    `MÓDULOS EVALUADOS:\n`;

  for (const m of MODULES) {
    const scores = answers[m.id];
    if (!scores?.length) continue;
    const qs = QUESTIONS[m.id];
    prompt += `\n${m.label} (score: ${moduleScores[m.id]}/${qs.length * 4}):\n`;
    scores.forEach((s, i) => {
      prompt += `  P${i + 1}: ${qs[i].q}\n  → ${qs[i].opts[s - 1]} (nivel ${s}/4)\n`;
    });
  }

  if (finalAnswers.length) {
    prompt += "\nBLOQUE DE IMPACTO EN EL NEGOCIO:\n";
    FINAL_QUESTIONS.forEach((q, i) => {
      const s = finalAnswers[i];
      if (!s) return;
      prompt += `  ${q.q}\n  → ${q.opts[s - 1]} (nivel ${s}/4)\n`;
    });
  }

  return { prompt, ...context, moduleScores, totalScore, maturityPercentage, criticalAreas, impactBlock };
}
