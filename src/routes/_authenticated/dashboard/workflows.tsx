import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/workflows-page';

export const Route = createFileRoute('/_authenticated/dashboard/workflows')({
  head: () => ({
    meta: [
      { title: 'Workflows | DEUCE' },
      { name: 'description', content: 'Visual view of automated business processes.' },
      { property: 'og:title', content: 'Workflows | DEUCE' },
      { property: 'og:description', content: 'Visual view of automated business processes.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
