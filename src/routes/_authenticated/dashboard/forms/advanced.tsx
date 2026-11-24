import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import AdvancedFormPatterns from '@/features/forms/components/advanced-form-patterns';

export const Route = createFileRoute('/_authenticated/dashboard/forms/advanced')({
  head: () => ({
    meta: [
      { title: 'Advanced Form Patterns | Shadcn Dashboard' },
      { name: 'description', content: 'Linked fields, async validation, dynamic rows and more.' },
      { property: 'og:title', content: 'Advanced Form Patterns | Shadcn Dashboard' },
      { property: 'og:description', content: 'Linked fields, async validation, dynamic rows and more.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Advanced Form Patterns' pageDescription='Linked fields, async validation, dynamic rows, nested objects, cross-field validation, and form-level errors.'>
      <AdvancedFormPatterns />
    </PageContainer>
  )
});
