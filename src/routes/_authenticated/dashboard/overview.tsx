import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/overview-page';

export const Route = createFileRoute('/_authenticated/dashboard/overview')({
  head: () => ({
    meta: [
      { title: 'Overview | DEUCE' },
      { name: 'description', content: 'Active AI employees, tasks, success rate, hours saved and approvals.' },
      { property: 'og:title', content: 'Overview | DEUCE' },
      { property: 'og:description', content: 'Active AI employees, tasks, success rate, hours saved and approvals.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
