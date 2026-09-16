import { useEffect, useRef, useState } from "react";

interface MetricItem {
  value: string;
  suffix?: string;
  label: string;
  detail: string;
}

const metrics: MetricItem[] = [
  {
    value: "12",
    suffix: "h",
    label: "Horas de formación",
    detail: "Sesiones en vivo y ejercicios prácticos guiados",
  },
  {
    value: "3",
    label: "Niveles de IA",
    detail: "Asistente, Coworker y Operador de BI",
  },
  {
    value: "4",
    label: "Herramientas líderes",
    detail: "ChatGPT, Claude, Gemini y Google Antigravity",
  },
  {
    value: "1",
    label: "Proyecto integrador",
    detail: "Dashboard completo construido de inicio a fin",
  },
];

function AnimatedMetric({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        observer.disconnect();

        if (reduceMotion) {
          setDisplayValue(value);
          return;
        }

        const targetNum = Number.parseInt(value, 10);
        if (!Number.isFinite(targetNum)) {
          setDisplayValue(value);
          return;
        }

        const startedAt = performance.now();
        const duration = 1600;

        const tick = (now: number) => {
          const elapsed = now - startedAt;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * targetNum);

          setDisplayValue(current.toString());

          if (progress < 1) {
            window.requestAnimationFrame(tick);
          } else {
            setDisplayValue(targetNum.toString());
          }
        };

        window.requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
      {displayValue}
      <span className="text-academy ml-0.5">{suffix}</span>
    </div>
  );
}

export function PowerBiTrustBar() {
  return (
    <section className="border-y border-hairline bg-surface/30 py-12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`text-center md:text-left ${
                idx > 0 ? "lg:border-l lg:border-hairline lg:pl-10" : ""
              }`}
            >
              <AnimatedMetric value={m.value} suffix={m.suffix} />
              <div className="mt-2 text-sm font-semibold text-foreground tracking-tight">
                {m.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
