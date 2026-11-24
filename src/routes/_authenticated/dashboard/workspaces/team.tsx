import { createFileRoute } from '@tanstack/react-router';
import TeamView from '@/features/workspaces/components/team-view';

export const Route = createFileRoute('/_authenticated/dashboard/workspaces/team')({
  head: () => ({
    meta: [
      { title: 'Team | Shadcn Dashboard' },
      { name: 'description', content: 'Manage workspace members and roles.' },
      { property: 'og:title', content: 'Team | Shadcn Dashboard' },
      { property: 'og:description', content: 'Manage workspace members and roles.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <TeamView />
  )
});
