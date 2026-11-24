import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import DemoForm from '@/components/forms/demo-form';

export const Route = createFileRoute('/_authenticated/dashboard/forms/basic')({
  head: () => ({
    meta: [
      { title: 'Basic Form | Shadcn Dashboard' },
      { name: 'description', content: 'A comprehensive form demo with all field types.' },
      { property: 'og:title', content: 'Basic Form | Shadcn Dashboard' },
      { property: 'og:description', content: 'A comprehensive form demo with all field types.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Basic Form' pageDescription='A comprehensive form demo with all field types.'>
      <DemoForm />
    </PageContainer>
  )
});
