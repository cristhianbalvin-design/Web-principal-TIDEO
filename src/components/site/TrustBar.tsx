import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "años de experiencia" },
  { value: "3×", label: "procesos · tecnología · adopción" },
  { value: "24h", label: "programas formativos corporativos" },
  { value: "Semanas", label: "para lanzar MVPs funcionales" },
];

function AnimatedStatValue({ value }: { value: string }) {
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

        const suffix = value.match(/[^\d]+$/)?.[0] ?? "";
        const numeric = Number.parseInt(value, 10);
        const isNumeric = Number.isFinite(numeric);
        const words = ["Días", "Horas", "Meses", "MVPs", "Semanas"];
        const startedAt = performance.now();
        const duration = 2200;

        const tick = (time: number) => {
          const elapsed = time - startedAt;
          const progress = Math.min(elapsed / duration, 1);

          if (progress >= 1) {
            setDisplayValue(value);
            return;
          }

          if (isNumeric) {
            const range = Math.max(numeric + 12, 18);
            const rolling = Math.max(1, Math.floor(((elapsed / 55) % range) + 1));
            setDisplayValue(`${rolling}${suffix}`);
          } else {
            const wordIndex = Math.floor(elapsed / 140) % words.length;
            setDisplayValue(words[wordIndex]);
          }

          window.requestAnimationFrame(tick);
        };

        window.requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
      {displayValue}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          Más de 10 años conectando operaciones, datos y tecnología para resolver
          problemas reales de negocio.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-hairline px-4 text-center">
              <AnimatedStatValue value={s.value} />
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
