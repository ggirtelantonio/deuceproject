import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { employeeById, timeAgo, workflows, type WorkflowStep } from '@/constants/deuce-data';
import { cn } from '@/lib/utils';
import { useDeuce } from '../store';
import { DemoBadge, WorkflowStatusBadge } from './shared';

const stepStyle: Record<WorkflowStep['kind'], { label: string; cls: string }> = {
  trigger: { label: 'Trigger', cls: 'border-primary/40 bg-primary/8' },
  action: { label: 'AI step', cls: 'border-border bg-card' },
  approval: { label: 'Human approval', cls: 'border-warning/40 bg-warning/8' },
  outcome: { label: 'Outcome', cls: 'border-success/40 bg-success/8' }
};

export default function WorkflowsPage() {
  const [selectedId, setSelectedId] = useState(workflows[0]!.id);
  const { workflowStatus, setWorkflowStatus } = useDeuce();
  const wf = workflows.find((w) => w.id === selectedId)!;
  const status = workflowStatus[wf.id] ?? wf.status;

  return (
    <PageContainer pageTitle='Workflows' pageDescription='Automated business processes and where humans stay in the loop.' pageHeaderAction={<DemoBadge />}>
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-[360px_1fr]'>
        <div className='space-y-2'>
          {workflows.map((w) => {
            const s = workflowStatus[w.id] ?? w.status;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedId(w.id)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-all hover:border-primary/30',
                  w.id === selectedId ? 'border-primary/40 bg-accent shadow-glow' : 'bg-card'
                )}
              >
                <div className='flex items-center justify-between gap-2'>
                  <span className='text-sm font-medium'>{w.name}</span>
                  <WorkflowStatusBadge status={s} />
                </div>
                <div className='text-muted-foreground mt-1 font-mono text-xs'>
                  {employeeById(w.ownerId)?.name} · {w.runsThisWeek} runs/wk · last {timeAgo(w.lastRun)}
                </div>
              </button>
            );
          })}
        </div>

        <Card className='surface animate-enter gap-0 p-0' key={wf.id}>
          <div className='flex flex-wrap items-center gap-3 border-b px-5 py-4'>
            <div className='min-w-0 flex-1'>
              <h2 className='font-medium'>{wf.name}</h2>
              <p className='text-muted-foreground text-sm'>{wf.description}</p>
            </div>
            <WorkflowStatusBadge status={status} />
            {status === 'running' ? (
              <Button size='sm' variant='outline' onClick={() => setWorkflowStatus(wf.id, 'paused')}><Icons.pause /> Pause</Button>
            ) : (
              <Button size='sm' onClick={() => setWorkflowStatus(wf.id, 'running')}><Icons.play /> {status === 'draft' ? 'Activate' : 'Resume'}</Button>
            )}
          </div>
          <div className='overflow-x-auto p-6'>
            <ol className='flex min-w-max items-stretch gap-0'>
              {wf.steps.map((s, i) => (
                <li key={s.label} className='flex items-center'>
                  <div className={cn('w-48 rounded-xl border p-4 transition-colors', stepStyle[s.kind].cls)}>
                    <div className='label-mono mb-1.5'>{String(i + 1).padStart(2, '0')} · {stepStyle[s.kind].label}</div>
                    <div className='text-sm font-medium'>{s.label}</div>
                    {s.owner && <div className='text-muted-foreground mt-1 text-xs'>by {s.owner}</div>}
                  </div>
                  {i < wf.steps.length - 1 && (
                    <div className='relative mx-1 h-px w-10 bg-border'>
                      <span className={cn('bg-primary absolute -top-[3px] left-0 size-1.5 rounded-full', status === 'running' && 'animate-signal')} />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className='grid grid-cols-3 border-t'>
            {[
              ['Runs this week', String(wf.runsThisWeek)],
              ['Success rate', wf.successRate ? `${wf.successRate}%` : '—'],
              ['Owner', employeeById(wf.ownerId)?.name ?? '—']
            ].map(([l, v]) => (
              <div key={l} className='border-r px-5 py-4 last:border-r-0'>
                <div className='label-mono'>{l}</div>
                <div className='font-mono text-lg'>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
