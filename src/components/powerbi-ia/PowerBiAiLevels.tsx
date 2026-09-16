import { Bot, Users, Cpu, Terminal, ArrowUpRight } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { SectionHeader } from "@/components/site/SectionHeader";

const levels = [
  {
    level: "01",
    tag: "Nivel 1",
    title: "IA como Asistente",
    role: "Respuestas y aceleración puntual de tareas",
    desc: "Utilizas la IA para resolver dudas de sintaxis, formular código DAX a pedido, generar transformaciones en Power Query y auditar rápidamente la calidad de una tabla.",
    icon: Bot,
    color: "var(--color-academy)",
    prompts: [
      "Analiza estas columnas y dime qué problemas de calidad encuentras.",
      "Genera una medida DAX para calcular el margen porcentual de ventas sobre el total anual.",
    ],
    highlight: "Sustituye horas de búsqueda en foros por respuestas estructuradas en segundos.",
  },
  {
    level: "02",
    tag: "Nivel 2",
    title: "IA como Coworker",
    role: "Colaborador estratégico y sparring analítico",
    desc: "Trabajas en dupla con la IA en sesiones continuas. La IA evalúa la arquitectura de tu modelo de datos, te sugiere KPIs clave para el negocio y propone la distribución visual del reporte.",
    icon: Users,
    color: "oklch(0.85 0.17 75)",
    prompts: [
      "Analiza mi proyecto, identifica oportunidades de mejora en el modelo relacional y ayúdame a desarrollar el dashboard paso a paso.",
    ],
    highlight:
      "No solo te da código: debate decisiones de diseño, modelado y narrativa analítica contigo.",
  },
  {
    level: "03",
    tag: "Nivel 3",
    title: "IA como Operador",
    role: "Agentes autónomos y control directo vía MCP",
    desc: "La frontera tecnológica: agentes de IA como Google Antigravity interactuando directamente con tu entorno de Power BI a través de Model Context Protocol (MCP), archivos .pbip y automatizaciones de código.",
    icon: Cpu,
    color: "var(--color-labs)",
    prompts: [
      "Inspecciona el proyecto .pbip en mi disco local, genera las medidas de Time Intelligence pendientes y valida la consistencia de las relaciones.",
    ],
    highlight:
      "La IA deja de ser solo un chat: ahora ejecuta cambios y opera herramientas en tu propio flujo de trabajo.",
  },
];

export function PowerBiAiLevels() {
  return (
    <section id="niveles" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Marco conceptual"
          title={
            <>
              Los 3 niveles de{" "}
              <span className="font-serif-italic text-academy">Inteligencia Artificial</span> en
              Power BI.
            </>
          }
          description="La mayoría de profesionales utiliza la IA como un simple buscador mejorado (Nivel 1). En este curso aprenderás a escalar al Nivel 2 como tu coworker analítico y dominarás el Nivel 3 con agentes autónomos que operan directamente tu entorno."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <CardContainer key={item.level} className="w-full">
                <CardBody className="group/card relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface/30 p-7 md:p-8 transition-all duration-300 hover:border-academy/40 hover:bg-surface/60">
                  {/* Subtle corner glow */}
                  <div
                    aria-hidden
                    className="absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-15 blur-3xl transition-opacity group-hover/card:opacity-35"
                    style={{ background: item.color }}
                  />

                  <div>
                    {/* Top Level Pill */}
                    <div className="flex items-center justify-between">
                      <CardItem
                        as="div"
                        translateZ={30}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-surface border border-hairline"
                        style={{ color: item.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {item.tag}
                      </CardItem>
                      <CardItem
                        as="span"
                        translateZ={25}
                        className="text-xs font-mono text-muted-foreground/60"
                      >
                        {item.level}/03
                      </CardItem>
                    </div>

                    {/* Level Title */}
                    <CardItem
                      as="h3"
                      translateZ={50}
                      className="mt-6 text-2xl font-bold tracking-tight text-foreground"
                    >
                      {item.title}
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ={35}
                      className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground"
                      style={{ color: item.color }}
                    >
                      {item.role}
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ={30}
                      className="mt-4 text-sm leading-relaxed text-muted-foreground"
                    >
                      {item.desc}
                    </CardItem>

                    {/* Real Prompt Box */}
                    <CardItem
                      as="div"
                      translateZ={45}
                      className="mt-6 rounded-xl border border-hairline/80 bg-background/90 p-4 shadow-inner"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-2">
                        <Terminal className="w-3 h-3 text-academy" />
                        <span>Ejemplo de prompt real:</span>
                      </div>
                      <div className="space-y-2">
                        {item.prompts.map((prompt, pIdx) => (
                          <p
                            key={pIdx}
                            className="font-mono text-xs text-foreground/90 leading-relaxed border-l-2 border-academy/40 pl-2.5"
                          >
                            "{prompt}"
                          </p>
                        ))}
                      </div>
                    </CardItem>
                  </div>

                  {/* Highlight pill at bottom */}
                  <CardItem
                    as="div"
                    translateZ={25}
                    className="mt-8 pt-4 border-t border-hairline/60 flex items-center justify-between text-xs text-foreground/80 font-medium"
                  >
                    <span>{item.highlight}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover/card:text-academy transition-colors" />
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
