/**
 * Contenido para agentes de IA servido por middleware.ts:
 * - HOME_MARKDOWN: la home en Markdown (Accept: text/markdown en "/", y /index.md).
 * - NOT_FOUND_MARKDOWN: cuerpo del 404 cuando el agente pide Markdown.
 * - KNOWN_PATHS: rutas que existen. Todo lo demás es 404.
 *
 * Si cambias el copy de la home (src/components/site/*), actualiza HOME_MARKDOWN.
 * Si agregas una ruta, agrégala a KNOWN_PATHS, a public/sitemap.xml y a vite.config.ts.
 */
import { ORG, SITE_URL } from "./site";

export const KNOWN_PATHS = [
  "/",
  "/contacto",
  "/nosotros",
  "/privacidad",
  "/opera",
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

## Soluciones

Cada solución nace de un proceso de negocio concreto: ventas, operaciones, logística, mantenimiento, finanzas, capacitación o gestión comercial.

1. **ERP operativo a medida** — para empresas de servicios, operaciones o mantenimiento. Procesos, costos, órdenes de trabajo, compras, almacén y reportes. Resultado esperado: control integral de la operación desde una sola plataforma.
2. **CRM comercial inteligente** — para empresas B2B con venta consultiva. Pipeline, tareas, interacciones y reportes comerciales. Resultado esperado: menos oportunidades perdidas y mayor trazabilidad comercial.
3. **Automatización administrativa** — para áreas administrativas, finanzas, RRHH y operaciones. Aprobaciones, notificaciones, registros y control documental. Resultado esperado: menos tareas manuales, menos errores y mayor velocidad.
4. **Dashboards gerenciales** — para gerencias que necesitan visibilidad. Power BI, KPIs, modelos de datos y reportes ejecutivos. Resultado esperado: decisiones con información centralizada y confiable.
5. **Portales y apps internas** — para equipos de campo, ventas, operaciones o soporte. Captura de datos, formularios y trazabilidad en tiempo real.
6. **Agentes e IA aplicada** — para empresas que buscan aumentar productividad. Atención, clasificación, resumen y generación con IA.

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

## Productos y programas

- **OPERA** — ERP + MOM para operaciones con activos intensivos (alquiler de maquinaria, talleres y servicios en campo): https://opera.tideo.tech/
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
