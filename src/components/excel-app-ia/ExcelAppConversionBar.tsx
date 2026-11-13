import { useEffect, useState } from "react";
import { COURSE, formatPEN } from "@/content/excel-app-ia";
import { WA_URL, WhatsAppIcon, onWhatsAppClick } from "./shared";

/**
 * Sección 19: barra fija de conversión + botón flotante de WhatsApp.
 * La barra aparece al pasar el hero y se oculta mientras el formulario está en pantalla,
 * para no tapar el botón de envío. El botón de WhatsApp sube cuando la barra está visible.
 */
export function ExcelAppConversionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("inscripcion");
    let observer: IntersectionObserver | undefined;
    if (form && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
        threshold: 0.15,
      });
      observer.observe(form);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const showBar = pastHero && !formVisible;

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-academy/30 bg-background/90 backdrop-blur-xl transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
          <p className="min-w-0 text-xs sm:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {COURSE.program} · {COURSE.level}
            </span>
            <span className="hidden md:inline">
              {" "}
              — 24 horas en vivo · 12 vacantes máximo · Inicio {COURSE.startShort} ·{" "}
            </span>
            <span className="block md:inline">
              <strong className="text-academy">{formatPEN(COURSE.priceFounder)}</strong> precio
              fundador hasta el {COURSE.founderDeadlineLabel}
            </span>
          </p>
          <a
            href="#inscripcion"
            tabIndex={showBar ? 0 : -1}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-academy px-5 py-2.5 text-sm font-semibold text-background hover:bg-academy/90 transition-colors"
          >
            Inscribirme
          </a>
        </div>
      </div>

      <a
        href={WA_URL}
        onClick={onWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp sobre el curso De Excel a tu Propia App con IA"
        className={`fixed right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 ${
          showBar ? "bottom-24 md:bottom-20" : "bottom-6"
        }`}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </>
  );
}
