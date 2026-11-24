import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import FormsShowcasePage from '@/features/forms/components/forms-showcase-page';

export const Route = createFileRoute('/_authenticated/dashboard/forms/multi-step')({
  head: () => ({
    meta: [
      { title: 'Multi-Step Form | DEUCE' },
      { name: 'description', content: 'Multi-step wizard form pattern.' },
      { property: 'og:title', content: 'Multi-Step Form | DEUCE' },
      { property: 'og:description', content: 'Multi-step wizard form pattern.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Multi-Step Form' pageDescription='Multi-step wizard form pattern.'>
      <FormsShowcasePage />
    </PageContainer>
  )
});
