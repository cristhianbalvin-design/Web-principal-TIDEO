/**
 * Contenido de la landing "De Excel a tu Propia App con IA" (AI Business Builder · Nivel 1).
 *
 * Fuente: documento de copy comercial de TIDEO (nov-2026). Las notas internas entre
 * corchetes del documento NO se publican; lo pendiente de definir (docente, IGV, política
 * de inasistencias, mínimo de apertura, constancia, grabaciones) queda fuera de la página
 * hasta que esté confirmado.
 *
 * Editar el copy aquí, no en los componentes.
 */

export const COURSE = {
  name: "De Excel a tu Propia App con IA",
  program: "AI Business Builder",
  level: "Nivel 1",
  cohort: "Primera cohorte",
  hours: 24,
  sessions: 6,
  maxSeats: 12,
  mentoringMinutes: 60,
  priceFounder: 790,
  priceRegular: 890,
  currency: "PEN",
  startDate: "2026-12-05",
  endDate: "2027-01-23",
  startLabel: "sábado 5 de diciembre de 2026",
  startShort: "5 dic.",
  schedule: "9:00 a. m. a 1:00 p. m. (hora de Perú)",
  scheduleShort: "9:00 a. m. – 1:00 p. m.",
  mode: "Virtual en vivo",
} as const;

export const formatPEN = (n: number) => `S/ ${n.toLocaleString("es-PE")}`;

export const SEO = {
  title: "De Excel a tu Propia App con IA | TIDEO AI Business Builder",
  description:
    "Aprende a construir tu primera app empresarial con inteligencia artificial. 24 horas en vivo, app de referencia guiada, MVP funcional propio y mentoría individual. Inicio 5 de diciembre de 2026.",
  ogTitle: "Construye tu propia App Empresarial con IA | TIDEO",
  ogDescription:
    "No solo aprendas prompts: construye una app de referencia guiada y desarrolla tu propio MVP funcional con mentoría personalizada. Primera cohorte, diciembre 2026.",
} as const;

export const WHATSAPP_MESSAGE =
  "Hola TIDEO, quiero información del curso De Excel a tu Propia App con IA.";

/* ───────────────────────── 3 · La promesa ───────────────────────── */

export const PROMISE = [
  {
    title: "Construir una app de referencia en grupo",
    text: "Seguirás una ruta guiada, con prompts y explicaciones compartidas, para comprender el proceso de principio a fin.",
  },
  {
    title: "Definir tu propio MVP",
    text: "Seleccionarás una necesidad concreta y delimitarás qué funcionalidades sí entran en el curso y cuáles quedarán para una segunda etapa.",
  },
  {
    title: "Crear tu aplicación con apoyo de IA",
    text: "Desarrollarás pantallas, formularios, estructura de datos, reglas de negocio y operaciones de tu caso.",
  },
  {
    title: "Revisar y corregir",
    text: "Aprenderás a probar funcionalidades, detectar errores y pedir correcciones de manera estructurada.",
  },
  {
    title: "Publicar tu aplicación",
    text: "Presentarás tu aplicación funcionando, la dejarás publicada y lista para usarse, y recibirás una ruta clara para seguir evolucionándola.",
  },
] as const;

/* ───────────────────────── 4 · Para quién ───────────────────────── */

export const AUDIENCE_YES = [
  "Trabajas en operaciones, logística, compras, finanzas, recursos humanos, administración, calidad, mantenimiento, servicios, ventas o gestión de proyectos.",
  "Eres ingeniero industrial, administrador, analista, coordinador, supervisor o jefe de área y quieres resolver una necesidad de tu equipo.",
  "Eres emprendedor o diriges una pyme y necesitas ordenar una parte de tu operación mediante una aplicación propia.",
  "Eres consultor y quieres incorporar el desarrollo asistido por IA a tu capacidad de resolver problemas empresariales.",
  "Utilizas Excel para gestionar procesos y te interesa dar el siguiente paso hacia una aplicación web propia.",
  "Quieres aprender construyendo, con orientación individual para tu caso y no únicamente observando ejercicios del instructor.",
] as const;

export const AUDIENCE_NO =
  "No es el programa adecuado si buscas aprender ingeniería de software desde cero con profundidad académica, o construir en seis sesiones un ERP completo o un sistema crítico que integre toda la operación de la empresa.";

/* ───────────────────────── 5 · Diferencia ───────────────────────── */

export const DIFFERENCES = [
  {
    title: "Empiezas construyendo, no acumulando teoría",
    text: "En las primeras seis horas desarrollamos juntos una aplicación de referencia funcional. Aprendes viendo cómo un requerimiento se convierte en interfaz, datos y funcionalidades.",
  },
  {
    title: "Después, el proyecto es tuyo",
    text: "A partir de la tercera sesión ya no tienes que desarrollar exactamente el mismo caso que los demás. Trabajas en tu propio MVP, con un alcance acordado y metas de avance concretas.",
  },
  {
    title: "Tienes asesoría individual garantizada",
    text: "Cada participante recibe 60 minutos de atención exclusiva, distribuidos en tres turnos de 20 minutos durante los laboratorios. Tu asesoría se concentra en tus decisiones, bloqueos y mejoras; no se diluye en una clase masiva.",
  },
  {
    title: "Aprendes en un grupo reducido",
    text: "Máximo 12 participantes por cohorte. Los doce asisten a las mismas sesiones. Mientras el instructor asesora individualmente a algunos, el resto continúa avanzando en su aplicación con guías e hitos de trabajo.",
  },
  {
    title: "Aprendes metodología, no dependencia de una plataforma",
    text: "Las herramientas evolucionan. Por eso trabajamos habilidades transferibles: definir requerimientos, estructurar datos, formular instrucciones a la IA, validar resultados, corregir errores y decidir qué merece convertirse en una funcionalidad.",
  },
  {
    title: "Este es el comienzo de una ruta más grande",
    text: "Tu MVP no tiene por qué quedarse donde termina el primer curso. Este es el Nivel 1 de AI Business Builder, una ruta modular para construir soluciones empresariales cada vez más completas.",
  },
] as const;

/* ───────────────────────── 6 · Método ───────────────────────── */

export const PHASES = [
  {
    tag: "Fase 1",
    title: "Construcción guiada",
    hours: 6,
    when: "Sesiones 1 y 2",
    text: "Construiremos una aplicación empresarial de referencia siguiendo la misma metodología y secuencia de prompts. Verás cómo definir el alcance, diseñar las primeras pantallas, organizar la información y conectar las funciones esenciales.",
  },
  {
    tag: "Fase 2",
    title: "Laboratorio de MVP con asesoría",
    hours: 12,
    when: "Sesiones 3 a 6 · 3 horas por sesión",
    text: "Cada participante desarrolla su propio proyecto. El instructor revisa avances en turnos de asesoría individual; los demás trabajan simultáneamente en sus aplicaciones. Cada alumno recibe tres turnos de 20 minutos: una hora acumulada de mentoría personalizada.",
  },
  {
    tag: "Fase 3",
    title: "Complementos y preguntas grupales",
    hours: 6,
    when: "2 h en la sesión 2 y 1 h en cada sesión 3 a 6",
    text: "Conceptos prácticos sobre alcance del MVP, datos, prompts, depuración, pruebas, fundamentos de seguridad, publicación de la aplicación y siguientes pasos. También resolvemos dudas que pueden beneficiar a todo el grupo.",
  },
] as const;

export const MENTORING_STEPS = [
  "Durante las primeras 3 horas, todos trabajan en paralelo. El instructor atiende turnos individuales de 20 minutos.",
  "Mientras recibes asesoría, nos enfocamos en la decisión o bloqueo más importante de tu proyecto: requerimientos, estructura de datos, prompt, error, prueba o siguiente funcionalidad.",
  "Cuando no estás en tu turno, continúas avanzando con una guía de trabajo y una lista de objetivos para esa sesión.",
  "En la última hora, el grupo completo recibe contenido complementario y comparte preguntas y aprendizajes.",
] as const;

/* ───────────────────────── 7 · Temario ───────────────────────── */

export interface Session {
  n: number;
  date: string;
  dateShort: string;
  title: string;
  phase: 1 | 2;
  topics: string[];
  deliverable: string;
  /** El copy usa "Entregables" (plural) en las sesiones 2 y 6. */
  plural?: boolean;
}

export const SESSIONS: Session[] = [
  {
    n: 1,
    date: "Sábado 5 de diciembre de 2026",
    dateShort: "5 dic.",
    title: "De la idea a la primera versión de una aplicación",
    phase: 1,
    topics: [
      "Qué es un MVP y cómo evitar que el alcance crezca sin control.",
      "Cómo expresar una necesidad empresarial en requerimientos claros.",
      "Cómo conversar con la IA para construir una aplicación por etapas.",
      "Diseño de pantallas, formularios y flujo de uso.",
      "Construcción conjunta de la primera versión de la app de referencia.",
    ],
    deliverable: "Primera versión funcional de la aplicación guiada.",
  },
  {
    n: 2,
    date: "Sábado 12 de diciembre de 2026",
    dateShort: "12 dic.",
    title: "App de referencia terminada + diseño de tu propio MVP",
    phase: 1,
    topics: [
      "Finalización de la app de referencia: datos, creación, consulta y actualización de registros.",
      "Pruebas de funcionamiento y corrección de errores frecuentes.",
      "Cómo traducir un problema propio a una aplicación concreta.",
      "Definición del alcance, pantallas, datos y funcionalidades de cada MVP.",
      "Revisión de criterios para seleccionar un proyecto realizable dentro del curso.",
    ],
    deliverable: "App de referencia terminada y ficha de alcance del proyecto personal.",
    plural: true,
  },
  {
    n: 3,
    date: "Sábado 19 de diciembre de 2026",
    dateShort: "19 dic.",
    title: "Tu MVP: arquitectura mínima y primer desarrollo",
    phase: 2,
    topics: [
      "3 horas de laboratorio con avance autónomo y turnos de asesoría individual.",
      "Desarrollo de la estructura del proyecto, pantallas y datos principales.",
      "1 hora grupal: prompts de iteración, control del alcance y organización del trabajo.",
    ],
    deliverable: "Estructura inicial del MVP propio y backlog priorizado.",
  },
  {
    n: 4,
    date: "Sábado 9 de enero de 2027",
    dateShort: "9 ene.",
    title: "Funcionalidades y datos que realmente funcionen",
    phase: 2,
    topics: [
      "3 horas de laboratorio con avance autónomo y turnos de asesoría individual.",
      "Construcción de funcionalidades esenciales, formularios y consultas.",
      "1 hora grupal: modelamiento de datos, depuración y validación de datos.",
    ],
    deliverable: "Flujo principal del MVP en funcionamiento.",
  },
  {
    n: 5,
    date: "Sábado 16 de enero de 2027",
    dateShort: "16 ene.",
    title: "Del prototipo a un MVP verificable",
    phase: 2,
    topics: [
      "3 horas de laboratorio con avance autónomo y turnos de asesoría individual.",
      "Corrección de errores, mejora del flujo de usuario y revisión de datos.",
      "1 hora grupal: pruebas funcionales, permisos y fundamentos de seguridad.",
    ],
    deliverable: "Aplicación probada y lista para publicar.",
  },
  {
    n: 6,
    date: "Sábado 23 de enero de 2027",
    dateShort: "23 ene.",
    title: "Presenta tu aplicación y define su siguiente versión",
    phase: 2,
    topics: [
      "3 horas de laboratorio con últimos ajustes y turnos de asesoría individual.",
      "Presentación de tu aplicación y revisión de criterios de aceptación.",
      "1 hora grupal: publicación de la aplicación, puesta en uso con tu equipo y plan de mejoras.",
    ],
    deliverable: "Tu aplicación publicada y lista para usarse, y su hoja de ruta de evolución.",
    plural: true,
  },
];

/* ───────────────────────── 8 · Proyectos ───────────────────────── */

export const PROJECT_EXAMPLES = [
  {
    area: "Logística",
    title: "Control de inventarios",
    text: "Catálogo de productos, entradas y salidas, existencias actualizadas e indicadores de stock mínimo.",
  },
  {
    area: "Operaciones",
    title: "Seguimiento de solicitudes internas",
    text: "Registro de requerimientos, responsables, prioridades, estados e historial de cambios.",
  },
  {
    area: "Ventas",
    title: "Gestión comercial (CRM)",
    text: "Clientes, oportunidades, etapas de venta, actividades y seguimiento por vendedor.",
  },
  {
    area: "Mantenimiento y servicios",
    title: "Órdenes de trabajo",
    text: "Registro, asignación a técnicos, avance por estado e historial por cliente o equipo.",
  },
  {
    area: "Compras",
    title: "Requerimientos y compras",
    text: "Solicitudes de compra, aprobación por responsable, prioridades y trazabilidad de cada pedido.",
  },
  {
    area: "Recursos humanos",
    title: "Gestión de personal",
    text: "Legajo del colaborador, solicitudes de vacaciones y permisos, y seguimiento del onboarding.",
  },
  {
    area: "Finanzas",
    title: "Cuentas por cobrar",
    text: "Facturas pendientes, vencimientos, compromisos de pago y seguimiento de cobranza por cliente.",
  },
  {
    area: "Calidad y SST",
    title: "Inspecciones y no conformidades",
    text: "Registro de inspecciones, hallazgos, acciones correctivas e incidentes de seguridad.",
  },
  {
    area: "Proyectos",
    title: "Control de proyectos",
    text: "Tareas, responsables, hitos, avance por etapa y registro de entregables.",
  },
] as const;

/** Qué tiene un MVP funcional al cerrar el curso. */
export const MVP_FEATURES = [
  "Un proceso real de tu negocio resuelto de punta a punta, desde el registro hasta el seguimiento.",
  "Base de datos en la nube con la estructura de información de tu caso.",
  "Acceso con usuarios y permisos según el rol de cada persona.",
  "Formularios, consultas, filtros y reglas de negocio que validan la información.",
  "Aplicación publicada en la web, con tus datos y tu código versionado, lista para que tu equipo la use.",
] as const;

/** Temas avanzados que no forman parte del MVP del Nivel 1. */
export const ADVANCED_TOPICS = [
  "Automatizaciones, aprobaciones en cadena y alertas entre procesos.",
  "Agentes de IA que consultan información y ejecutan acciones.",
  "Integraciones con ERP, contabilidad u otros sistemas corporativos.",
  "Pagos en línea y módulos contables o tributarios.",
  "Arquitecturas multiempresa (multitenant) y alta concurrencia.",
  "Alta disponibilidad, monitoreo y soporte para operaciones críticas a gran escala.",
] as const;

/* ───────────────────────── Stack tecnológico ───────────────────────── */

export const STACK = [
  {
    name: "Lovable",
    alt: "Claude Design",
    role: "Construyen la aplicación",
    text: "Generan la interfaz y la lógica de tu aplicación web a partir de instrucciones en lenguaje natural. Aquí das forma a pantallas, formularios y flujos de trabajo; usarás la que mejor se adapte a tu proyecto.",
  },
  {
    name: "Supabase",
    role: "Guarda los datos y gestiona usuarios",
    text: "Backend en la nube sobre PostgreSQL: almacena la información de tu app, maneja el inicio de sesión y controla quién puede ver o modificar cada dato.",
  },
  {
    name: "GitHub",
    role: "Versiona el código",
    text: "Repositorio donde vive el código de tu aplicación. Registra cada cambio, permite volver a versiones anteriores y conecta el proyecto con los agentes y con la publicación.",
  },
  {
    name: "Vercel",
    role: "Publica en la web",
    text: "Publica tu aplicación en internet con su propia URL, para que tu equipo la use desde cualquier dispositivo.",
  },
] as const;

export const AGENTS_INTRO =
  "Trabajan directamente sobre el código de tu proyecto: leen el repositorio, proponen y aplican cambios, corrigen errores y explican lo que hicieron. Los usamos cuando la aplicación necesita ajustes que van más allá de lo que conviene pedir en Lovable o Claude Design.";

export const AGENTS = [
  {
    name: "Claude Code",
    maker: "Anthropic",
    text: "Entiende el proyecto completo, implementa funcionalidades que tocan varios archivos y depura errores paso a paso.",
  },
  {
    name: "Codex",
    maker: "OpenAI",
    text: "Ejecuta tareas de desarrollo y revisiones de código: útil para resolver cambios concretos y validar lo que ya se construyó.",
  },
  {
    name: "Gemini",
    maker: "Google",
    text: "Analiza código con un contexto amplio, genera componentes y explica cómo funciona cada parte de la aplicación.",
  },
] as const;

export const STACK_NOTE =
  "Varias de estas herramientas tienen planes gratuitos o de prueba con límites que cambian, y algunas funciones o agentes requieren un plan de pago. Antes del inicio te indicaremos qué cuentas crear y qué costos externos, si los hubiera, debes considerar.";

/* ───────────────────────── 10 · No solo prompts ───────────────────────── */

export const SKILLS = [
  {
    title: "Entender el negocio",
    text: "Antes de abrir una herramienta, definimos qué problema se busca resolver, quién utilizará la aplicación y qué resultado se espera.",
  },
  {
    title: "Pensar en procesos y datos",
    text: "Un MVP necesita reglas y estructuras comprensibles. Aprenderás a organizar esa información antes de pedir grandes cambios a la IA.",
  },
  {
    title: "Construir por incrementos",
    text: "Evitaremos el enfoque de pedirle a la IA una aplicación enorme de una sola vez. Construiremos, revisaremos y mejoraremos por etapas.",
  },
  {
    title: "Validar lo que la IA genera",
    text: "Una respuesta convincente no garantiza software correcto. Tendrás criterios claros para probar el flujo principal, detectar fallas y reconocer limitaciones.",
  },
  {
    title: "Prepararte para evolucionar",
    text: "Construirás el primer MVP con la vista puesta en una siguiente versión que pueda automatizar tareas, conectarse con otros sistemas o incorporar capacidades de IA.",
  },
] as const;

/* ───────────────────────── 11 · Ruta ───────────────────────── */

export const LEVELS = [
  {
    n: 1,
    title: "De Excel a tu Propia App con IA",
    text: "Crea tu primer MVP empresarial. Este es el curso que estás por comenzar.",
    current: true,
  },
  {
    n: 2,
    title: "Tu Negocio en Piloto Automático",
    text: "Incorpora automatizaciones, aprobaciones, alertas e integraciones para reducir tareas manuales dentro de la aplicación que ya construiste.",
    current: false,
  },
  {
    n: 3,
    title: "Construye tu Equipo de Agentes IA",
    text: "Diseña agentes que consulten información, apoyen decisiones y ejecuten acciones autorizadas bajo supervisión.",
    current: false,
  },
  {
    n: 4,
    title: "De App a Sistema Empresarial",
    text: "Integración, controles, seguridad, mantenimiento y criterios de arquitectura para sistemas que empiezan a crecer.",
    current: false,
  },
  {
    n: 5,
    title: "Lanza tu Solución Empresarial con IA",
    text: "Consolida, valida y presenta una versión más madura de tu solución, con criterios de implementación y un plan de evolución.",
    current: false,
  },
] as const;

/* ───────────────────────── 13-14 · Inversión y requisitos ───────────────────────── */

export const INCLUDES = [
  "24 horas de formación y laboratorio en vivo.",
  "Construcción guiada de una aplicación de referencia.",
  "Desarrollo de un MVP personal, sujeto a alcance validado.",
  "60 minutos de asesoría individual exclusiva, distribuidos en tres turnos.",
  "Guía de prompts y metodología de trabajo utilizada durante el curso.",
  "Ejercicios, criterios de prueba y lista de verificación del MVP.",
  "Espacios grupales de preguntas y resolución de problemas comunes.",
  "Orientación sobre cómo continuar evolucionando tu aplicación.",
  "Certificado de TIDEO Tech & Strategy avalado por el docente.",
] as const;

export const REQUIREMENTS = [
  "Computadora personal con navegador actualizado, conexión estable y posibilidad de instalar o autorizar herramientas cuando sea necesario.",
  "Manejo habitual de archivos, hojas de cálculo y aplicaciones web.",
  "Cuentas en Lovable o Claude, Supabase, GitHub y Vercel; te indicaremos cómo crearlas antes del inicio.",
  "Una idea de proceso, registro o problema empresarial que te interese convertir en aplicación.",
  "Disponibilidad para trabajar en tu MVP durante las sesiones y, si lo deseas, seguir avanzando entre clases.",
  "Disposición para realizar pruebas, corregir errores y adaptar tu proyecto al alcance permitido por el curso.",
] as const;

/* ───────────────────────── 16 · FAQ ───────────────────────── */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Necesito saber programar?",
    a: "No necesitas dominar un lenguaje de programación. El curso está diseñado para profesionales de negocio. Sí necesitarás familiarizarte con conceptos de aplicaciones, datos y pruebas, que trabajaremos durante las sesiones.",
  },
  {
    q: "¿Todos construiremos la misma aplicación?",
    a: "Durante las primeras seis horas construiremos juntos una aplicación de referencia. Después cada participante desarrollará su propio MVP, de acuerdo con el alcance validado.",
  },
  {
    q: "¿Puedo desarrollar una idea completamente diferente a la del instructor?",
    a: "Sí, siempre que sea viable dentro del tiempo y los recursos disponibles. Antes de iniciar el laboratorio personalizado revisaremos tu idea y definiremos un MVP funcional y viable dentro del curso.",
  },
  {
    q: "¿Puedo construir un ERP o un sistema de ventas completo?",
    a: "Puedes trabajar un proceso específico —por ejemplo, gestionar solicitudes, controlar inventarios o dar seguimiento a servicios—, pero no un ERP completo. El Nivel 1 se enfoca en un MVP funcional de un proceso de negocio; los módulos integrados y las capacidades avanzadas llegan en los siguientes niveles.",
  },
  {
    q: "¿Cuántas horas de asesoría personalizada tendré?",
    a: "Tendrás 60 minutos de asesoría individual exclusiva, repartidos en tres sesiones de 20 minutos. Están incluidos dentro de las 12 horas de laboratorio del programa y no se suman a las 24 horas anunciadas.",
  },
  {
    q: "¿Qué hacen los demás alumnos cuando estás asesorando a otra persona?",
    a: "Todos siguen conectados y avanzan en paralelo sobre sus propios proyectos. Las actividades se organizan con tareas, hitos y guías para que puedan continuar trabajando de forma autónoma.",
  },
  {
    q: "¿El curso es grabado o en vivo?",
    a: "Las 24 horas del programa son en vivo. Los alumnos participan en las seis sesiones completas.",
  },
  {
    q: "¿Por qué hay una pausa entre diciembre y enero?",
    a: "Para evitar las fechas más cercanas a Navidad y Año Nuevo. No tendremos clases el 26 de diciembre ni el 2 de enero. Retomamos el 9 de enero de 2027.",
  },
  {
    q: "¿Mi aplicación quedará lista para usarse en mi empresa?",
    a: "Sí. Al terminar el curso tendrás tu propia aplicación empresarial funcionando y lista para que tu equipo la use en el proceso para el que la diseñaste: publicada en la web, con usuarios, permisos y tus datos. Si más adelante necesitas integrarla con otros sistemas, automatizar procesos, sumar agentes de IA o extenderla a más áreas, lo trabajamos en los siguientes niveles de AI Business Builder.",
  },
  {
    q: "¿Tengo que pagar licencias aparte?",
    a: "Trabajaremos con Lovable o Claude Design, Supabase, GitHub y Vercel, y con agentes de desarrollo como Claude Code, Codex y Gemini. Varias ofrecen planes gratuitos o de prueba, pero sus condiciones y límites cambian, y algunas funciones requieren un plan de pago. Antes de comenzar informaremos qué costos externos, si los hubiera, deberá asumir cada participante. No se incluyen licencias o servicios de terceros que no estén indicados expresamente.",
  },
  {
    q: "¿Puedo utilizar datos reales de mi empresa?",
    a: "Sí, en dos etapas. Mientras construyes y pruebas la aplicación trabajaremos con datos sintéticos, para corregir errores sin riesgo. Cuando tu aplicación esté validada, cargarás tus datos empresariales reales en tu propia base de datos. Para ese paso necesitas la autorización de tu empresa, y no debes compartir contraseñas ni información confidencial en los prompts de las herramientas de IA.",
  },
  {
    q: "¿Qué ocurre si mi proyecto resulta demasiado grande?",
    a: "Te ayudaremos a delimitar una primera versión viable. Algunas funcionalidades se trasladarán al plan de evolución para etapas posteriores.",
  },
  {
    q: "¿Debo inscribirme a todo AI Business Builder?",
    a: "No. Esta matrícula corresponde al Nivel 1: De Excel a tu Propia App con IA. Al terminar podrás decidir si continúas con los siguientes niveles. La ruta completa se comercializará por módulos.",
  },
  {
    q: "¿Qué aprenderé después de este primer curso?",
    a: "La ruta propuesta continúa con automatización de procesos, agentes de IA empresariales, integración y arquitectura de sistemas, y consolidación de soluciones. Así podrás evolucionar el mismo proyecto en lugar de comenzar desde cero.",
  },
  {
    q: "¿Recibiré un certificado?",
    a: "Sí. Al culminar el curso recibirás un certificado emitido por TIDEO Tech & Strategy y avalado por el docente, Cristhian Balvin. No se trata de una certificación universitaria.",
  },
];

/* ───────────────────────── 18 · Formulario ───────────────────────── */

export const AI_EXPERIENCE = [
  { value: "ninguna", label: "Ninguna" },
  { value: "basica", label: "Básica" },
  { value: "intermedia", label: "Intermedia" },
  { value: "avanzada", label: "Avanzada" },
] as const;

export type AiExperience = (typeof AI_EXPERIENCE)[number]["value"];
