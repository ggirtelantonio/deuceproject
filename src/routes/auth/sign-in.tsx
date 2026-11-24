import { createFileRoute } from '@tanstack/react-router';
import SignInViewPage from '@/features/auth/components/sign-in-view';

export const Route = createFileRoute('/auth/sign-in')({
  head: () => ({ meta: [{ title: 'Sign In | Shadcn Dashboard' }, { name: 'description', content: 'Sign in to your dashboard.' }, { property: 'og:title', content: 'Sign In | Shadcn Dashboard' }, { property: 'og:description', content: 'Sign in to your dashboard.' }] }),
  validateSearch: (s: Record<string, unknown>) => (typeof s['redirect'] === 'string' ? { redirect: s['redirect'] } : {}),
  component: SignInViewPage
});
