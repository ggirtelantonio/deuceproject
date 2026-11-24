import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/deuce/components/employees-page';

export const Route = createFileRoute('/_authenticated/dashboard/employees')({
  head: () => ({
    meta: [
      { title: 'AI Employees | DEUCE' },
      { name: 'description', content: 'Specialized AI employees, responsibilities, status and history.' },
      { property: 'og:title', content: 'AI Employees | DEUCE' },
      { property: 'og:description', content: 'Specialized AI employees, responsibilities, status and history.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: Page
});
