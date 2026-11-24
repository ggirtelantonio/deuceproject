import PageContainer from '@/components/layout/page-container';
import { employees, workflows } from '@/constants/deuce-data';
import { ProductivityChart, SuccessRateChart, TasksByEmployeeChart } from './charts';
import { DemoBadge, SectionCard } from './shared';

export default function AnalyticsPage() {
  const top = [...workflows].filter((w) => w.runsThisWeek).sort((a, b) => b.runsThisWeek - a.runsThisWeek);
  const max = top[0]?.runsThisWeek ?? 1;
  return (
    <PageContainer pageTitle='Analytics' pageDescription='Output, quality and time saved across your AI workforce.' pageHeaderAction={<DemoBadge />}>
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
        <SectionCard title='Tasks and hours saved · weekly' className='xl:col-span-2'>
          <ProductivityChart className='aspect-auto h-[300px] w-full' />
        </SectionCard>
        <SectionCard title='Success rate · weekly'><SuccessRateChart /></SectionCard>
        <SectionCard title='Tasks by employee · all time'><TasksByEmployeeChart /></SectionCard>
        <SectionCard title='Workflow volume · this week'>
          <ul className='space-y-3'>
            {top.map((w) => (
              <li key={w.id}>
                <div className='mb-1 flex justify-between text-sm'><span>{w.name}</span><span className='font-mono'>{w.runsThisWeek}</span></div>
                <div className='bg-muted h-1.5 overflow-hidden rounded-full'><div className='bg-primary h-full rounded-full transition-all' style={{ width: `${(w.runsThisWeek / max) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title='Hours saved by department'>
          <ul className='space-y-3'>
            {employees.map((e) => (
              <li key={e.id} className='flex items-center justify-between text-sm'>
                <span>{e.department} <span className='text-muted-foreground'>· {e.name}</span></span>
                <span className='font-mono'>{e.hoursSaved} h</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
