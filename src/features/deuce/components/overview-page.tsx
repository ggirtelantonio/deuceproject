import PageContainer from '@/components/layout/page-container';
import { activity, employeeById, employees, productivity, timeAgo } from '@/constants/deuce-data';
import { cn } from '@/lib/utils';
import Link from '@/lib/compat/link';
import { useDeuce } from '../store';
import { PendingApprovals } from './approvals';
import { ProductivityChart, TasksByEmployeeChart } from './charts';
import { DemoBadge, SectionCard, Stat } from './shared';

export default function DeuceOverview() {
  const { employeeStatus, approvalStatus } = useDeuce();
  const active = Object.values(employeeStatus).filter((s) => s === 'active').length;
  const tasks = employees.reduce((n, e) => n + e.tasksCompleted, 0);
  const hours = employees.reduce((n, e) => n + e.hoursSaved, 0);
  const rate = employees.reduce((n, e) => n + e.successRate * e.tasksCompleted, 0) / tasks;
  const pending = Object.values(approvalStatus).filter((s) => s === 'pending').length;
  const last = productivity.at(-1)!;
  const prev = productivity.at(-2)!;

  return (
    <PageContainer pageTitle='Overview' pageDescription='Your AI workforce at a glance.' pageHeaderAction={<DemoBadge />}>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <Stat label='Active AI employees' value={`${active}/${employees.length}`} hint='running right now' />
          <Stat label='Tasks completed' value={tasks.toLocaleString()} trend={`+${Math.round(((last.tasks - prev.tasks) / prev.tasks) * 100)}%`} hint='vs last week' />
          <Stat label='Success rate' value={`${rate.toFixed(1)}%`} hint='weighted across employees' />
          <Stat label='Hours saved' value={hours.toLocaleString()} hint='estimated, all time' />
        </div>
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-5'>
          <SectionCard title='Productivity · last 12 weeks' className='xl:col-span-3'>
            <ProductivityChart />
          </SectionCard>
          <SectionCard
            title='Pending approvals'
            className='xl:col-span-2'
            action={<span className='label-mono'>{pending} waiting</span>}
          >
            <PendingApprovals />
          </SectionCard>
        </div>
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-5'>
          <SectionCard title='Recent activity' className='xl:col-span-3' action={<Link href='/dashboard/employees' className='text-primary text-xs'>View employees</Link>}>
            <ul className='space-y-3'>
              {activity.map((a) => (
                <li key={a.id} className='flex items-start gap-3 text-sm'>
                  <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', a.kind === 'success' ? 'bg-success' : a.kind === 'warning' ? 'bg-warning' : 'bg-primary')} />
                  <div className='min-w-0 flex-1'>
                    <span className='font-medium'>{employeeById(a.employeeId)?.name}</span>{' '}
                    <span className='text-muted-foreground'>{a.text}</span>
                  </div>
                  <span className='text-muted-foreground shrink-0 font-mono text-xs'>{timeAgo(a.at)}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title='Tasks by employee' className='xl:col-span-2'>
            <TasksByEmployeeChart />
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
