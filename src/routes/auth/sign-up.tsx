import { createFileRoute } from '@tanstack/react-router';
import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const Route = createFileRoute('/auth/sign-up')({
  head: () => ({ meta: [{ title: 'Sign Up | Shadcn Dashboard' }, { name: 'description', content: 'Create your dashboard account.' }, { property: 'og:title', content: 'Sign Up | Shadcn Dashboard' }, { property: 'og:description', content: 'Create your dashboard account.' }] }),
  component: SignUpViewPage
});
