import { createFileRoute } from "@tanstack/react-router";

import { NotFound } from "@/components/site/NotFound";
import { NOT_FOUND_META } from "@/lib/not-found-rewrite";

// Solo existe para prerenderizar dist/client/404.html (ver vite.config.ts).
// Vercel lo sirve con estado 404 para cualquier ruta inexistente.
export const Route = createFileRoute("/404")({
  component: NotFound,
  head: () => ({
    meta: [
      { title: "Página no encontrada | TIDEO Tech & Strategy" },
      { name: "robots", content: "noindex" },
      // Marca que usa el router para hidratar 404.html en cualquier URL (ver not-found-rewrite.ts).
      { ...NOT_FOUND_META },
    ],
  }),
});
