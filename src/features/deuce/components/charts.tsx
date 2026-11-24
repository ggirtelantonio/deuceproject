import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { employees, productivity } from '@/constants/deuce-data';

const prodConfig = {
  tasks: { label: 'Tasks completed', color: 'var(--chart-1)' },
  hours: { label: 'Hours saved', color: 'var(--chart-3)' }
} satisfies ChartConfig;

export function ProductivityChart({ className }: { className?: string }) {
  return (
    <ChartContainer config={prodConfig} className={className ?? 'aspect-auto h-[260px] w-full'}>
      <AreaChart data={productivity} margin={{ left: 4, right: 8 }}>
        <defs>
          <linearGradient id='fillTasks' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='var(--color-tasks)' stopOpacity={0.35} />
            <stop offset='100%' stopColor='var(--color-tasks)' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='fillHours' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='var(--color-hours)' stopOpacity={0.3} />
            <stop offset='100%' stopColor='var(--color-hours)' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='week' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        <ChartTooltip content={<ChartTooltipContent indicator='dot' />} />
        <Area dataKey='tasks' type='monotone' stroke='var(--color-tasks)' fill='url(#fillTasks)' strokeWidth={2} />
        <Area dataKey='hours' type='monotone' stroke='var(--color-hours)' fill='url(#fillHours)' strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}

const empConfig = { tasks: { label: 'Tasks', color: 'var(--chart-1)' } } satisfies ChartConfig;
export function TasksByEmployeeChart() {
  const data = employees.map((e) => ({ name: e.name, tasks: e.tasksCompleted }));
  return (
    <ChartContainer config={empConfig} className='aspect-auto h-[260px] w-full'>
      <BarChart data={data} layout='vertical' margin={{ left: 8 }}>
        <CartesianGrid horizontal={false} strokeDasharray='3 3' />
        <XAxis type='number' tickLine={false} axisLine={false} />
        <YAxis dataKey='name' type='category' tickLine={false} axisLine={false} width={48} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='tasks' fill='var(--color-tasks)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const rateConfig = { successRate: { label: 'Success rate %', color: 'var(--chart-3)' } } satisfies ChartConfig;
export function SuccessRateChart() {
  return (
    <ChartContainer config={rateConfig} className='aspect-auto h-[220px] w-full'>
      <BarChart data={productivity}>
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='week' tickLine={false} axisLine={false} />
        <YAxis domain={[85, 100]} tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='successRate' fill='var(--color-successRate)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
