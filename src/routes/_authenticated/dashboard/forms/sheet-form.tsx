import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import SheetFormDemo from '@/features/forms/components/sheet-form-demo';

export const Route = createFileRoute('/_authenticated/dashboard/forms/sheet-form')({
  head: () => ({
    meta: [
      { title: 'Sheet Form | Shadcn Dashboard' },
      { name: 'description', content: 'Form patterns inside sheets and dialogs.' },
      { property: 'og:title', content: 'Sheet Form | Shadcn Dashboard' },
      { property: 'og:description', content: 'Form patterns inside sheets and dialogs.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Sheet & Dialog Forms' pageDescription='Form patterns inside sheets and dialogs with external submit buttons.'>
      <SheetFormDemo />
    </PageContainer>
  )
});
