import { Sparkles, Terminal, ArrowRight, PlayCircle, BarChart3, Database, Cpu } from "lucide-react";

export function PowerBiHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
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
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-academy/30 bg-academy/10 backdrop-blur-md shadow-[0_0_20px_-4px_rgba(249,115,22,0.3)] mb-8">
            <span className="flex h-2 w-2 rounded-full bg-academy animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-academy">
              TIDEO Academy
            </span>
            <span className="text-muted-foreground/60 text-xs">•</span>
            <span className="text-xs font-medium text-foreground/85">Curso de especialización</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] text-gradient">
            Ya sabes Power BI. Ahora aprende a construir{" "}
            <span className="font-serif-italic text-academy underline decoration-academy/40 underline-offset-8">
              dashboards con IA
            </span>
            .
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-normal">
            12 horas para transformar tu forma de trabajar con Power BI utilizando{" "}
            <strong className="font-medium text-foreground">ChatGPT</strong>,{" "}
            <strong className="font-medium text-foreground">Claude</strong>,{" "}
            <strong className="font-medium text-foreground">Gemini</strong> y{" "}
            <strong className="font-medium text-foreground">Google Antigravity</strong> como
            asistentes, coworkers y operadores.
          </p>

          {/* Quick metadata badge list */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface/60 border border-hairline">
              <span className="w-1.5 h-1.5 rounded-full bg-academy" />
              12 horas de clase
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface/60 border border-hairline">
              <Sparkles className="w-3.5 h-3.5 text-academy" />
              Online / 100% práctico
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface/60 border border-hairline">
              <Cpu className="w-3.5 h-3.5 text-academy" />
              Proyecto integrador completo
            </span>
          </div>

          {/* Double CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inscripcion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-academy px-8 py-4 text-base font-semibold text-background hover:bg-academy/90 transition-all duration-200 shadow-[0_0_30px_-6px_rgba(249,115,22,0.6)] hover:shadow-[0_0_40px_-4px_rgba(249,115,22,0.8)]"
            >
              Quiero actualizarme en Power BI + IA
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#temario"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-surface/40 px-7 py-4 text-base font-medium text-foreground hover:bg-surface/80 transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-muted-foreground" />
              Ver programa completo
            </a>
          </div>
        </div>

        {/* Visual Element: Mockup "IA generando un dashboard" */}
        <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-hairline bg-surface/60 backdrop-blur-xl p-3 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden">
            {/* Top app bar */}
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-3 font-mono text-muted-foreground hidden sm:inline">
                  TIDEO Academy · PowerBI_Analytics_Core.pbip
                </span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-academy/10 border border-academy/30 text-academy font-mono text-[11px]">
                <Cpu className="w-3 h-3 animate-spin" />
                <span>AI Operator: Google Antigravity MCP</span>
              </div>
            </div>

            {/* Simulated AI Prompt Box */}
            <div className="mb-4 rounded-xl border border-academy/30 bg-background/80 p-3 sm:p-4 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-mono text-academy mb-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Prompt C.I.A. en ejecución:</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 font-mono leading-relaxed">
                <span className="text-muted-foreground">&gt; </span>
                <span className="text-academy font-semibold">[C]</span> Modelo Ventas+Clientes.{" "}
                <span className="text-academy font-semibold">[I]</span> Diseña medida DAX para
                Margen % y proyección Q4. <span className="text-academy font-semibold">[A]</span>{" "}
                Respeta filtros temporales y genera visual ejecutivo.
              </p>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Card 1: Generated DAX */}
              <div className="rounded-xl border border-hairline bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Database className="w-3.5 h-3.5 text-academy" /> DAX generado por IA
                  </span>
                  <span className="text-[10px] text-green-400 font-mono">100% verificado</span>
                </div>
                <div className="font-mono text-[11px] leading-snug text-foreground/80 bg-surface/50 p-2.5 rounded-lg border border-hairline/60">
                  <span className="text-academy">Margen_Pct</span> = <br />
                  <span className="text-primary">DIVIDE</span>(<br />
                  &nbsp;&nbsp;[Ventas_Netas] - [Costo_Total],
                  <br />
                  &nbsp;&nbsp;[Ventas_Netas], 0<br />)
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Validado automáticamente sin errores de contexto de filtro.
                </p>
              </div>

              {/* Card 2: Executive KPI Metric */}
              <div className="rounded-xl border border-academy/30 bg-background/70 p-4 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-academy" /> Ventas vs. Pronóstico IA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-academy/20 text-academy font-mono text-[10px]">
                    +18.4%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                  $1,248,500 <span className="text-xs text-muted-foreground font-normal">USD</span>
                </div>
                {/* Mini SVG Trend Line */}
                <div className="mt-3 h-12 w-full">
                  <svg className="w-full h-full" viewBox="0 0 200 60" fill="none">
                    <path
                      d="M0 45 Q 40 40, 70 25 T 140 30 T 200 10"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-academy"
                    />
                    <path
                      d="M0 45 Q 40 40, 70 25 T 140 30 T 200 10 L 200 60 L 0 60 Z"
                      fill="url(#grad-hero-stat)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="grad-hero-stat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-academy)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                  <span>Q1 Base</span>
                  <span className="text-academy">Q4 IA Forecast</span>
                </div>
              </div>

              {/* Card 3: Model Health & Architecture */}
              <div className="rounded-xl border border-hairline bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Diagnóstico de Esquema
                  </span>
                  <span className="text-[10px] text-academy font-mono">Star Schema</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-hairline/40">
                    <span className="text-muted-foreground">Tablas de hechos</span>
                    <span className="font-mono text-foreground">1 (Ventas)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-hairline/40">
                    <span className="text-muted-foreground">Dimensiones</span>
                    <span className="font-mono text-foreground">4 optimizadas</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Relaciones</span>
                    <span className="font-mono text-academy">1:N Unidireccional</span>
                  </div>
                </div>
                <div className="mt-2.5 px-2 py-1 rounded bg-surface text-[10px] text-muted-foreground font-mono">
                  Prompt: "Audita relaciones bidireccionales y elimina ambigüedades."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
