import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/customers-page';

export const Route = createFileRoute('/_authenticated/dashboard/customers')({
  head: () => ({
    meta: [
      { title: 'Customers | DEUCE' },
      { name: 'description', content: 'Customer accounts, plans and revenue.' },
      { property: 'og:title', content: 'Customers | DEUCE' },
      { property: 'og:description', content: 'Customer accounts, plans and revenue.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
