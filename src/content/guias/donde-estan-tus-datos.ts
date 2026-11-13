import type { Publicacion } from "./index";

export const dondeEstanTusDatos: Publicacion = {
  tipo: "guia",
  slug: "donde-estan-tus-datos",
  titulo: "¿Dónde están tus datos? Guía de la nube para pymes",
  bajada:
    "La nube no está en el cielo: son edificios llenos de computadoras. Qué pasa con tus archivos cuando los subes y qué preguntarle a tu proveedor antes de subir los datos de tu empresa.",
  serie: "Datos que deciden",
  fecha: "2026-11-13",
  lectura: "4 min",
  introduccion: [
    {
      tipo: "parrafo",
      texto:
        "Cuando subes un archivo a la nube, lo guardas en computadoras que están en un lugar físico. Conocer ese recorrido te ayuda a hacer mejores preguntas sobre los datos de tu empresa.",
    },
  ],
  secciones: [
    {
      id: "la-nube-es-un-edificio",
      numero: "01",
      titulo: "La nube es un edificio",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un centro de datos es un edificio con computadoras en estantes, encendidas todo el día. Tiene energía de respaldo y aire frío para que no se calienten.",
        },
        {
          tipo: "parrafo",
          texto:
            "Cuando subes un archivo desde tu celular, sale por una antena, viaja por cables de fibra bajo la calle y llega a uno de esos edificios.",
        },
      ],
    },
    {
      id: "el-viaje-por-el-fondo-del-mar",
      numero: "02",
      titulo: "El viaje por el fondo del mar",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si tus datos cruzan a otro continente, casi nunca van por satélite: viajan por cables submarinos. Según TeleGeography, más del 99 % del tráfico de datos entre continentes pasa por esos cables. La organización aclara que no puede calcular el porcentaje con precisión exacta porque faltan datos del tráfico por satélite.",
        },
      ],
    },
    {
      id: "no-se-guarda-una-sola-vez",
      numero: "03",
      titulo: "No se guarda una sola vez",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Los grandes proveedores guardan copias en varios lugares para que, si un edificio falla, tus datos sigan disponibles. Por ejemplo, Amazon S3 guarda los datos de forma redundante en al menos tres zonas de disponibilidad en sus clases de almacenamiento estándar.",
        },
        {
          tipo: "parrafo",
          texto: "Pregúntale siempre a tu proveedor cuántas copias hay y dónde están.",
        },
      ],
    },
    {
      id: "lima-ya-tiene-sus-edificios",
      numero: "04",
      titulo: "Lima ya tiene sus edificios",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Según un reporte de Binswanger publicado por Gestión el 16 de abril de 2026, Lima tiene 14 centros de datos en operación que ocupan unos 68 000 m², casi diez canchas de fútbol.",
        },
        {
          tipo: "parrafo",
          texto:
            "El reporte identifica tres zonas: el eje urbano de San Isidro, Surco y zonas aledañas, con unos 9 proyectos; Villa El Salvador, con 2; y Lurín, con 3 y cerca del 68 % de la capacidad instalada.",
        },
        {
          tipo: "parrafo",
          texto:
            "Que existan centros de datos en Lima no significa que tus datos estén ahí: depende del proveedor y de la región que elijas.",
        },
      ],
    },
    {
      id: "antes-de-subir",
      numero: "05",
      titulo: "Antes de subir los datos de tu empresa, pregunta",
      bloques: [
        {
          tipo: "lista",
          ordenada: true,
          items: [
            "¿En qué país y región se guardan mis datos?",
            "¿Cuántas copias hay y en cuántos lugares?",
            "¿Quién puede ver o tocar mis datos, dentro de mi empresa y del proveedor?",
            "¿Están cifrados cuando se guardan y cuando viajan?",
            "¿Cada cuánto se hace respaldo y cuánto tardo en recuperar algo borrado?",
            "¿Cómo me llevo mis datos si cambio de proveedor?",
            "¿Qué pasa con mis datos cuando termino el contrato?",
          ],
        },
      ],
    },
  ],
  nota: "Si guardas datos personales de clientes o trabajadores, en Perú aplica la Ley N.º 29733 de Protección de Datos Personales; revísalo con tu asesor legal.",
  fuentes: [
    {
      titulo:
        "TeleGeography — Do Submarine Cables Account For Over 99% of Intercontinental Data Traffic?",
      url: "https://resources.telegeography.com/2023-mythbusting-part-3",
    },
    {
      titulo: "Gestión — Data centers en Lima ya superan los 65,000 m²",
      url: "https://gestion.pe/economia/empresas/data-centers-en-lima-ya-superan-los-65000-m2-donde-se-ubican-y-hacia-donde-se-expanden-noticia/",
    },
    {
      titulo: "AWS — Clases de almacenamiento de Amazon S3",
      url: "https://aws.amazon.com/s3/storage-classes/",
    },
  ],
};
