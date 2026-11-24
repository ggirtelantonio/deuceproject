import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/analytics-page';

export const Route = createFileRoute('/_authenticated/dashboard/analytics')({
  head: () => ({
    meta: [
      { title: 'Analytics | DEUCE' },
      { name: 'description', content: 'Productivity and quality trends.' },
      { property: 'og:title', content: 'Analytics | DEUCE' },
      { property: 'og:description', content: 'Productivity and quality trends.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
