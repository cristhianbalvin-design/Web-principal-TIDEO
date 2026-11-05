import { ArrowRight, CalendarDays, Clock, Users, UserCheck, ListChecks } from "lucide-react";
import { COURSE, PHASES, SESSIONS, formatPEN } from "@/content/excel-app-ia";
import { PrimaryCta } from "./shared";

const facts = [
  { icon: Clock, label: "24 horas en vivo" },
  { icon: CalendarDays, label: "6 sábados" },
  { icon: Users, label: "Máximo 12 participantes" },
  { icon: UserCheck, label: "60 min de asesoría individual" },
];

/**
 * El copy pide no mostrar pantallas ficticias como resultados reales. Mientras no exista la
 * demo real de la app de referencia, el visual del hero muestra datos verdaderos del programa.
 */
function CohortCard() {
  const total = PHASES.reduce((s, p) => s + p.hours, 0);
  const tones = ["bg-academy", "bg-amber", "bg-foreground/40"];
  return (
    <div className="relative rounded-2xl border border-hairline bg-surface/60 backdrop-blur-xl p-5 sm:p-7 shadow-2xl shadow-black/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            {COURSE.cohort}
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">Tu proyecto en 6 sábados</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-academy/10 border border-academy/30 text-academy font-mono text-[11px]">
          {COURSE.scheduleShort} · Perú
        </span>
      </div>

      <ol className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {SESSIONS.map((s) => (
          <li
            key={s.n}
            className={`rounded-xl border p-3 text-center ${
              s.phase === 1
                ? "border-academy/40 bg-academy/[0.08]"
                : "border-hairline bg-background/60"
            }`}
          >
            <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Sesión {s.n}
            </span>
            <span className="mt-1 block text-sm font-semibold text-foreground whitespace-nowrap">
              {s.dateShort}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Sin clases el 26 de diciembre ni el 2 de enero.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-mono uppercase tracking-wider">Cómo se reparten las 24 h</span>
          <span className="font-mono">{total} h</span>
        </div>
        <div
          className="flex h-3 w-full overflow-hidden rounded-full bg-background/70"
          role="img"
          aria-label="6 horas de construcción guiada, 12 de laboratorio con asesoría y 6 de complementos grupales"
        >
          {PHASES.map((p, i) => (
            <span
              key={p.tag}
              className={tones[i]}
              style={{ width: `${(p.hours / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {PHASES.map((p, i) => (
            <li key={p.tag} className="flex items-start gap-2.5 text-xs">
              <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${tones[i]}`} />
              <span>
                <span className="block font-semibold text-foreground">{p.hours} h</span>
                <span className="text-muted-foreground leading-snug">{p.title}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExcelAppHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[30rem] rounded-full bg-academy/15 blur-[120px] -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-amber/10 blur-[100px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            TIDEO Tech &amp; Strategy presenta
          </p>
          <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-academy/30 bg-academy/10 backdrop-blur-md shadow-[0_0_20px_-4px_rgba(249,115,22,0.3)]">
            <span className="flex h-2 w-2 rounded-full bg-academy animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-academy">
              {COURSE.program} · {COURSE.level}
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] text-gradient text-balance">
            De Excel a tu <span className="font-serif-italic text-academy">Propia App</span> con IA
          </h1>

          <p className="mt-6 text-xl sm:text-2xl font-medium text-foreground/90 tracking-tight max-w-3xl mx-auto">
            Deja de adaptar tu negocio al software. Aprende a crear una aplicación para lo que
            realmente necesitas.
          </p>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            ¿Gestionas solicitudes, inventarios, clientes, servicios o procesos internos con hojas
            de cálculo y tareas manuales? Hoy puedes empezar a convertir una de esas necesidades en
            una aplicación funcional con ayuda de inteligencia artificial, incluso si no eres
            programador profesional.
          </p>

          <p className="mt-5 text-base sm:text-lg text-foreground/85 leading-relaxed max-w-3xl mx-auto">
            <strong className="font-semibold text-foreground">
              En este programa no vienes solamente a mirar cómo se construye una app: construyes la
              tuya.
            </strong>{" "}
            Primero desarrollamos juntos una aplicación de referencia, paso a paso y con prompts
            guiados. Después trabajas en tu propio MVP, con asesoría individual de un consultor que
            desarrolla soluciones para empresas.
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs md:text-sm text-muted-foreground">
            {facts.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface/60 border border-hairline"
              >
                <Icon className="w-3.5 h-3.5 text-academy" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-1.5">
            <p className="text-sm text-muted-foreground">
              Precio fundador ·{" "}
              <strong className="text-2xl font-semibold text-foreground align-middle">
                {formatPEN(COURSE.priceFounder)}
              </strong>
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground font-medium">Inicio:</strong> {COURSE.startLabel}.{" "}
              <strong className="text-foreground font-medium">Horario:</strong> {COURSE.schedule}.
            </p>
          </div>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryCta>
              Quiero construir mi propia app
              <ArrowRight className="w-4 h-4" />
            </PrimaryCta>
            <a
              href="#metodo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-surface/40 px-7 py-4 text-base font-medium text-foreground hover:bg-surface/80 transition-colors"
            >
              <ListChecks className="w-4 h-4 text-muted-foreground" />
              Ver programa y metodología
            </a>
          </div>

          <p className="mt-6 text-xs italic text-muted-foreground">
            Primera edición de AI Business Builder. Vacantes limitadas por el modelo de
            acompañamiento personalizado.
          </p>
        </div>

        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          <CohortCard />
        </div>
      </div>
    </section>
  );
}
