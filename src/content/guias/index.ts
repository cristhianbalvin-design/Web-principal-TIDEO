/**
 * Contenido de /guias. Una sola estructura para guías, series de prompts, tutoriales
 * y herramientas: cada pieza de redes puede terminar en una de estas publicaciones.
 * Reglas: sin cifras inventadas, sin clientes ni testimonios no autorizados.
 */

/** Bloques compartidos por guías, series de prompts, tutoriales y herramientas. */
export type BloqueContenido =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "lista"; ordenada: boolean; items: string[] }
  | { tipo: "tabla"; columnas: string[]; filas: string[][] }
  | { tipo: "prompts"; items: string[] };

export type Publicacion = {
  tipo: "guia" | "prompts" | "tutorial" | "herramienta";
  slug: string;
  titulo: string;
  bajada: string;
  serie: string;
  /** Fecha ISO (AAAA-MM-DD). */
  fecha: string;
  lectura: string;
  introduccion: BloqueContenido[];
  secciones: { id: string; numero: string; titulo: string; bloques: BloqueContenido[] }[];
  nota: string;
  fuentes: { titulo: string; url: string }[];
};

export const TIPO_LABEL: Record<Publicacion["tipo"], string> = {
  guia: "Guía",
  prompts: "Prompts",
  tutorial: "Tutorial",
  herramienta: "Herramienta",
};

/** "2026-10-30" → "30 oct 2026" (hora de Lima, sin depender del huso del servidor). */
export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Lima",
  })
    .format(date)
    .replace(".", "")
    .replace(/ de /g, " ");
}

export const delTableroAlAgente: Publicacion = {
  tipo: "guia",
  slug: "del-tablero-al-agente",
  titulo: "Del tablero al agente: guía práctica de BI con IA agéntica",
  bajada:
    "Qué cambia cuando un agente de IA trabaja sobre tus datos, qué necesita tu modelo para responder bien y cómo empezar sin promesas mágicas.",
  serie: "Datos que deciden",
  fecha: "2026-10-30",
  lectura: "8 min",
  introduccion: [
    {
      tipo: "parrafo",
      texto:
        "Un tablero te dice **qué** pasó. Para entender **por qué** pasó, alguien todavía tiene que filtrar, cruzar tablas y armar un informe. La IA agéntica cambia esa parte del trabajo: un agente conectado a tu modelo de datos puede responder preguntas escritas como las harías tú, explicar de dónde sale la respuesta y preparar el siguiente paso.",
    },
    {
      tipo: "parrafo",
      texto:
        'Esta guía es la versión completa de nuestra pieza "Del tablero al agente". No vende una herramienta: explica qué cambia, qué tiene que estar ordenado antes y cómo probarlo con criterio.',
    },
  ],
  secciones: [
    {
      id: "tablero-asistente-agente",
      numero: "01",
      titulo: "Tablero, asistente y agente no son lo mismo",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Tablero", "Asistente de preguntas", "Agente"],
          filas: [
            [
              "Qué hace",
              "Muestra indicadores ya definidos",
              "Responde preguntas sobre los datos",
              "Responde, explica y ejecuta tareas acotadas",
            ],
            ["Quién hace el análisis", "Tú", "Tú, con ayuda", "El agente prepara; tú decides"],
            [
              "Ejemplo",
              '"Ventas por mes"',
              '"¿Cuánto vendimos en octubre?"',
              '"¿Por qué bajaron las ventas? Prepárame el resumen para el comité"',
            ],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Un agente no reemplaza al tablero: lo usa como punto de partida. El tablero sigue siendo la vista compartida; el agente acorta el camino entre ver un número y entenderlo.",
        },
      ],
    },
    {
      id: "dia-a-dia",
      numero: "02",
      titulo: "Qué cambia en el día a día",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "**Antes:** ves la caída → alguien filtra → cruza tablas → arma un informe → la respuesta llega cuando la conversación ya avanzó.",
        },
        {
          tipo: "parrafo",
          texto:
            "**Con un agente:** ves la caída → preguntas → el agente consulta el modelo, explica qué encontró y muestra los datos que usó → tú verificas y decides.",
        },
        {
          tipo: "parrafo",
          texto:
            "Lo importante no es la velocidad sola: es que la pregunta la hace quien necesita la respuesta, en el momento en que la necesita.",
        },
      ],
    },
    {
      id: "modelo-de-datos",
      numero: "03",
      titulo: "Lo que no cambia: el modelo de datos manda",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            'Un agente responde tan bien como el modelo sobre el que trabaja. Si tienes tres medidas distintas llamadas "ventas", nombres técnicos que nadie entiende o relaciones mal hechas, el agente se va a equivocar con mucha seguridad. Por eso el primer trabajo no es "poner IA": es ordenar el modelo.',
        },
      ],
    },
    {
      id: "checklist",
      numero: "04",
      titulo: "Checklist: ¿tu modelo está listo para un agente?",
      bloques: [
        {
          tipo: "lista",
          ordenada: true,
          items: [
            "**Esquema en estrella.** Tablas de hechos (ventas, pedidos) separadas de dimensiones (clientes, productos, fechas).",
            '**Nombres de negocio.** "Ventas netas", no "SUM_VTA_2". Tablas, columnas y medidas con el nombre que usa tu equipo.',
            "**Descripciones.** Cada medida clave dice qué incluye y qué excluye (por ejemplo, si descuenta devoluciones).",
            "**Una sola definición por indicador.** Si hay dos formas de calcular margen, decide cuál es la oficial.",
            "**Tabla de fechas** marcada como tal y relaciones correctas con los hechos.",
            '**Sinónimos.** Si tu equipo dice "facturación" cuando habla de ventas, el modelo debe saberlo.',
            "**Seguridad y permisos.** El agente solo debe ver lo que la persona que pregunta puede ver.",
            "**Preguntas de prueba con respuesta conocida.** Antes de abrirlo al equipo, compara lo que responde el agente con lo que ya sabes que es correcto.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Si fallas en tres o más puntos, empieza por el modelo. Es el trabajo menos vistoso y el que más diferencia hace.",
        },
      ],
    },
    {
      id: "power-bi",
      numero: "05",
      titulo: "Un ejemplo con Power BI",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Usamos Power BI como ejemplo porque es la herramienta con la que trabajamos a diario. Las funciones cambian rápido; revisa siempre la documentación oficial antes de decidir.",
        },
        {
          tipo: "lista",
          ordenada: false,
          items: [
            '**Copilot en Power BI y "Prep data for AI"** (en vista previa al momento de escribir esta guía): permite definir qué parte del modelo usa la IA, guardar *respuestas verificadas* asociadas a frases frecuentes y escribir *instrucciones para la IA* con el contexto del negocio. Microsoft advierte que las respuestas no son deterministas: la misma pregunta puede dar salidas distintas.',
            "**Agentes de datos de Microsoft Fabric:** responden preguntas en lenguaje natural sobre modelos semánticos y otras fuentes, generando la consulta por detrás y respetando los permisos de quien pregunta. Requieren capacidad de Fabric; revisa los requisitos de licencia de tu organización.",
            "**Para quienes construyen modelos:** Microsoft publicó un servidor MCP local (en vista previa) que permite a un agente inspeccionar el modelo, ejecutar DAX y proponer cambios. Microsoft lo documenta con GitHub Copilot en VS Code, pero es un servidor MCP estándar: también se conecta a otros clientes que aceptan servidores MCP locales, como **Claude** (la app de escritorio o Claude Code) o **Gemini CLI**. **ChatGPT**, en cambio, solo se conecta a servidores MCP remotos, así que no funciona directo con este servidor local. Haz una copia del modelo antes de empezar y revisa cada cambio antes de publicar.",
            "**Para consultar modelos ya publicados:** Microsoft tiene además un servidor MCP remoto (también en vista previa) que permite a un agente consultar un modelo semántico con los permisos de quien pregunta. Hoy lo documenta con GitHub Copilot en VS Code.",
          ],
        },
      ],
    },
    {
      id: "preguntas",
      numero: "06",
      titulo: "Cinco preguntas para probar a tu agente",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Copia estas preguntas y adáptalas a tus datos. Sirven tanto para evaluar una herramienta como para validar tu propio modelo.",
        },
        {
          tipo: "prompts",
          items: [
            "¿Cuáles fueron las ventas netas del último mes cerrado frente al mes anterior? Indica qué medida usaste.",
            "¿Qué producto, cliente o región explica la mayor parte de la variación?",
            "Muéstrame la tabla con los datos que usaste para llegar a esa conclusión.",
            "¿Qué preguntas no puedes responder con este modelo?",
            "Prepara un resumen de cinco líneas para el comité. No incluyas cifras que no estén en el modelo.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Si el agente no puede decirte qué medida usó o no puede mostrarte los datos, todavía no está listo para decisiones.",
        },
      ],
    },
    {
      id: "riesgos",
      numero: "07",
      titulo: "Riesgos y cómo cuidarlos",
      bloques: [
        {
          tipo: "lista",
          ordenada: false,
          items: [
            "**Respuestas plausibles pero incorrectas.** Pide siempre trazabilidad (qué medida, qué filtro) y valida con preguntas de respuesta conocida.",
            "**Permisos de más.** Empieza en solo lectura y con el mínimo acceso necesario.",
            "**Datos sensibles.** Revisa qué información puede ver el agente y dónde se procesa.",
            "**Acciones sin control.** Las primeras acciones deben ser reversibles: borradores de resúmenes, propuestas de alerta. Una persona aprueba antes de enviar.",
          ],
        },
      ],
    },
    {
      id: "como-empezar",
      numero: "08",
      titulo: "Cómo empezar, en cuatro pasos",
      bloques: [
        {
          tipo: "lista",
          ordenada: true,
          items: [
            "**Elige una pregunta frecuente** del negocio, la que hoy te cuesta un informe cada mes.",
            "**Ordena el modelo para esa pregunta** usando el checklist del punto 04.",
            "**Prueba con diez preguntas** cuya respuesta ya conoces.",
            "**Recién entonces agrega una acción** (un resumen, un aviso), con aprobación humana.",
          ],
        },
      ],
    },
  ],
  nota: "Ejemplos ilustrativos. Esta guía no incluye cifras de clientes ni resultados prometidos.",
  fuentes: [
    {
      titulo: "Microsoft Learn — Prepare your data for AI (Copilot en Power BI)",
      url: "https://learn.microsoft.com/power-bi/create-reports/copilot-prepare-data-ai",
    },
    {
      titulo: "Microsoft Learn — Power BI agentic development",
      url: "https://learn.microsoft.com/en-us/power-bi/developer/agentic/power-bi-agentic-overview",
    },
    {
      titulo: "Microsoft Learn — Power BI MCP servers overview",
      url: "https://learn.microsoft.com/en-us/power-BI/developer/mcp/mcp-servers-overview",
    },
    {
      titulo: "GitHub — microsoft/powerbi-modeling-mcp",
      url: "https://github.com/microsoft/powerbi-modeling-mcp",
    },
    {
      titulo: "Model Context Protocol — Conectar servidores MCP locales (Claude Desktop)",
      url: "https://modelcontextprotocol.io/docs/develop/connect-local-servers",
    },
    {
      titulo: "Gemini CLI — Servidores MCP",
      url: "https://geminicli.com/docs/tools/mcp-server/",
    },
  ],
};

export const publicaciones: Publicacion[] = [delTableroAlAgente];
