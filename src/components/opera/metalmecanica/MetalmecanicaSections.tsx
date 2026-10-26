import type { CSSProperties, MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Factory,
  HelpCircle,
  History,
  Layers,
  MapPin,
  Receipt,
  Timer,
  Workflow,
} from "lucide-react";

import { AnimatedListItem } from "@/components/opera/WhatIsOpera";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FocusCards } from "@/components/ui/focus-cards";
import { metalmecanica as c } from "@/lib/metalmecanica-content";

/** Misma paleta que la landing de OPERA. */
const palette = [
  "var(--color-academy)",
  "var(--color-labs)",
  "var(--color-consulting)",
  "var(--color-amber)",
  "var(--color-studio)",
  "var(--color-labs)",
  "var(--color-consulting)",
];

const problemIcons = [Calculator, FileSearch, History, Boxes, Timer, Factory, Receipt];
const differentialIcons = [Workflow, Calculator, History, Layers, MapPin, Receipt];

const pad = (n: number) => String(n).padStart(2, "0");

function handleCardPointer(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--hover-x",
    `${((event.clientX - rect.left) / rect.width) * 100}%`,
  );
  event.currentTarget.style.setProperty(
    "--hover-y",
    `${((event.clientY - rect.top) / rect.height) * 100}%`,
  );
}

export function MetalmecanicaBreadcrumb() {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="border-t border-hairline bg-surface/20 text-xs uppercase tracking-[0.2em] text-muted-foreground"
    >
      <ol className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4 lg:px-10">
        <li>
          <Link to="/opera" className="transition-colors hover:text-foreground">
            OPERA
          </Link>
        </li>
        <li aria-hidden className="h-px w-6 bg-primary/60" />
        <li aria-current="page" className="text-foreground">
          Metalmecánica
        </li>
      </ol>
    </nav>
  );
}

export function MetalmecanicaAudience() {
  return (
    <section id="para-quien" className="py-24 md:py-32 border-t border-hairline scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Para quién es"
          title={
            <>
              Hecho para talleres que{" "}
              <span className="font-serif-italic text-primary">reparan</span> y{" "}
              <span className="font-serif-italic text-primary">fabrican</span>.
            </>
          }
          description="OPERA está pensado para empresas metalmecánicas que trabajan sobre activos de sus clientes o fabrican piezas bajo pedido."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {c.companyTypes.map((type, i) => (
            <CardContainer key={type.title} className="w-full">
              <CardBody className="group/card relative h-full w-full overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-8 transition hover:border-primary/20 hover:bg-surface/70 md:p-10">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover/card:opacity-40"
                  style={{ background: palette[i] }}
                />
                <div className="relative flex items-baseline gap-4">
                  <CardItem
                    as="span"
                    translateZ={48}
                    className="text-sm font-mono"
                    style={{ color: palette[i] }}
                  >
                    {pad(i + 1)}
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={64}
                    className="text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {type.title}
                  </CardItem>
                </div>
                <CardItem
                  as="p"
                  translateZ={42}
                  className="relative mt-4 text-sm uppercase tracking-widest text-muted-foreground"
                >
                  {type.subtitle}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={34}
                  className="relative mt-6 text-base leading-relaxed text-foreground/85"
                >
                  {type.desc}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h3 className="text-2xl font-bold text-foreground">
            Cada rol trabaja en el mismo sistema, desde la oficina hasta la planta.
          </h3>
          <ul className="space-y-4">
            {c.roles.map((r, i) => (
              <AnimatedListItem key={r.role} delay={i * 120}>
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <span className="text-foreground">{r.role}:</span>{" "}
                  <span className="font-normal text-muted-foreground">{r.uses}</span>
                </span>
              </AnimatedListItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MetalmecanicaProblems() {
  return (
    <section
      id="problemas"
      className="py-24 md:py-32 bg-surface/30 border-t border-hairline scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El problema del taller"
          title={
            <>
              Lo que se escucha en un taller{" "}
              <span className="font-serif-italic text-primary">metalmecánico</span>.
            </>
          }
          description="Siete problemas que aparecen cuando el costeo, el taller, el almacén y la facturación viven en Excel, en papel o en la memoria de una persona."
        />

        <FocusCards className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {({ focusedIndex, setFocusedIndex }) =>
            c.problems.map((problem, index) => {
              const Icon = problemIcons[index];
              const color = palette[index];
              return (
                <article
                  key={problem.title}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  tabIndex={0}
                  className={`focus-product-card group relative bg-background p-8 outline-none transition-all duration-300 hover:bg-surface/60 focus-visible:bg-surface/60 md:p-10 ${
                    index === c.problems.length - 1 ? "lg:col-span-3 md:col-span-2" : ""
                  } ${
                    focusedIndex !== null && focusedIndex !== index
                      ? "scale-[0.98] opacity-45 blur-[1.5px]"
                      : "scale-100 opacity-100 blur-0"
                  }`}
                  style={{ "--focus-card-color": color } as CSSProperties}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="focus-product-index font-mono">{pad(index + 1)}</span>
                    <span className="focus-product-tag">{problem.tag}</span>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `color-mix(in oklab, ${color} 12%, transparent)`,
                        color,
                        border: `1px solid color-mix(in oklab, ${color} 25%, transparent)`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground leading-snug">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm italic text-muted-foreground leading-relaxed">
                    “{problem.quote}”
                  </p>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />
                </article>
              );
            })
          }
        </FocusCards>
      </div>
    </section>
  );
}

export function MetalmecanicaSolutions() {
  return (
    <section id="solucion" className="py-24 md:py-32 border-t border-hairline scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Cómo lo resuelve OPERA"
          title={
            <>
              Cada problema, resuelto{" "}
              <span className="font-serif-italic text-primary">dentro del flujo</span>.
            </>
          }
          description="Sin integraciones frágiles ni doble digitación: el dato que registra el taller es el mismo que usan comercial, almacén y finanzas."
        />

        <HoverEffect className="mt-16 grid gap-4 md:grid-cols-2">
          {c.problems.map((p, i) => (
            <article
              key={p.solutionTitle}
              onMouseMove={handleCardPointer}
              className={`card-hover-effect-card rounded-2xl border border-hairline bg-background p-6 md:p-8 flex flex-col h-full ${
                i === c.problems.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold">{pad(i + 1)}</span>
                <span className="text-[10px] font-medium tracking-wider text-primary/80 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 uppercase">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {p.solutionTitle}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.solution}</p>
            </article>
          ))}
        </HoverEffect>
      </div>
    </section>
  );
}

function StepCard({ n, t, d }: { n: number; t: string; d: string }) {
  return (
    <article
      onMouseMove={handleCardPointer}
      className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-6 md:p-7 flex flex-col h-full"
    >
      <div className="text-xs font-mono text-primary font-semibold">{pad(n)}</div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{t}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </article>
  );
}

function StepArrow() {
  return (
    <div className="flex items-center justify-center self-center py-2 lg:py-0">
      <ArrowRight className="w-8 h-8 text-muted-foreground/40 shrink-0 rotate-90 lg:rotate-0" />
    </div>
  );
}

function StepRows({
  steps,
  perRow,
}: {
  steps: ReadonlyArray<{ t: string; d: string }>;
  perRow: 3 | 4;
}) {
  const rows: Array<Array<{ t: string; d: string; n: number }>> = [];
  steps.forEach((s, i) => {
    if (i % perRow === 0) rows.push([]);
    rows[rows.length - 1].push({ ...s, n: i + 1 });
  });
  const cols =
    perRow === 4
      ? "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]"
      : "lg:grid-cols-[1fr_auto_1fr_auto_1fr]";
  return (
    <HoverEffect className="mt-16 space-y-6 lg:space-y-8">
      {rows.map((row, r) => (
        <div key={r} className={`grid grid-cols-1 ${cols} items-stretch gap-3 lg:gap-4`}>
          {row.flatMap((s, i) =>
            i === 0
              ? [<StepCard key={s.n} {...s} />]
              : [<StepArrow key={`a${s.n}`} />, <StepCard key={s.n} {...s} />],
          )}
        </div>
      ))}
    </HoverEffect>
  );
}

export function MetalmecanicaWorkflow() {
  return (
    <section
      id="flujo"
      className="py-24 md:py-32 border-t border-hairline bg-surface/30 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Flujo de trabajo"
          title={
            <>
              De la recepción de la pieza a la{" "}
              <span className="font-serif-italic text-primary">factura</span>.
            </>
          }
          description="El recorrido de un trabajo en OPERA. Mantenimiento y fabricación comparten el mismo diagnóstico, costeo y partes diarios; una misma orden de servicio puede generar ambas."
        />
        <StepRows steps={c.workflow} perRow={4} />
      </div>
    </section>
  );
}

export function MetalmecanicaModules() {
  return (
    <section id="modulos" className="py-24 md:py-32 border-t border-hairline scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Módulos incluidos"
          title={
            <>
              Todo el taller en{" "}
              <span className="font-serif-italic text-primary">una sola base de datos</span>.
            </>
          }
        />

        <HoverEffect className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {c.modules.map((m, i) => (
            <article
              key={m.name}
              onMouseMove={handleCardPointer}
              className="card-hover-effect-card rounded-2xl border border-hairline bg-background p-5 flex flex-col h-full"
            >
              <span className="text-xs font-mono text-primary font-semibold">{pad(i + 1)}</span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                {m.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </article>
          ))}
        </HoverEffect>

        <div className="mt-14">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            OPERA habla el idioma de tu taller
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.terms.map((term) => (
              <li
                key={term}
                className="rounded-full border border-hairline bg-surface/40 px-3 py-1 text-xs text-foreground/80"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MetalmecanicaDifferentials() {
  return (
    <section
      id="diferencial"
      className="py-24 md:py-32 border-t border-hairline bg-surface/20 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="El diferencial"
          title={
            <>
              Por qué OPERA y no un{" "}
              <span className="font-serif-italic text-primary">ERP genérico</span>.
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.differentials.map((d, i) => {
            const Icon = differentialIcons[i];
            const color = palette[i];
            return (
              <CardContainer key={d.title} className="w-full">
                <CardBody className="group/card relative h-full w-full overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-8 transition hover:border-primary/20 hover:bg-surface/70 md:p-10">
                  <div
                    aria-hidden
                    className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover/card:opacity-40"
                    style={{ background: color }}
                  />
                  <CardItem
                    as="div"
                    translateZ={40}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-hairline bg-surface/60 transition-colors"
                    style={{ color }}
                  >
                    <Icon className="w-6 h-6" />
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={50}
                    className="text-xl font-semibold tracking-tight text-foreground mb-3"
                  >
                    {d.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ={32}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {d.desc}
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

export function MetalmecanicaImplementation() {
  return (
    <section id="implementacion" className="py-24 md:py-32 border-t border-hairline scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Implementación"
          title={
            <>
              Un despliegue pensado para el{" "}
              <span className="font-serif-italic text-primary">taller</span>.
            </>
          }
        />
        <StepRows steps={c.implementation} perRow={3} />

        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="flex items-start gap-4">
            <ClipboardCheck className="w-8 h-8 text-primary shrink-0" />
            <h3 className="text-2xl font-bold text-foreground">
              Lo que conviene tener listo antes de empezar.
            </h3>
          </div>
          <ul className="space-y-4">
            {c.clientChecklist.map((item, i) => (
              <AnimatedListItem key={item} delay={i * 120}>
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </AnimatedListItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MetalmecanicaFaq() {
  return (
    <section
      id="faq"
      className="py-24 md:py-32 border-t border-hairline bg-surface/30 scroll-mt-20"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeader
          align="center"
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que preguntan los <span className="font-serif-italic text-primary">talleres</span>.
            </>
          }
        />
        <div className="mt-14 rounded-2xl border border-hairline bg-surface/30 p-6 md:p-10 shadow-xl space-y-4">
          {c.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-hairline/80 bg-background/60 px-5 transition-colors open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="border-t border-hairline/40 pb-5 pl-7 pt-4 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
