import { useEffect, useState, RefObject } from "react";

export function useParallax(ref: RefObject<HTMLElement | null>, speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return; // Do nothing if reduced motion is preferred
    }

    let requestId: number;
    let isIntersecting = false;

    const handleScroll = () => {
      if (!isIntersecting || !ref.current) return;
      if (requestId) cancelAnimationFrame(requestId);
      
      requestId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setOffset(-rect.top * speed);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: "100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [ref, speed]);

  return offset;
}
