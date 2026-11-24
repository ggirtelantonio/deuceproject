// Small adapter so ported components keep a familiar navigation API on top of TanStack Router.
import { notFound as tsNotFound, useLocation, useRouter as useTsRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export function useRouter() {
  const router = useTsRouter();
  return useMemo(
    () => ({
      push: (href: string) => router.navigate({ href }),
      replace: (href: string) => router.navigate({ href, replace: true }),
      back: () => router.history.back(),
      refresh: () => router.invalidate(),
      prefetch: (href: string) => router.preloadRoute({ href } as never).catch(() => undefined)
    }),
    [router]
  );
}

export function usePathname() {
  return useLocation({ select: (l) => l.pathname });
}

export function useSearchParams() {
  const searchStr = useLocation({ select: (l) => l.searchStr });
  return useMemo(() => new URLSearchParams(searchStr), [searchStr]);
}

export function notFound(): never {
  throw tsNotFound();
}
