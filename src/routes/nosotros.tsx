import { Link, createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ORG, canonicalLink, canonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: () => ({
    meta: [
      { title: "Nosotros | TIDEO Tech & Strategy" },
      {
        name: "description",
        content:
          "TIDEO Tech & Strategy es una firma de transformación digital en Lima, Perú. Ayudamos a empresas medianas a ordenar su operación, integrar procesos y crecer con tecnología.",
      },
      { property: "og:title", content: "Nosotros | TIDEO Tech & Strategy" },
      { property: "og:url", content: canonicalUrl("/nosotros") },
    ],
    links: [canonicalLink(canonicalUrl("/nosotros"))],
  }),
});

const unidades = [
  {
    nombre: "TIDEO Consulting",
    rol: "Estrategia y procesos",
    texto:
      "Diagnosticamos la operación, identificamos cuellos de botella, diseñamos flujos y priorizamos oportunidades de transformación digital.",
  },
  {
    nombre: "TIDEO Labs",
    rol: "Desarrollo ágil y soluciones digitales",
    texto:
      "Construimos MVPs, ERPs personalizados, CRMs, automatizaciones, apps internas e integraciones con tecnología moderna e IA.",
  },
  {
    nombre: "TIDEO Academy",
    rol: "Capacitación y adopción",
    texto:
      "Entrenamos equipos en IA, automatización, Power BI, herramientas no-code y nuevas formas de trabajo digital.",
  },
  {
    nombre: "TIDEO Studio",
    rol: "Diseño, experiencia y comunicación",
    texto:
      "Diseñamos interfaces, presentaciones, identidad visual, contenido digital y experiencias claras y usables.",
  },
];

const pasos = [
  [
    "Entendemos",
    "Conversamos con los equipos, revisamos documentos y comprendemos la lógica real del negocio.",
  ],
  ["Ordenamos", "Mapeamos procesos, roles, datos, reglas y excepciones críticas."],
  ["Diseñamos", "Definimos flujos, pantallas, automatizaciones, reportes e integraciones."],
  ["Construimos", "Desarrollamos MVPs funcionales con tecnología moderna e IA."],
  ["Escalamos", "Ajustamos la solución, capacitamos usuarios y construimos el roadmap."],
] as const;

function Nosotros() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-20">
        <section className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-6 h-px bg-primary/60" />
            Nosotros
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-gradient">
            Construimos software alrededor de tu operación,{" "}
            <span className="font-serif-italic text-primary">no al revés</span>.
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg text-muted-foreground">
            <p>
              {ORG.name} es una firma de transformación digital con base en Lima, Perú. Trabajamos
              con empresas medianas de Latinoamérica que ya no quieren seguir operando con Excel,
              WhatsApp, correos y sistemas que no conversan entre sí.
            </p>
            <p>
              Llevamos más de 10 años conectando operaciones, datos y tecnología para resolver
              problemas reales de negocio. Diseñamos, automatizamos y construimos soluciones
              digitales —ERP, CRM, automatizaciones, dashboards de Power BI, apps internas y agentes
              de IA— para que cada empresa ordene su operación, integre sus procesos y crezca con
              control.
            </p>
            <p>
              Nuestro punto de partida nunca es la herramienta. Primero entendemos cómo trabaja tu
              empresa, qué decisiones se toman y qué información necesita cada rol. El código viene
              después.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Cuatro capacidades, una sola dirección.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Cada unidad cumple un rol dentro del mismo ciclo: entender, diseñar, construir y lograr
            adopción.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {unidades.map((u) => (
              <article key={u.nombre} className="rounded-2xl border border-hairline p-6">
                <h3 className="text-xl font-semibold">{u.nombre}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{u.rol}</p>
                <p className="mt-4 text-sm text-muted-foreground">{u.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Cómo trabajamos.</h2>
          <ol className="mt-10 space-y-6">
            {pasos.map(([titulo, texto], i) => (
              <li key={titulo} className="flex gap-6 border-b border-hairline pb-6">
                <span className="text-sm text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{titulo}</h3>
                  <p className="mt-1 text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">En qué creemos.</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted-foreground">
            <p>
              La tecnología debe adaptarse al negocio, no obligar al negocio a adaptarse a ella.
            </p>
            <p>Automatizar no es digitalizar el caos. Es rediseñar el proceso para escalarlo.</p>
            <p>
              No automatizamos problemas: rediseñamos procesos para que la tecnología tenga impacto
              real, y acompañamos al equipo hasta que la solución se usa de verdad.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Cuéntanos tu proceso
            </Link>
            <a
              href={`mailto:${ORG.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {ORG.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
