import { createFileRoute } from '@tanstack/react-router';
import ExclusiveView from '@/features/billing/exclusive-view';

export const Route = createFileRoute('/_authenticated/dashboard/exclusive')({
  head: () => ({
    meta: [
      { title: 'Exclusive | Shadcn Dashboard' },
      { name: 'description', content: 'Pro plan exclusive area.' },
      { property: 'og:title', content: 'Exclusive | Shadcn Dashboard' },
      { property: 'og:description', content: 'Pro plan exclusive area.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <ExclusiveView />
  )
});
