import { createFileRoute } from '@tanstack/react-router';
import ProfileViewPage from '@/features/profile/components/profile-view-page';

export const Route = createFileRoute('/_authenticated/dashboard/profile')({
  head: () => ({
    meta: [
      { title: 'Profile | Shadcn Dashboard' },
      { name: 'description', content: 'Manage your profile and password.' },
      { property: 'og:title', content: 'Profile | Shadcn Dashboard' },
      { property: 'og:description', content: 'Manage your profile and password.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <ProfileViewPage />
  )
});
