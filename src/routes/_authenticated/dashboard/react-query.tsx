import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { PokemonInfo } from '@/features/react-query-demo/components/pokemon-info';
import { PokemonSkeleton } from '@/features/react-query-demo/components/pokemon-skeleton';
import { reactQueryInfoContent } from '@/features/react-query-demo/info-content';

export const Route = createFileRoute('/_authenticated/dashboard/react-query')({
  head: () => ({
    meta: [
      { title: 'React Query | Shadcn Dashboard' },
      { name: 'description', content: 'Prefetch, cache and suspense query pattern.' },
      { property: 'og:title', content: 'React Query | Shadcn Dashboard' },
      { property: 'og:description', content: 'Prefetch, cache and suspense query pattern.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: () => (
    <PageContainer pageTitle='React Query' pageDescription='Prefetch + suspense query pattern.' infoContent={reactQueryInfoContent}>
      <Suspense fallback={<PokemonSkeleton />}>
        <PokemonInfo />
      </Suspense>
    </PageContainer>
  )
});
