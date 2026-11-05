import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createNotFoundRewrite, detectServedNotFoundPath } from "./lib/not-found-rewrite";
import { fromLandingPath, isUnderLanding, landingForHost, toLandingPath } from "./lib/host-routes";

export const getRouter = () => {
  const queryClient = new QueryClient();
  // Solo en el navegador: si esta carga es 404.html, hidratar como la ruta /404.
  const notFound = createNotFoundRewrite(
    detectServedNotFoundPath(typeof document !== "undefined" ? document : undefined),
  );

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Subdominio ↔ landing: la tabla vive en src/lib/host-routes.ts y es la misma que usa
    // middleware.ts, para que servidor y cliente resuelvan siempre la misma ruta.
    rewrite: {
      input: ({ url }) => {
        if (notFound.input(url)) return url;
        const landing = landingForHost(url.hostname);
        if (landing && !isUnderLanding(landing, url.pathname)) {
          url.pathname = toLandingPath(landing, url.pathname);
        }
        return url;
      },
      output: ({ url }) => {
        if (notFound.output(url)) return url;
        const landing = landingForHost(url.hostname);
        if (landing && isUnderLanding(landing, url.pathname)) {
          url.pathname = fromLandingPath(landing, url.pathname);
        }
        return url;
      },
    },
  });

  return router;
};
