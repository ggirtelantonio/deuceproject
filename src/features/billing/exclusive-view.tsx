import PageContainer from '@/components/layout/page-container';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from '@/lib/compat/link';

// No paid plans exist yet, so every workspace sees the upgrade prompt.
export default function ExclusiveView() {
  return (
    <PageContainer>
      <div className='flex h-full items-center justify-center'>
        <Alert>
          <Icons.lock className='h-5 w-5' />
          <AlertDescription>
            <div className='mb-1 text-lg font-semibold'>Pro Plan Required</div>
            <div className='text-muted-foreground'>
              This page is only available to workspaces on the <span className='font-semibold'>Pro</span> plan.
              <br />
              See&nbsp;
              <Link className='underline' href='/dashboard/billing'>Billing &amp; Plans</Link>.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </PageContainer>
  );
}
