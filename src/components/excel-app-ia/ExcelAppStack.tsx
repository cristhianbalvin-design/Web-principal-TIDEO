import { Bot, ChevronRight, Database, GitBranch, Globe, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AGENTS, AGENTS_INTRO, STACK, STACK_NOTE } from "@/content/excel-app-ia";
import { Section } from "./shared";

const icons = [Sparkles, Database, GitBranch, Globe];

/** Stack tecnológico: plataformas (en el orden del flujo de trabajo) y agentes de desarrollo. */
export function ExcelAppStack() {
  return (
    <Section id="stack" className="border-t border-hairline">
      <SectionHeader
        align="center"
        eyebrow="Stack tecnológico"
        title={
          <>
            Herramientas profesionales para construir{" "}
            <span className="font-serif-italic text-academy">una app real</span>
          </>
        }
        description="Construyes con el mismo stack que se usa hoy para lanzar productos digitales: cada herramienta cumple un papel claro, desde la primera pantalla hasta la aplicación publicada."
      />

      <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STACK.map((t, i) => {
          const Icon = icons[i];
          return (
            <li
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-hairline bg-surface/40 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-academy/30 bg-academy/10">
                  <Icon className="h-5 w-5 text-academy" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{t.name}</h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-academy">
                {t.role}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              {i < STACK.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="hidden lg:block absolute -right-[1.15rem] top-1/2 -translate-y-1/2 h-5 w-5 text-academy/70"
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-2xl border border-academy/30 bg-academy/[0.05] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <Bot className="h-5 w-5 text-academy" /> Agentes de desarrollo
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{AGENTS_INTRO}</p>
          </div>
          <ul className="lg:col-span-3 grid gap-3 sm:grid-cols-3">
            {AGENTS.map((a) => (
              <li key={a.name} className="rounded-xl border border-hairline bg-background/70 p-5">
                <p className="font-semibold text-foreground">{a.name}</p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {a.maker}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {STACK_NOTE}
      </p>
    </Section>
  );
}
