import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type TracingBeamProps = ComponentPropsWithoutRef<"div">;

export function TracingBeam({ children, className, ...props }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateBeam = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      const progress = Math.min(Math.max(current / total, 0), 1);

      element.style.setProperty("--tracing-progress", `${progress * 100}%`);
    };

    updateBeam();
    window.addEventListener("scroll", updateBeam, { passive: true });
    window.addEventListener("resize", updateBeam);

    return () => {
      window.removeEventListener("scroll", updateBeam);
      window.removeEventListener("resize", updateBeam);
    };
  }, []);

  return (
    <div ref={ref} className={cn("tracing-beam", className)} {...props}>
      <div aria-hidden className="tracing-beam-track">
        <div className="tracing-beam-line" />
        <div className="tracing-beam-glow" />
      </div>
      {children}
    </div>
  );
}
