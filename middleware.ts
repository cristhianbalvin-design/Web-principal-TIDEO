import { rewrite, next } from '@vercel/functions';

export const config = {
  matcher: '/:path*',
};

const isStaticAsset = (pathname: string) => {
  return pathname.startsWith('/assets/') || /\.[a-zA-Z0-9]+$/.test(pathname);
};

export default function middleware(request: Request) {
  const hostname = request.headers.get('host') || '';
  const url = new URL(request.url);

  const isOperaHost = hostname === 'opera.tideo.tech' || hostname === 'www.opera.tideo.tech';

  if (isOperaHost && !url.pathname.startsWith('/opera') && !isStaticAsset(url.pathname)) {
    const newPath = url.pathname === '/' ? '/opera' : `/opera${url.pathname}`;
    return rewrite(new URL(newPath + url.search, request.url));
  }

  return next();
}

