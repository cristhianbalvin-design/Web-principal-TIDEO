import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "¿Necesito saber Power BI?",
    a: "Es recomendable tener conocimientos básicos de la plataforma o haber llevado previamente un curso introductorio de Power BI o Excel avanzado. No partiremos explicando cómo instalar el software, sino cómo potenciar y acelerar el modelado, las medidas y los dashboards utilizando Inteligencia Artificial.",
  },
  {
    q: "¿Necesito saber programación?",
    a: "No. No requieres saber programar en Python, R o C#. La Inteligencia Artificial genera, traduce y explica detalladamente el código necesario (DAX y código M en Power Query). Tu rol principal será definir con criterio los requerimientos de negocio y validar los resultados.",
  },
  {
    q: "¿Aprenderemos DAX?",
    a: "Sí, de manera intensiva pero con un enfoque moderno: aprenderás a diseñar, generar, validar, optimizar y corregir medidas DAX complejas mediante IA, comprendiendo a fondo el contexto de filtro en lugar de frustrarte escribiendo fórmulas a ciegas.",
  },
  {
    q: "¿Trabajaremos Power Query?",
    a: "Sí. Utilizaremos la IA para el diagnóstico automático de la calidad de datos, transformaciones avanzadas, detección de anomalías y generación directa de código M para resolver problemas de limpieza en segundos.",
  },
  {
    q: "¿Se usará Microsoft Copilot?",
    a: "No es necesario contar con licencias de Microsoft Copilot ni Microsoft Fabric. El curso está diseñado para trabajar con las herramientas de IA más potentes y accesibles del mercado: ChatGPT, Claude, Gemini y Google Antigravity, logrando resultados superiores sin costos exorbitantes de licenciamiento corporativo.",
  },
  {
    q: "¿Necesito cuentas de pago?",
    a: "Gran parte de las prácticas y ejercicios pueden desarrollarse con las versiones gratuitas de las herramientas. Durante las sesiones te mostraremos qué capacidades avanzadas se habilitan en planes de pago y cómo sacarles el máximo provecho según tu presupuesto.",
  },
  {
    q: "¿El curso es práctico?",
    a: "100% práctico. Cada sesión combina explicaciones conceptuales directas con ejercicios aplicados a datos empresariales reales, culminating en el desarrollo de un proyecto integrador completo.",
  },
  {
    q: "¿Voy a construir un dashboard completo?",
    a: "Sí, ese es el objetivo central del proyecto final. Al finalizar las 12 horas habrás construido y documentado un dashboard profesional interactivo con arquitectura de datos, KPIs de negocio y visuales optimizados con IA.",
  },
  {
    q: "¿Qué diferencia esto de un curso tradicional?",
    a: "En un curso tradicional memorizas menús, sintaxis y funciones que puedes olvidar en dos semanas. Aquí aprendes una metodología de trabajo permanente (Método C.I.A.) para dirigir a la IA, resolver problemas complejos en minutos y convertirte en un líder analítico 10x más rápido.",
  },
];

export function PowerBiFaq() {
  return (
    <section id="faq" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeader
          align="center"
          eyebrow="Resolviendo dudas"
          title={
            <>
              Preguntas <span className="font-serif-italic text-academy">frecuentes</span>.
            </>
          }
          description="Todo lo que necesitas saber sobre los requisitos, la metodología y las herramientas antes de iniciar tu proceso de inscripción."
        />

        <div className="mt-14 rounded-2xl border border-hairline bg-surface/30 p-6 md:p-10 shadow-xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-hairline/80 rounded-xl px-5 bg-background/60 data-[state=open]:border-academy/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline text-foreground group">
                  <span className="flex items-center gap-3 pr-2">
                    <HelpCircle className="w-4 h-4 text-academy shrink-0 group-data-[state=open]:text-academy" />
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pt-1 pl-7 border-t border-hairline/40">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          ¿Tienes una duda adicional? Escríbenos directamente a{" "}
          <a
            href="mailto:cristhian@tideo.tech"
            className="text-academy font-medium hover:underline"
          >
            cristhian@tideo.tech
          </a>
        </div>
      </div>
    </section>
  );
}
