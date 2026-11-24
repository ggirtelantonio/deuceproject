import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';
import { useOrganization } from '@/lib/auth';

export default function BillingView() {
  const { organization, isLoaded } = useOrganization();

  return (
    <PageContainer
      isLoading={!isLoaded}
      access={!!organization}
      accessFallback={
        <div className='flex min-h-[400px] items-center justify-center'>
          <div className='space-y-2 text-center'>
            <h2 className='text-2xl font-semibold'>No Workspace Selected</h2>
            <p className='text-muted-foreground'>Please select or create a workspace to view billing information.</p>
          </div>
        </div>
      }
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription={`Manage your subscription and usage limits for ${organization?.name ?? ''}`}
    >
      <div className='space-y-6'>
        <Alert>
          <Icons.info className='h-4 w-4' />
          <AlertDescription>Paid plans are not set up yet. Every workspace is on the Free plan for now.</AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>{organization?.name} is on the Free plan.</CardDescription>
          </CardHeader>
          <CardContent className='text-muted-foreground text-sm'>Upgrades will appear here once payments are connected.</CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
