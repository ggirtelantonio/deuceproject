import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CustomerStatus, EmployeeStatus, RunResult, WorkflowStatus } from '@/constants/deuce-data';

export function DemoBadge() {
  return (
    <Badge variant='muted' className='label-mono gap-1.5 normal-case tracking-normal'>
      <span className='bg-warning size-1.5 rounded-full' /> Demo data
    </Badge>
  );
}

export function Stat({ label, value, hint, trend }: { label: string; value: string; hint?: string; trend?: string }) {
  return (
    <Card className='surface animate-enter gap-2 p-5 transition-colors hover:border-primary/25'>
      <div className='label-mono'>{label}</div>
      <div className='font-mono text-3xl font-medium tracking-tight tabular-nums'>{value}</div>
      <div className='text-muted-foreground flex items-center gap-2 text-xs'>
        {trend && <span className='text-success font-mono'>{trend}</span>}
        {hint}
      </div>
    </Card>
  );
}

export function SectionCard({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={cn('surface animate-enter gap-0 p-0', className)}>
      <div className='flex items-center justify-between border-b px-5 py-3.5'>
        <h3 className='text-sm font-medium'>{title}</h3>
        {action}
      </div>
      <div className='p-5'>{children}</div>
    </Card>
  );
}

const employeeMap: Record<EmployeeStatus, { label: string; variant: 'success' | 'muted' | 'warning'; dot: string }> = {
  active: { label: 'Active', variant: 'success', dot: 'bg-success animate-signal' },
  paused: { label: 'Paused', variant: 'muted', dot: 'bg-muted-foreground' },
  review: { label: 'Needs review', variant: 'warning', dot: 'bg-warning' }
};
export function EmployeeStatusBadge({ status }: { status: EmployeeStatus }) {
  const m = employeeMap[status];
  return (
    <Badge variant={m.variant} className='gap-1.5'>
      <span className={cn('size-1.5 rounded-full', m.dot)} />
      {m.label}
    </Badge>
  );
}

const runMap: Record<RunResult, { label: string; variant: 'success' | 'destructive' | 'warning' }> = {
  success: { label: 'Succeeded', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  awaiting_approval: { label: 'Awaiting approval', variant: 'warning' }
};
export function RunBadge({ result }: { result: RunResult }) {
  const m = runMap[result];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

const wfMap: Record<WorkflowStatus, { label: string; variant: 'success' | 'muted' | 'outline' }> = {
  running: { label: 'Running', variant: 'success' },
  paused: { label: 'Paused', variant: 'muted' },
  draft: { label: 'Draft', variant: 'outline' }
};
export function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const m = wfMap[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

const custMap: Record<CustomerStatus, { label: string; variant: 'success' | 'signal' | 'warning' | 'muted' }> = {
  active: { label: 'Active', variant: 'success' },
  trial: { label: 'Trial', variant: 'signal' },
  at_risk: { label: 'At risk', variant: 'warning' },
  churned: { label: 'Churned', variant: 'muted' }
};
export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const m = custMap[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function EmployeeAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <div className={cn('border-primary/30 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border font-mono text-sm', className)}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function PageIntro({ children }: { children: ReactNode }) {
  return <div className='flex flex-wrap items-center gap-2'>{children}</div>;
}
