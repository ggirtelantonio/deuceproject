import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '@/features/notifications/components/notifications-page';

export const Route = createFileRoute('/_authenticated/dashboard/notifications')({
  head: () => ({
    meta: [
      { title: 'Notifications | DEUCE' },
      { name: 'description', content: 'All your notifications in one place.' },
      { property: 'og:title', content: 'Notifications | DEUCE' },
      { property: 'og:description', content: 'All your notifications in one place.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <NotificationsPage />
  )
});
