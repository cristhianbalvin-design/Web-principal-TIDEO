import { createFileRoute } from "@tanstack/react-router";

import { NotFound } from "@/components/site/NotFound";

// Solo existe para prerenderizar dist/client/404.html (ver vite.config.ts).
// Vercel lo sirve con estado 404 para cualquier ruta inexistente.
export const Route = createFileRoute("/404")({
  component: NotFound,
  head: () => ({
    meta: [
      { title: "Página no encontrada | TIDEO Tech & Strategy" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
