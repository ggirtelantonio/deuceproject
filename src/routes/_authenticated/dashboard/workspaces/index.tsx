import { createFileRoute } from '@tanstack/react-router';
import WorkspacesView from '@/features/workspaces/components/workspaces-view';

export const Route = createFileRoute('/_authenticated/dashboard/workspaces/')({
  head: () => ({
    meta: [
      { title: 'Workspaces | Shadcn Dashboard' },
      { name: 'description', content: 'Create and switch between workspaces.' },
      { property: 'og:title', content: 'Workspaces | Shadcn Dashboard' },
      { property: 'og:description', content: 'Create and switch between workspaces.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <WorkspacesView />
  )
});
