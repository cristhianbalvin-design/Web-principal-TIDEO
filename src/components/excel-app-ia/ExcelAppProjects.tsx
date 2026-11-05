import {
  Boxes,
  Inbox,
  Handshake,
  Wrench,
  ShoppingCart,
  Users,
  Wallet,
  ShieldCheck,
  KanbanSquare,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ADVANCED_TOPICS, MVP_FEATURES, PROJECT_EXAMPLES } from "@/content/excel-app-ia";
import { Section } from "./shared";

const icons = [
  Boxes,
  Inbox,
  Handshake,
  Wrench,
  ShoppingCart,
  Users,
  Wallet,
  ShieldCheck,
  KanbanSquare,
];

/** Sección 8: ejemplos de proyectos por área y alcance del MVP funcional. */
export function ExcelAppProjects() {
  return (
    <Section id="proyectos" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Ejemplos de proyectos que puedes construir"
        title={
          <>
            La app de referencia la hacemos juntos. Tu MVP responde a{" "}
            <span className="font-serif-italic text-academy">tu propio problema</span>.
          </>
        }
        description="Procesos de distintas áreas de la empresa que puedes convertir en un MVP funcional."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_EXAMPLES.map((p, i) => {
          const Icon = icons[i];
          return (
            <li
              key={p.title}
              className="flex flex-col rounded-2xl border border-hairline bg-surface/40 p-6 hover:border-academy/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-6 w-6 text-academy" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {p.area}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
        Puedes plantear otro caso; lo revisaremos antes del laboratorio para definir un alcance que
        puedas terminar.{" "}
        <strong className="text-foreground">
          La meta es un MVP que funcione de verdad y resuelva un problema definido de tu negocio.
        </strong>
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-academy/30 bg-academy/[0.05] p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-academy" /> Tu MVP funcional incluye
          </h3>
          <ul className="mt-5 space-y-3">
            {MVP_FEATURES.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-academy" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-hairline bg-background/60 p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-semibold text-foreground">
            <Layers className="h-5 w-5 text-muted-foreground" /> Temas avanzados que no entran en el
            Nivel 1
          </h3>
          <ul className="mt-5 space-y-3">
            {ADVANCED_TOPICS.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-hairline pt-4 text-sm text-muted-foreground leading-relaxed">
            Se abordan en los siguientes niveles de AI Business Builder o en un proyecto de
            implementación con TIDEO.
          </p>
        </div>
      </div>
    </Section>
  );
}
