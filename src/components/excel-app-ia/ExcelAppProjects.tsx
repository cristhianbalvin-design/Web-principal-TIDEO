import {
  Boxes,
  Inbox,
  Handshake,
  Wrench,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  MinusCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { MVP_IN, MVP_OUT, PROJECT_EXAMPLES } from "@/content/excel-app-ia";
import { Section } from "./shared";

const icons = [Boxes, Inbox, Handshake, Wrench, ShoppingCart, AlertTriangle];

/** Sección 8: ejemplos de proyectos y alcance razonable del MVP. */
export function ExcelAppProjects() {
  return (
    <Section id="proyectos" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Ejemplos de proyectos que puedes construir"
        title={
          <>
            La miniapp la hacemos juntos. Tu MVP responde a{" "}
            <span className="font-serif-italic text-academy">tu propio problema</span>.
          </>
        }
        description="Estos son ejemplos de proyectos compatibles con una primera versión pequeña."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_EXAMPLES.map((p, i) => {
          const Icon = icons[i];
          return (
            <li
              key={p.title}
              className="rounded-2xl border border-hairline bg-surface/40 p-6 hover:border-academy/40 transition-colors"
            >
              <Icon className="h-6 w-6 text-academy" />
              <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
        Puedes plantear otro caso, pero lo revisaremos antes del laboratorio para asegurar que sea
        viable.{" "}
        <strong className="text-foreground">
          La meta no es construir la aplicación más grande; es terminar una primera versión que
          funcione y resuelva un problema definido.
        </strong>
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-academy/30 bg-academy/[0.05] p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-academy" /> Qué incluye un MVP razonable
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Como referencia, recomendamos: {MVP_IN.charAt(0).toLowerCase() + MVP_IN.slice(1)}
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-background/60 p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-semibold text-foreground">
            <MinusCircle className="h-5 w-5 text-muted-foreground" /> Qué queda fuera de este primer
            nivel
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{MVP_OUT}</p>
        </div>
      </div>
    </Section>
  );
}
