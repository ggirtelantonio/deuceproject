import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import UserListingPage from '@/features/users/components/user-listing';
import { usersInfoContent } from '@/features/users/info-content';
import { UserFormSheetTrigger } from '@/features/users/components/user-form-sheet';

export const Route = createFileRoute('/_authenticated/dashboard/users')({
  head: () => ({
    meta: [
      { title: 'Users | Shadcn Dashboard' },
      { name: 'description', content: 'Manage users with a searchable, sortable table.' },
      { property: 'og:title', content: 'Users | Shadcn Dashboard' },
      { property: 'og:description', content: 'Manage users with a searchable, sortable table.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Users' pageDescription='Manage users (React Query + nuqs table pattern.)' infoContent={usersInfoContent} pageHeaderAction={<UserFormSheetTrigger />}>
      <UserListingPage />
    </PageContainer>
  )
});
