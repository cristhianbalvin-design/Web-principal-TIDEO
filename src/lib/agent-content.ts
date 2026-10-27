/**
 * Contenido para agentes de IA servido por middleware.ts:
 * - HOME_MARKDOWN: la home en Markdown (Accept: text/markdown en "/", y /index.md).
 * - NOT_FOUND_MARKDOWN: cuerpo del 404 cuando el agente pide Markdown.
 * - KNOWN_PATHS: rutas que existen. Todo lo demás es 404.
 *
 * Si cambias el copy de la home (src/components/site/*), actualiza HOME_MARKDOWN.
 * Si agregas una ruta, agrégala a KNOWN_PATHS, a public/sitemap.xml y a vite.config.ts.
 */
import { METALMECANICA_URL, metalmecanica as mm } from "./metalmecanica-content";
import { OPERA_URL, ORG, SITE_URL } from "./site";

export const KNOWN_PATHS = [
  "/",
  "/contacto",
  "/nosotros",
  "/privacidad",
  "/opera",
  "/opera/metalmecanica",
  "/powerbi-ia",
  // Redirecciones definidas en vercel.json:
  "/about",
  "/privacy",
] as const;

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.replace(/\/+$/, "") || "/";
  return pathname || "/";
}

export function isKnownPath(pathname: string): boolean {
  return (KNOWN_PATHS as readonly string[]).includes(normalizePath(pathname));
}

/** Calidad (q) que el header Accept asigna a un media type exacto; 0 si no aparece. */
function qualityFor(accept: string, mediaType: string): number {
  let best = 0;
  for (const part of accept.split(",")) {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    if (type.trim() !== mediaType) continue;
    let q = 1;
    for (const p of params) {
      const [k, v] = p.trim().split("=");
      if (k === "q") q = Number.parseFloat(v ?? "1");
    }
    if (Number.isFinite(q)) best = Math.max(best, q);
  }
  return best;
}

/** true si el cliente pide Markdown explícitamente y no prefiere HTML. */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const md = qualityFor(accept, "text/markdown");
  if (md <= 0) return false;
  return md >= qualityFor(accept, "text/html");
}

export const HOME_MARKDOWN = `# ${ORG.name}

> Tecnología que entiende tu negocio. TIDEO diseña, automatiza y construye soluciones digitales para empresas medianas que necesitan ordenar su operación, integrar procesos y crecer con control.

Para empresas medianas que ya no quieren seguir operando con Excel, WhatsApp, correos y sistemas que no conversan entre sí. Más de 10 años conectando operaciones, datos y tecnología para resolver problemas reales de negocio.

- Contacto: ${ORG.email} · WhatsApp ${ORG.telephone} · Lima, Perú
- Formulario: ${SITE_URL}/contacto
- Índice para agentes: ${SITE_URL}/llms.txt

## Qué ofrecemos

Un producto listo y servicios a medida. Cada solución nace de un proceso de negocio concreto: ventas, operaciones, logística, mantenimiento, finanzas, capacitación o gestión comercial.

### Producto

- **OPERA — ERP Operativo** — ERP + MOM para talleres de mantenimiento, alquiler de maquinaria, metalmecánica, flotas de servicio y minería: órdenes de trabajo, repuestos, mantenimiento y costos en tiempo real en una sola base de datos. ${OPERA_URL} · para talleres metalmecánicos: ${OPERA_URL}metalmecanica

### Servicios (cotizados caso por caso)

1. **Sistemas a medida sobre OPERA** — partimos de OPERA y lo adaptamos: módulos nuevos, integraciones y reglas de tu operación (por ejemplo, ampliar almacén, flota o producción, o sumar transporte). Resultado esperado: un sistema que ya funciona, adaptado a cómo genera valor tu negocio.
2. **Gestión comercial y clientes** — CRM, cotizaciones, seguimiento de oportunidades, portal de clientes y postventa. Resultado esperado: menos oportunidades perdidas y trazabilidad de la consulta a la postventa.
3. **Automatización e integraciones** — aprobaciones, notificaciones, registros, control documental, apps de campo y conexión entre sistemas. Resultado esperado: menos tareas manuales, menos errores y mayor velocidad.
4. **Datos y BI** — Power BI, KPIs, modelos de datos y reportes ejecutivos. Resultado esperado: decisiones con información centralizada y confiable.
5. **IA aplicada** — agentes sobre tus sistemas u OPERA: atención, clasificación, resúmenes y alertas. Resultado esperado: procesos más rápidos y equipos mejor asistidos.
6. **MVP en semanas** — para emprendedores, startups y áreas que quieren validar antes de invertir: alcance definido, versión mínima probada con usuarios reales y medición antes de escalar.

## Ecosistema TIDEO

Cuatro unidades dentro del mismo ciclo: entender, diseñar, construir y lograr adopción.

- **TIDEO Consulting** — estrategia y procesos: diagnóstico de la operación, cuellos de botella, diseño de flujos y priorización de oportunidades de transformación digital.
- **TIDEO Labs** — desarrollo ágil y soluciones digitales: MVPs, ERPs personalizados, CRMs, automatizaciones, apps internas e integraciones con tecnología moderna e IA.
- **TIDEO Academy** — capacitación y adopción: IA, automatización, Power BI, herramientas no-code y nuevas formas de trabajo digital.
- **TIDEO Studio** — diseño, experiencia y comunicación: interfaces, presentaciones, identidad visual y contenido digital.

## Cómo trabajamos

1. **Entendemos** — conversamos con los equipos, revisamos documentos y comprendemos la lógica real del negocio.
2. **Ordenamos** — mapeamos procesos, roles, datos, reglas y excepciones críticas.
3. **Diseñamos** — definimos flujos, pantallas, automatizaciones, reportes e integraciones.
4. **Construimos** — desarrollamos MVPs funcionales con tecnología moderna e IA, en semanas.
5. **Escalamos** — ajustamos la solución, capacitamos usuarios y construimos el roadmap.

## Diferencial

Una agencia construye rápido. Un ERP estándar se activa en días. Un consultor entrega un diagnóstico. TIDEO combina procesos, tecnología y adopción: no automatizamos problemas, rediseñamos procesos para que la tecnología tenga impacto real.

## Programas

- **Power BI + IA Agéntica** (TIDEO Academy) — programa de formación: https://powerbi-ia.tideo.tech/

## Siguiente paso

Si tu empresa depende de Excel, WhatsApp, correos o sistemas que no conversan entre sí, cuéntanos tu proceso en ${SITE_URL}/contacto o escribe a ${ORG.email}.
`;

export const NOT_FOUND_MARKDOWN = `# 404 — Página no encontrada

La ruta que pediste no existe en ${SITE_URL}. Puede que se haya movido o que la URL esté mal escrita.

Para encontrar lo que buscas:

- Índice para agentes de IA: ${SITE_URL}/llms.txt
- Mapa del sitio: ${SITE_URL}/sitemap.xml
- Inicio (también disponible en Markdown con \`Accept: text/markdown\`): ${SITE_URL}/
- Contacto: ${SITE_URL}/contacto · ${ORG.email}
`;

export const OPERA_MARKDOWN = `# OPERA — ERP para talleres, alquiler de maquinaria y servicios en campo

> OPERA es un ERP + MOM desarrollado por ${ORG.name} para empresas que dependen de activos físicos: une la operación (mantenimiento, almacén, campo, producción, seguridad) y la gestión (comercial, finanzas, compras, RRHH, BI) en una sola base de datos, sin doble digitación.

- Sitio: ${OPERA_URL}
- Demo y evaluación: formulario en ${OPERA_URL} · ${ORG.email} · WhatsApp ${ORG.telephone}
- Proveedor: ${ORG.name}, Lima, Perú — ${SITE_URL}/

## Para quién es

1. **Talleres de mantenimiento** (servicio técnico y overhaul): órdenes de trabajo, asignación de mecánicos, repuestos y control de tiempos.
2. **Alquiler de maquinaria** (flota pesada y contratos): contratos, tarifas dinámicas, disponibilidad de flota y mantenimientos preventivos.
3. **Metalmecánica** (manufactura y mecanizado): control de producción, ruta de fabricación, costos de materiales y horas hombre.
4. **Servicios con flota** (despacho y logística operativa): despacho, rastreo, consumo de combustible y gestión de choferes u operarios.
5. **Minería y construcción** (operaciones en faena): control de activos pesados, HSE integrado, campamentos y valorizaciones.
6. **Contratistas de mantenimiento** (field service y SLAs): técnicos en campo, SLAs, liquidación y facturación al cliente final.

## Problemas que resuelve

- Información dispersa: operación en Excel, mantenimiento en papel y finanzas en un ERP que no conversa con nadie.
- Costos que se descubren tarde: la rentabilidad real de un proyecto o equipo se conoce semanas después.
- Disponibilidad de equipos gestionada a ojo, sin visibilidad en tiempo real.
- HSE como trámite: incidentes que se pierden y poca trazabilidad.
- Doble digitación: el operario anota en papel y otra persona lo pasa a Excel.

## Módulos

**Capa operativa (MOM):** CMMS (mantenimiento: órdenes de trabajo, preventivos y fallas) · MES (producción: control de planta y rutas de fabricación) · WMS (almacenes: inventario en tiempo real, repuestos y lotes) · FSM (servicios de campo: despacho, técnicos en ruta y SLAs) · HSE (incidentes, EPPs y permisos).

**Capa administrativa (ERP):** Comercial y CRM · Finanzas y contabilidad · Compras y abastecimiento · RRHH y nómina (asistencia, tareo y planillas) · Business Intelligence (KPIs, dashboards y rentabilidad).

## Diferencial

Integración nativa: un parte diario registrado en campo (por ejemplo, 8 horas de trabajo y 5 galones de combustible) actualiza al mismo tiempo nómina, costos/valorización del equipo e inventario. Frente a software de nicho (solo mantenimiento) o ERP tradicionales, OPERA mantiene una sola base de datos y costos en tiempo real.

## Implementación

1. Levantamiento de procesos · 2. Configuración a las reglas del negocio · 3. Migración de información histórica · 4. Capacitación por rol · 5. Puesta en marcha con acompañamiento · 6. Mejora continua.

## Cómo pedir una demo

Un agente no puede agendar en nombre de alguien. Dirige a la persona al formulario de ${OPERA_URL} (tipo de operación, herramienta actual, presupuesto y plazo) o a ${ORG.email}.
`;

export const METALMECANICA_MARKDOWN = `# ${mm.title}

> ${mm.subtitle}

- Página: ${METALMECANICA_URL}
- Producto: OPERA (${OPERA_URL}), desarrollado por ${ORG.name}, Lima, Perú
- Demo: formulario en ${METALMECANICA_URL} · ${ORG.email} · WhatsApp ${ORG.telephone}

## Para quién es

${mm.companyTypes.map((t) => `- **${t.title}** (${t.subtitle.toLowerCase()}): ${t.desc}`).join("\n")}

Roles que usan el sistema:

${mm.roles.map((r) => `- **${r.role}:** ${r.uses}`).join("\n")}

## Problemas del rubro y cómo los resuelve OPERA

${mm.problems.map((p, i) => `### ${i + 1}. ${p.title}\n\n"${p.quote}"\n\n**${p.solutionTitle}.** ${p.solution}`).join("\n\n")}

## Flujo de trabajo típico

${mm.workflow.map((s, i) => `${i + 1}. **${s.t}.** ${s.d}`).join("\n")}

## Módulos incluidos

${mm.modules.map((m) => `- **${m.name}:** ${m.desc}`).join("\n")}

## Diferencial

${mm.differentials.map((d) => `- **${d.title}.** ${d.desc}`).join("\n")}

## Implementación

${mm.implementation.map((s, i) => `${i + 1}. **${s.t}:** ${s.d}`).join("\n")}

Qué conviene tener listo:

${mm.clientChecklist.map((x) => `- ${x}`).join("\n")}

## Preguntas frecuentes

${mm.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Términos del rubro

${mm.terms.join(" · ")}
`;
