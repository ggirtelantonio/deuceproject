import { createFileRoute } from '@tanstack/react-router';
import BillingView from '@/features/billing/billing-view';

export const Route = createFileRoute('/_authenticated/dashboard/billing')({
  head: () => ({
    meta: [
      { title: 'Billing & Plans | Shadcn Dashboard' },
      { name: 'description', content: 'Subscription and plan management.' },
      { property: 'og:title', content: 'Billing & Plans | Shadcn Dashboard' },
      { property: 'og:description', content: 'Subscription and plan management.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <BillingView />
  )
});
