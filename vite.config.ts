// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// El despliegue es en Vercel (ver vercel.json y middleware.ts); Cloudflare ya no se usa.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: [
      { path: "/" },
      { path: "/contacto" },
      { path: "/nosotros" },
      { path: "/privacidad" },
      { path: "/opera" },
      { path: "/powerbi-ia" },
      { path: "/opera/metalmecanica" },
      // Se escribe como dist/client/404.html: Vercel lo sirve con estado 404
      // para cualquier ruta que no exista.
      { path: "/404", prerender: { outputPath: "/404", autoSubfolderIndex: false } },
    ],
  },
});
