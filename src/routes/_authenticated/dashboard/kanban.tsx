import { createFileRoute } from '@tanstack/react-router';
import KanbanViewPage from '@/features/kanban/components/kanban-view-page';

export const Route = createFileRoute('/_authenticated/dashboard/kanban')({
  head: () => ({
    meta: [
      { title: 'Kanban | Shadcn Dashboard' },
      { name: 'description', content: 'Drag-and-drop task board.' },
      { property: 'og:title', content: 'Kanban | Shadcn Dashboard' },
      { property: 'og:description', content: 'Drag-and-drop task board.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <KanbanViewPage />
  )
});
