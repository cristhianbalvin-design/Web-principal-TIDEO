/**
 * Contenido de opera.tideo.tech/metalmecanica.
 * Fuente única para la página, su versión Markdown (agentes) y el JSON-LD de FAQ.
 * Solo información confirmada de OPERA: lo marcado como PENDIENTE en el brief no se publica.
 */
export const METALMECANICA_PATH = "/opera/metalmecanica";
export const METALMECANICA_URL = "https://opera.tideo.tech/metalmecanica";

export const metalmecanica = {
  title: "ERP para metalmecánica en Perú: OPERA para talleres de fabricación",
  metaTitle: "ERP para metalmecánica en Perú | OPERA para talleres de fabricación",
  subtitle:
    "OPERA conecta en un solo sistema el diagnóstico de la pieza, el costeo, la cotización, la orden de trabajo o de fabricación, el almacén y la facturación de tu taller. Así sabes cuánto cuesta cada trabajo y en qué estado está, sin depender de Excel ni de la memoria del jefe de taller.",
  metaDescription:
    "OPERA, el ERP para metalmecánica en Perú: diagnóstico técnico, hoja de costeo, cotización, órdenes de trabajo y de fabricación, almacén y facturación con detracciones SPOT en un solo sistema.",

  companyTypes: [
    {
      title: "Reparación y mantenimiento",
      subtitle: "Componentes y maquinaria de clientes",
      desc: "Talleres que reparan cilindros hidráulicos, camisas, tapas, ejes y componentes similares de sus clientes.",
    },
    {
      title: "Fabricación bajo pedido",
      subtitle: "Ruta de operaciones y lista de materiales",
      desc: "Talleres que fabrican piezas a pedido, con ruta de operaciones y lista de materiales por trabajo.",
    },
    {
      title: "Grupos de empresas",
      subtitle: "Varias sociedades",
      desc: "Empresas con varias sociedades que comparten personal, almacén y clientes.",
    },
  ],

  roles: [
    {
      role: "Gerencia y finanzas",
      uses: "Costos, cuentas por cobrar y por pagar, tesorería y dashboards.",
    },
    { role: "Comercial", uses: "Costeo, cotizaciones y órdenes de servicio." },
    { role: "Jefe de taller", uses: "Diagnóstico técnico." },
    {
      role: "Técnicos operativos",
      uses: "Órdenes de trabajo, órdenes de fabricación y partes diarios, desde celular o tablet.",
    },
    { role: "Jefe de operaciones", uses: "Órdenes de trabajo y planificación de recursos." },
    { role: "Asistente de almacén", uses: "Recepción, stock y despachos." },
  ],

  problems: [
    {
      tag: "Costeo",
      title: "No sé cuánto cuesta un trabajo antes de cotizarlo",
      quote: "Cotizo por experiencia y recién al final del mes veo si gané o perdí.",
      solutionTitle: "Costo antes de cotizar",
      solution:
        "La Hoja de Costeo calcula mano de obra, materiales, depreciación de máquinas, terceros y logística, más gasto administrativo y margen, y llega al precio de venta. La mano de obra sale de la tarifa de planilla por cargo o de un valor manual que tú defines; los materiales usan el costo promedio del inventario y la depreciación de la máquina se reparte según las horas de uso en el trabajo. Al aprobarla, genera la cotización con todas sus líneas.",
    },
    {
      tag: "Diagnóstico",
      title: "Cotizo sin que el taller haya revisado la pieza",
      quote: "Comercial manda el precio y después el taller descubre que el daño era mayor.",
      solutionTitle: "Diagnóstico antes de cotizar",
      solution:
        "El jefe de taller llena el Diagnóstico Técnico: tareas con horas-hombre y horas-máquina, repuestos, hallazgos con fotos y mediciones, tanto en mantenimiento como en fabricación. Comercial parte de ese diagnóstico para valorizar y generar la Hoja de Costeo. El informe al cliente, sin precios, se emite en PDF con permiso de aprobación.",
    },
    {
      tag: "Trazabilidad",
      title: "Pierdo la historia de cada pieza del cliente",
      quote: "La pieza vuelve a los seis meses y nadie sabe qué se le hizo la vez anterior.",
      solutionTitle: "Historia de cada pieza",
      solution:
        "La Recepción de Activos de Cliente registra cada componente que llega y le asigna un código propio que se mantiene en visitas futuras. Cada ingreso tiene su número de caso, y las lecturas de horómetro y kilometraje quedan en el historial del activo.",
    },
    {
      tag: "Almacén",
      title: "Los materiales faltan en pleno trabajo",
      quote: "Empezamos la orden y recién ahí nos damos cuenta de que no hay el repuesto.",
      solutionTitle: "Materiales a tiempo",
      solution:
        "Al programar una OT, el almacén (WMS) reserva los repuestos estimados y genera solicitudes de compra automáticas por lo que falte. Compras asigna proveedor por línea y genera una orden de compra por proveedor. Al recibir, el stock y el kardex se actualizan por ubicación, y un gemelo digital 3D del almacén permite ver la ocupación y ubicar el material.",
    },
    {
      tag: "Costo real",
      title: "Las horas del taller no llegan a costos",
      quote:
        "Los técnicos trabajan, pero las horas y los materiales realmente usados no se registran por orden.",
      solutionTitle: "Horas y consumos por orden",
      solution:
        "Los técnicos registran partes diarios en celular o tablet, tanto en órdenes de trabajo como en órdenes de fabricación. Al aprobar los partes, el sistema recalcula avance, costo real y fecha real de fin, y el consumo de repuestos queda ligado a la orden.",
    },
    {
      tag: "Capacidad",
      title: "No sé si el taller tiene capacidad para lo que prometo",
      quote: "Acepto un trabajo y no sé si hay torno, técnico y espacio libres esa semana.",
      solutionTitle: "Capacidad del taller a la vista",
      solution:
        "El Planner organiza personal y equipos sobre las órdenes. Cada bahía agrupa puestos y máquinas, y la capacidad se define por puesto; todo se ve en un tablero y en el gemelo digital 3D del taller. La OT hereda tareas y horas de la orden de servicio.",
    },
    {
      tag: "Facturación",
      title: "Facturar y cobrar es un trámite aparte",
      quote:
        "Terminamos el trabajo y facturar, cobrar y manejar la detracción se vuelve otro proceso.",
      solutionTitle: "Facturar y cobrar en el mismo flujo",
      solution:
        "El módulo de Facturación emite facturas y notas de crédito y débito con motivos del catálogo SUNAT, y alimenta las cuentas por cobrar y la tesorería. Las detracciones SPOT se manejan en ventas, con depósito a la cuenta de detracciones, y en compras; la autodetracción también está resuelta.",
    },
  ],

  workflow: [
    {
      t: "Recepción del componente",
      d: "Se registra el cliente, el activo y su estado de ingreso, con un número de caso.",
    },
    {
      t: "Diagnóstico técnico",
      d: "El jefe de taller registra hallazgos, tareas, horas, repuestos y fotos. El informe al cliente sale en PDF.",
    },
    {
      t: "Hoja de Costeo",
      d: "Comercial valoriza el diagnóstico (mano de obra, materiales, máquinas, terceros) y define margen y precio.",
    },
    { t: "Cotización", d: "Al aprobar la hoja se genera la cotización, estándar o especial." },
    {
      t: "Orden de servicio, OT y OF",
      d: "Con la cotización aprobada nace la OS Cliente: mantenimiento pasa a orden de trabajo (OT) y fabricación a orden de fabricación (OF), con ruta de operaciones y lista de materiales.",
    },
    {
      t: "Planificación y partes diarios",
      d: "El Planner asigna personal y equipos, el almacén reserva y despacha repuestos y los técnicos registran horas y consumos desde celular o tablet.",
    },
    {
      t: "Cierre técnico y conformidad",
      d: "Se cierra la orden con acta de conformidad: fotos y firma del técnico y del cliente, con enlace remoto si el cliente no firma en el momento.",
    },
    {
      t: "Facturación y cobro",
      d: "Se factura, se gestiona la detracción SPOT si aplica y se registra el cobro en tesorería.",
    },
  ],

  modules: [
    {
      name: "Comercial y CRM",
      desc: "Cuentas, oportunidades, cotizaciones estándar y especial, órdenes de servicio.",
    },
    { name: "Hoja de Costeo", desc: "Costeo por trabajo, actividad y tarea." },
    { name: "Diagnóstico Técnico", desc: "Hallazgos, tareas, horas, fotos e informe al cliente." },
    {
      name: "Recepción de Activos de Cliente",
      desc: "Ingreso de componentes con código propio e historial.",
    },
    {
      name: "Órdenes de Trabajo y de Fabricación",
      desc: "Ejecución, ruta de operaciones, lista de materiales y partes diarios, móvil primero.",
    },
    {
      name: "Planner y gemelo digital del taller",
      desc: "Planificación de personal y equipos por bahía y puesto.",
    },
    {
      name: "Almacén (WMS)",
      desc: "Recepción, ubicaciones, kardex, transferencias, despacho a taller, reservas por OT y gemelo digital 3D.",
    },
    {
      name: "Compras",
      desc: "Solicitudes, bandeja de sourcing por proveedor, órdenes de compra y recepción.",
    },
    {
      name: "Cuentas por pagar y Tesorería",
      desc: "Pagos, cuentas bancarias y detracciones de compra.",
    },
    {
      name: "Facturación y cuentas por cobrar",
      desc: "Facturas, notas de crédito y débito, detracciones SPOT.",
    },
    { name: "RRHH y Nómina", desc: "Contratos, solicitudes y nómina." },
    { name: "Dashboards BI", desc: "General, comercial, operativo y financiero." },
    {
      name: "Aria, asistente de IA",
      desc: "Consulta datos del ERP según los permisos de cada usuario.",
    },
  ],

  differentials: [
    {
      title: "Un solo flujo, del diagnóstico a la factura",
      desc: "No hay que volver a digitar entre costeo, cotización, orden y facturación.",
    },
    {
      title: "Costeo con datos propios del taller",
      desc: "Mano de obra desde planilla, materiales a costo promedio y depreciación de máquinas por horas de uso.",
    },
    {
      title: "Historia de cada componente del cliente",
      desc: "Código propio, número de caso por ingreso e historial de lecturas.",
    },
    {
      title: "Mantenimiento y fabricación en un sistema",
      desc: "Cada uno con su orden, pero con el mismo diagnóstico, costeo y partes diarios.",
    },
    {
      title: "Almacén y capacidad ligados a la orden",
      desc: "Reserva por OT, compra automática de lo que falte y planificación de personal y equipos.",
    },
    {
      title: "Hecho para el contexto peruano",
      desc: "Detracciones SPOT, notas con motivos SUNAT, soles y dólares, y grupos de sociedades.",
    },
  ],

  implementation: [
    { t: "Levantamiento", d: "Flujo del taller, tipos de trabajo, cargos y centros de costo." },
    {
      t: "Configuración",
      d: "Catálogos de trabajos, actividades y tareas; costo por cargo; activos, bahías y almacenes; permisos por rol.",
    },
    { t: "Migración", d: "Carga de maestros desde Excel con plantillas XLSX." },
    { t: "Capacitación", d: "Por rol; los técnicos aprenden directamente en celular o tablet." },
    { t: "Puesta en marcha", d: "Primeras órdenes reales con acompañamiento." },
    { t: "Mejora continua", d: "Ajustes de costeo, reportes y nuevas pantallas." },
  ],

  clientChecklist: [
    "Lista de personal con cargos y sueldos.",
    "Lista de equipos y máquinas propias, con valor de adquisición y vida útil.",
    "Catálogo de materiales y repuestos con códigos.",
    "Lista de proveedores y de clientes.",
    "Definición de quién diagnostica, quién aprueba y quién cierra las órdenes.",
  ],

  faqs: [
    {
      q: "¿En qué se diferencia OPERA de Odoo o de un ERP genérico?",
      a: "OPERA está pensado para empresas que reparan o fabrican sobre activos de clientes. El diagnóstico alimenta el costeo, el costeo la cotización y la cotización las órdenes de servicio, de trabajo y de fabricación, con el historial de cada pieza. También cubre facturación peruana, detracciones SPOT y grupos de sociedades.",
    },
    {
      q: "¿Funciona en celular o tablet dentro de planta?",
      a: "Sí. La creación de órdenes y los partes diarios están pensados para celular y tablet: la aplicación de Operaciones se diseña con prioridad móvil.",
    },
    {
      q: "¿Sirve si fabrico piezas nuevas, no solo reparo?",
      a: "Sí. La fabricación tiene su propia orden (OF) con ruta de operaciones y lista de materiales, y el área de cada operación se hereda del maestro de actividades. Comparte con mantenimiento el diagnóstico, la Hoja de Costeo y los partes diarios.",
    },
    {
      q: "¿Puedo costear con las máquinas y la mano de obra reales de mi taller?",
      a: "Sí. La Hoja de Costeo toma la tarifa por cargo desde planilla, o un valor manual, y reparte la depreciación de cada máquina según las horas de uso. Después, los partes diarios aprobados dan el costo real de cada orden.",
    },
    {
      q: "¿Se puede migrar desde Excel?",
      a: "Sí, con plantillas XLSX de carga masiva para maestros como trabajos, para cuentas por cobrar y por pagar, y para los activos propios.",
    },
    {
      q: "¿Puedo controlar quién ve y quién aprueba cada cosa?",
      a: "Sí. Los permisos se definen por rol y por sociedad. Por ejemplo, solo quien tiene permiso de aprobación puede emitir el informe de diagnóstico.",
    },
  ],

  terms: [
    "OT (orden de trabajo)",
    "OS (orden de servicio)",
    "OF (orden de fabricación)",
    "Hoja de Costeo",
    "Diagnóstico técnico",
    "Hallazgo",
    "Activo de cliente",
    "Ruta de operaciones",
    "BOM (lista de materiales)",
    "Horas-hombre",
    "Horas-máquina",
    "Parte diario",
    "Bahía",
    "Kardex",
    "SOLPE",
    "Cierre técnico",
    "Acta de conformidad",
    "Detracción SPOT",
    "Valorización",
  ],
} as const;

/** JSON-LD de la página: ruta de navegación, FAQ y relación con el software OPERA. */
export const metalmecanicaJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${METALMECANICA_URL}#webpage`,
    url: METALMECANICA_URL,
    name: metalmecanica.metaTitle,
    description: metalmecanica.metaDescription,
    inLanguage: "es",
    about: { "@id": "https://opera.tideo.tech/#software" },
    publisher: { "@id": "https://www.tideo.tech/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "OPERA", item: "https://opera.tideo.tech/" },
      { "@type": "ListItem", position: 2, name: "ERP para metalmecánica", item: METALMECANICA_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: metalmecanica.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
] as const;
