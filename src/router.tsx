import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const isOperaHost = (hostname: string) =>
  hostname === 'opera.tideo.tech' || hostname === 'www.opera.tideo.tech';

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    rewrite: {
      input: ({ url }) => {
        if (isOperaHost(url.hostname) && !url.pathname.startsWith('/opera')) {
          url.pathname = url.pathname === '/' ? '/opera' : `/opera${url.pathname}`;
        }
        return url;
      },
      output: ({ url }) => {
        if (isOperaHost(url.hostname) && url.pathname.startsWith('/opera')) {
          url.pathname = url.pathname.replace(/^\/opera/, '') || '/';
        }
        return url;
      },
    },
  });

  return router;
};
