import { FileSpreadsheet, Repeat, Lightbulb, Target } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PROMISE } from "@/content/excel-app-ia";
import { Section } from "./shared";

const pains = [
  { icon: FileSpreadsheet, text: "Información repartida entre varios Excel." },
  {
    icon: Repeat,
    text: "Tu equipo registra operaciones a mano, repite datos o revisa varios archivos para saber el estado de una solicitud.",
  },
  {
    icon: Lightbulb,
    text: "Tienes una idea de aplicación, pero suponías que necesitabas dominar programación o contratar un equipo técnico.",
  },
];

/** Secciones 2 (el problema) y 3 (la promesa). */
export function ExcelAppStory() {
  return (
    <>
      <Section id="problema" className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="¿Te suena familiar?"
            title={
              <>
                Conoces tu proceso mejor que nadie. ¿Por qué depender de otros para{" "}
                <span className="font-serif-italic text-academy">mejorar tu herramienta</span>?
              </>
            }
          />
          <div>
            <ul className="space-y-3">
              {pains.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-4 rounded-xl border border-hairline bg-surface/40 p-4"
                >
                  <Icon className="w-5 h-5 text-academy shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                La inteligencia artificial ha reducido muchas barreras para empezar a construir
                software. Pero generar pantallas con un prompt no es lo mismo que diseñar una
                solución que funcione y responda a una necesidad real.
              </p>
              <p>
                <strong className="text-foreground">
                  Ahí es donde comienza la diferencia de TIDEO:
                </strong>{" "}
                te ayudamos a transformar un problema empresarial concreto en un MVP funcional,
                siguiendo una metodología que combina procesos, datos, construcción asistida por IA,
                pruebas y acompañamiento experto.
              </p>
              <p>
                No necesitas aprender primero un lenguaje de programación completo. Sí necesitas
                comprender tu problema, tomar decisiones sobre el alcance, trabajar de manera
                ordenada y validar lo que la IA construye.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="promesa" className="border-t border-hairline">
        <SectionHeader
          align="center"
          eyebrow="Qué vas a conseguir"
          title={
            <>
              Tu primera aplicación empresarial. Tu propio proyecto.{" "}
              <span className="font-serif-italic text-academy">Acompañamiento real.</span>
            </>
          }
          description="Al finalizar el programa, habrás recorrido un proceso completo de creación de una aplicación empresarial."
        />
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROMISE.map((p, i) => (
            <li
              key={p.title}
              className="relative rounded-2xl border border-hairline bg-surface/40 p-6 hover:border-academy/40 transition-colors"
            >
              <span className="font-mono text-xs text-academy">0{i + 1}</span>
              <h3 className="mt-3 font-semibold text-foreground leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 mx-auto max-w-3xl flex items-start gap-4 rounded-2xl border border-academy/30 bg-academy/[0.06] p-6">
          <Target className="w-5 h-5 text-academy shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            <strong className="text-foreground">
              El objetivo es que termines con un MVP funcional y demostrable: una aplicación real
              que resuelve un proceso de tu negocio.
            </strong>{" "}
            Los temas más avanzados —automatizaciones, agentes de IA, integraciones con otros
            sistemas y operación productiva— quedan para los siguientes niveles de la ruta. El
            alcance de cada proyecto se revisará antes de la etapa personalizada para hacerlo viable
            dentro de las 24 horas.
          </p>
        </div>
      </Section>
    </>
  );
}
