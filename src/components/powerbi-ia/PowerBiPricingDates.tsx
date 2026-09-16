import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Flame,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

// Fecha límite para descuento de lanzamiento: 30 de setiembre de 2026, 23:59:59 (Hora Perú, UTC-5)
const DISCOUNT_DEADLINE = new Date("2026-09-30T23:59:59-05:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getTimeRemaining(): TimeLeft {
  const now = Date.now();
  const diff = DISCOUNT_DEADLINE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export function PowerBiPricingDates() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    {
      num: "Sesión 1",
      date: "Lun. 5 oct",
      topic: "Nivel 1: IA como Asistente Analítico & Prompting DAX",
      time: "19:00 - 22:00",
    },
    {
      num: "Sesión 2",
      date: "Mié. 7 oct",
      topic: "Nivel 2: IA como Coworker & Modelado Dimensional",
      time: "19:00 - 22:00",
    },
    {
      num: "Sesión 3",
      date: "Lun. 12 oct",
      topic: "Nivel 3: IA como Operador de Código M & Python",
      time: "19:00 - 22:00",
    },
    {
      num: "Sesión 4",
      date: "Mié. 14 oct",
      topic: "Proyecto Integrador C.I.A. & Storytelling Ejecutivo",
      time: "19:00 - 22:00",
    },
  ];

  const includes = [
    "12 horas de formación práctica en vivo (4 sesiones de 3h)",
    "Biblioteca exclusiva de prompts C.I.A. verificados",
    "Archivos PBIX maestros, datasets reales y plantillas DAX",
    "Acceso de por vida a grabaciones en alta definición",
    "Revisión y feedback personalizado del proyecto final",
    "Certificado de finalización oficial por TIDEO Academy",
  ];

  return (
    <section id="inversion" className="py-24 md:py-36 relative scroll-mt-20">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[36rem] rounded-full bg-academy/10 blur-[150px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          align="center"
          eyebrow="Inversión y Fechas"
          title={
            <>
              Una inversión que se amortiza en{" "}
              <span className="font-serif-italic text-academy">tu primer dashboard</span>.
            </>
          }
          description="Edición intensiva en vivo de Power BI + IA Agéntica diseñada para profesionales que ya usan Power BI y buscan pasar de tareas manuales a operar con agentes inteligentes."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Principal: Inversión & Descuento */}
          <div className="lg:col-span-7 rounded-3xl border border-academy/30 bg-surface/50 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-academy/10 blur-3xl pointer-events-none" />

            <div>
              {/* Badge de Urgencia (solo si la oferta está activa) */}
              {!timeLeft.isExpired ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-academy/15 text-academy border border-academy/30 mb-6">
                  <Flame className="w-3.5 h-3.5 text-academy animate-pulse" />
                  <span>Descuento de lanzamiento válido hasta el 30 de setiembre</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface border border-hairline text-muted-foreground mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-academy" />
                  <span>Próxima cohorte · Inscripción abierta</span>
                </div>
              )}

              {/* Bloque de Precios */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {!timeLeft.isExpired
                    ? "Inversión con descuento de lanzamiento"
                    : "Inversión del programa"}
                </div>

                <div className="flex flex-wrap items-baseline gap-4">
                  {!timeLeft.isExpired ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-medium text-muted-foreground/70 line-through">
                        S/ 500
                      </span>
                      <span className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
                        S/ 350
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-academy text-background shadow-[0_0_20px_-3px_rgba(249,115,22,0.6)]">
                        30% dcto.
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
                      S/ 500
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Pago único en Soles (PEN) o equivalente en USD. Incluye comprobante de pago
                  (boleta o factura).
                </p>
              </div>

              {/* Countdown regresivo (activo solo mientras diff > 0) */}
              {!timeLeft.isExpired && (
                <div
                  suppressHydrationWarning
                  className="mb-8 p-5 rounded-2xl bg-background/60 border border-academy/20 shadow-inner"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-academy">
                      <Clock className="w-3.5 h-3.5" />
                      <span>El descuento finaliza en:</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      30 Sep · 23:59 (GMT-5)
                    </span>
                  </div>

                  <div
                    suppressHydrationWarning
                    className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center"
                  >
                    <div className="p-2.5 sm:p-3 rounded-xl bg-surface/80 border border-hairline">
                      <div
                        suppressHydrationWarning
                        className="text-xl sm:text-2xl font-bold text-foreground font-mono"
                      >
                        {String(timeLeft.days).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        Días
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-surface/80 border border-hairline">
                      <div
                        suppressHydrationWarning
                        className="text-xl sm:text-2xl font-bold text-foreground font-mono"
                      >
                        {String(timeLeft.hours).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        Horas
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-surface/80 border border-hairline">
                      <div
                        suppressHydrationWarning
                        className="text-xl sm:text-2xl font-bold text-foreground font-mono"
                      >
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        Min
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-surface/80 border border-hairline">
                      <div
                        suppressHydrationWarning
                        className="text-xl sm:text-2xl font-bold text-academy font-mono"
                      >
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        Seg
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lo que incluye */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  Todo lo que incluye tu inscripción:
                </div>
                {includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-academy shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Aviso de cupos */}
            <div className="pt-6 border-t border-hairline/60">
              <a
                href="#inscripcion"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-academy px-8 py-4 text-base font-semibold text-background hover:bg-academy/90 transition-all duration-200 shadow-[0_0_35px_-6px_rgba(249,115,22,0.6)] hover:shadow-[0_0_45px_-4px_rgba(249,115,22,0.8)]"
              >
                <span>
                  {!timeLeft.isExpired ? "Asegurar mi cupo con descuento →" : "Asegurar mi cupo →"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-academy" />
                  Cupos limitados por cohorte
                </span>
                <span className="text-hairline">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-academy" />
                  Garantía de calidad TIDEO
                </span>
              </div>
            </div>
          </div>

          {/* Card Secundaria: Calendario y Cronograma */}
          <div className="lg:col-span-5 rounded-3xl border border-hairline bg-surface/30 p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-academy mb-3">
                <Calendar className="w-4 h-4" />
                <span>Fechas y formato</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                Inicia lunes 5 de octubre
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Clases lunes y miércoles · 4 sesiones de 3 horas (12 horas de clase en vivo con
                práctica real).
              </p>

              {/* Lista de sesiones con fechas exactas */}
              <div className="space-y-3.5 mb-8">
                {sessions.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-background/60 border border-hairline/70 hover:border-academy/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold text-academy uppercase">
                        {s.num} · {s.date}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">{s.time}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground/90 leading-snug">
                      {s.topic}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles operativos */}
            <div className="p-4 rounded-2xl bg-surface border border-hairline text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Clock className="w-3.5 h-3.5 text-academy" />
                <span>Horario: 19:00 a 22:00 (Hora Perú / GMT-5)</span>
              </div>
              <p className="leading-relaxed">
                Sesiones interactivas por Zoom/Google Meet. Podrás resolver dudas en vivo
                directamente con el instructor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
