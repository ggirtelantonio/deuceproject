import { useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { employees, runs, timeAgo, type Employee } from '@/constants/deuce-data';
import { useDeuce } from '../store';
import { DemoBadge, EmployeeAvatar, EmployeeStatusBadge, RunBadge } from './shared';

export default function EmployeesPage() {
  const [open, setOpen] = useState<Employee | null>(null);
  const { employeeStatus } = useDeuce();

  return (
    <PageContainer
      pageTitle='AI Employees'
      pageDescription='Specialized AI employees, what they own, and how they are performing.'
      pageHeaderAction={<DemoBadge />}
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3'>
        {employees.map((e, i) => (
          <Card
            key={e.id}
            style={{ animationDelay: `${i * 40}ms` }}
            className='surface animate-enter group cursor-pointer gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow'
            onClick={() => setOpen(e)}
            role='button'
            tabIndex={0}
            onKeyDown={(ev) => ev.key === 'Enter' && setOpen(e)}
          >
            <div className='flex items-start gap-3'>
              <EmployeeAvatar name={e.name} />
              <div className='min-w-0 flex-1'>
                <div className='font-medium'>{e.name}</div>
                <div className='text-muted-foreground text-sm'>{e.role}</div>
              </div>
              <EmployeeStatusBadge status={employeeStatus[e.id] ?? e.status} />
            </div>
            <ul className='text-muted-foreground space-y-1.5 text-sm'>
              {e.responsibilities.map((r) => (
                <li key={r} className='flex gap-2'><span className='text-primary'>›</span>{r}</li>
              ))}
            </ul>
            <div className='grid grid-cols-3 gap-2 border-t pt-4'>
              <Metric label='Tasks' value={e.tasksCompleted.toLocaleString()} />
              <Metric label='Success' value={`${e.successRate}%`} />
              <Metric label='Hrs saved' value={String(e.hoursSaved)} />
            </div>
          </Card>
        ))}
      </div>
      <EmployeeSheet employee={open} onClose={() => setOpen(null)} />
    </PageContainer>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className='label-mono'>{label}</div>
      <div className='font-mono text-sm tabular-nums'>{value}</div>
    </div>
  );
}

function EmployeeSheet({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  const { employeeStatus, setEmployeeStatus } = useDeuce();
  const e = employee;
  const status = e ? (employeeStatus[e.id] ?? e.status) : 'active';
  const history = e ? runs.filter((r) => r.employeeId === e.id) : [];
  return (
    <Sheet open={!!e} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className='w-full overflow-y-auto sm:max-w-lg'>
        {e && (
          <>
            <SheetHeader>
              <div className='flex items-center gap-3'>
                <EmployeeAvatar name={e.name} />
                <div>
                  <SheetTitle>{e.name} · {e.role}</SheetTitle>
                  <SheetDescription>{e.department} · last active {timeAgo(e.lastActive)}</SheetDescription>
                </div>
              </div>
            </SheetHeader>
            <div className='space-y-6 px-4 pb-6'>
              <div className='flex flex-wrap items-center gap-2'>
                <EmployeeStatusBadge status={status} />
                <div className='ml-auto flex gap-2'>
                  {status === 'paused' ? (
                    <Button size='sm' variant='outline' onClick={() => setEmployeeStatus(e.id, 'active')}><Icons.play /> Resume</Button>
                  ) : (
                    <Button size='sm' variant='outline' onClick={() => setEmployeeStatus(e.id, 'paused')}><Icons.pause /> Pause</Button>
                  )}
                  <Button size='sm' onClick={() => toast.info('Running tasks on demand is not available yet. No AI model is connected.')}>
                    <Icons.bolt /> Run task
                  </Button>
                </div>
              </div>
              <div>
                <div className='label-mono mb-2'>Uses</div>
                <div className='flex flex-wrap gap-1.5'>
                  {e.tools.map((t) => <span key={t} className='bg-muted rounded-md border px-2 py-0.5 text-xs'>{t}</span>)}
                </div>
              </div>
              <div>
                <div className='label-mono mb-2'>Execution history</div>
                <ul className='divide-y rounded-lg border'>
                  {history.map((r) => (
                    <li key={r.id} className='flex items-center gap-3 px-3 py-2.5 text-sm'>
                      <div className='min-w-0 flex-1'>
                        <div className='truncate'>{r.task}</div>
                        <div className='text-muted-foreground font-mono text-xs'>{timeAgo(r.startedAt)} · {r.durationMin} min</div>
                      </div>
                      <RunBadge result={r.result} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
