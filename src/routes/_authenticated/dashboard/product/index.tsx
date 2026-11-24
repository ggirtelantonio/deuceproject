import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import ProductListingPage from '@/features/products/components/product-listing';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Link from '@/lib/compat/link';
import { productInfoContent } from '@/config/infoconfig';

export const Route = createFileRoute('/_authenticated/dashboard/product/')({
  head: () => ({
    meta: [
      { title: 'Products | DEUCE' },
      { name: 'description', content: 'Manage products with a searchable, sortable table.' },
      { property: 'og:title', content: 'Products | DEUCE' },
      { property: 'og:description', content: 'Manage products with a searchable, sortable table.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='Products' pageDescription='Manage products (React Query + nuqs table pattern.)' infoContent={productInfoContent} pageHeaderAction={<Link href='/dashboard/product/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}><Icons.add className='mr-2 h-4 w-4' /> Add New</Link>}>
      <ProductListingPage />
    </PageContainer>
  )
});
