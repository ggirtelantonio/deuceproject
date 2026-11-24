import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import ProductViewPage from '@/features/products/components/product-view-page';
import { productQueries } from '@/features/products/api/queries';

export const Route = createFileRoute('/_authenticated/dashboard/product/$productId')({
  loader: ({ context, params }) => {
    if (params.productId !== 'new') {
      void context.queryClient.prefetchQuery(productQueries.detail(Number(params.productId)));
    }
  },
  head: () => ({
    meta: [
      { title: 'Product | DEUCE' },
      { name: 'description', content: 'View, create or edit a product.' },
      { property: 'og:title', content: 'Product | DEUCE' },
      { property: 'og:description', content: 'View, create or edit a product.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: ProductPage
});

function ProductPage() {
  const { productId } = Route.useParams();
  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <ProductViewPage productId={productId} />
      </div>
    </PageContainer>
  );
}
