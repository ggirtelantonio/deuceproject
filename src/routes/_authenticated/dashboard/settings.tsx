import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/settings-page';

export const Route = createFileRoute('/_authenticated/dashboard/settings')({
  head: () => ({
    meta: [
      { title: 'Settings | DEUCE' },
      { name: 'description', content: 'Profile, workspaces and team.' },
      { property: 'og:title', content: 'Settings | DEUCE' },
      { property: 'og:description', content: 'Profile, workspaces and team.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
