import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, type ReactNode } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { delay } from '@/constants/mock-api';
import { AreaGraph } from '@/features/overview/components/area-graph';
import { AreaGraphSkeleton } from '@/features/overview/components/area-graph-skeleton';
import { BarGraph } from '@/features/overview/components/bar-graph';
import { BarGraphSkeleton } from '@/features/overview/components/bar-graph-skeleton';
import { PieGraph } from '@/features/overview/components/pie-graph';
import { PieGraphSkeleton } from '@/features/overview/components/pie-graph-skeleton';
import { RecentSales } from '@/features/overview/components/recent-sales';
import { RecentSalesSkeleton } from '@/features/overview/components/recent-sales-skeleton';

export const Route = createFileRoute('/_authenticated/dashboard/overview')({
  head: () => ({
    meta: [
      { title: 'Overview | Shadcn Dashboard' },
      { name: 'description', content: 'Revenue, customers, accounts and growth at a glance.' },
      { property: 'og:title', content: 'Overview | Shadcn Dashboard' },
      { property: 'og:description', content: 'Revenue, customers, accounts and growth at a glance.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: OverviewPage
});

// Each chart streams in independently after a simulated load, like the original parallel sections.
function Delayed({ name, ms, children }: { name: string; ms: number; children: ReactNode }) {
  useSuspenseQuery({ queryKey: ['overview', name], queryFn: () => delay(ms).then(() => true), staleTime: Infinity });
  return <>{children}</>;
}

function Section({ name, ms, fallback, children }: { name: string; ms: number; fallback: ReactNode; children: ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <Delayed name={name} ms={ms}>{children}</Delayed>
    </Suspense>
  );
}

function OverviewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Hi, Welcome back 👋</h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                $1,250.00
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Trending up this month <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Visitors for the last 6 months</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Down 20% this period <Icons.trendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>Acquisition needs attention</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Strong user retention <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Engagement exceed targets</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Steady performance increase <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Meets growth projections</div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'> <Section name='area' ms={2000} fallback={<AreaGraphSkeleton />}><AreaGraph /></Section></div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            <Section name='sales' ms={3000} fallback={<RecentSalesSkeleton />}><RecentSales /></Section>
          </div>
          <div className='col-span-4'><Section name='bar' ms={1000} fallback={<BarGraphSkeleton />}><BarGraph /></Section></div>
          <div className='col-span-4 min-h-0 md:col-span-3'><Section name='pie' ms={1000} fallback={<PieGraphSkeleton />}><PieGraph /></Section></div>
        </div>
      </div>
    </PageContainer>
  );
}
