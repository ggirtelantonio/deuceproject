import { createFileRoute } from '@tanstack/react-router';
import IconsViewPage from '@/features/elements/components/icons-view-page';

export const Route = createFileRoute('/_authenticated/dashboard/elements/icons')({
  head: () => ({
    meta: [
      { title: 'Icons | Shadcn Dashboard' },
      { name: 'description', content: 'Browse the icon set used across the dashboard.' },
      { property: 'og:title', content: 'Icons | Shadcn Dashboard' },
      { property: 'og:description', content: 'Browse the icon set used across the dashboard.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <IconsViewPage />
  )
});
