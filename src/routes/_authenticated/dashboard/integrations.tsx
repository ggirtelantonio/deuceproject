import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/integrations-page';

export const Route = createFileRoute('/_authenticated/dashboard/integrations')({
  head: () => ({
    meta: [
      { title: 'Integrations | DEUCE' },
      { name: 'description', content: 'Tools available for AI employees.' },
      { property: 'og:title', content: 'Integrations | DEUCE' },
      { property: 'og:description', content: 'Tools available for AI employees.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
