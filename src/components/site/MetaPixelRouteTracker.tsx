import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/meta-pixel";

/**
 * El sitio es una SPA: al navegar entre páginas no se recarga el HTML, así que el PageView del
 * código base solo cubre la primera carga. Este componente dispara uno más en cada cambio de ruta.
 */
export function MetaPixelRouteTracker() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
