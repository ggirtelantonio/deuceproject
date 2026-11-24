import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { employeeById, integrations } from '@/constants/deuce-data';

export default function IntegrationsPage() {
  return (
    <PageContainer pageTitle='Integrations' pageDescription='Tools your AI employees are designed to work with. None are connected yet.'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {integrations.map((it) => (
          <Card key={it.id} className='surface animate-enter gap-3 p-5'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted flex size-9 items-center justify-center rounded-lg border font-mono text-sm'>{it.name.slice(0, 2)}</div>
              <div className='min-w-0 flex-1'>
                <div className='font-medium'>{it.name}</div>
                <div className='label-mono'>{it.category}</div>
              </div>
              <Badge variant='muted'>Not connected</Badge>
            </div>
            <p className='text-muted-foreground text-sm'>{it.description}</p>
            <div className='text-muted-foreground border-t pt-3 text-xs'>
              Relevant for {it.usedBy.map((id) => employeeById(id)?.name).join(', ')}
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
