import { Button } from '@/components/ui/button';
import { approvals, employeeById, timeAgo } from '@/constants/deuce-data';
import { useDeuce } from '../store';
import { EmployeeAvatar } from './shared';
import { Badge } from '@/components/ui/badge';

export function PendingApprovals() {
  const { approvalStatus, decide } = useDeuce();
  return (
    <ul className='divide-y'>
      {approvals.map((a) => {
        const e = employeeById(a.employeeId);
        const s = approvalStatus[a.id];
        return (
          <li key={a.id} className='flex items-start gap-3 py-3 first:pt-0 last:pb-0'>
            <EmployeeAvatar name={e?.name ?? '?'} className='size-8 text-xs' />
            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2 text-sm font-medium'>
                {a.title}
                {a.amount && <span className='text-muted-foreground font-mono text-xs'>{a.amount}</span>}
              </div>
              <div className='text-muted-foreground truncate text-xs'>{a.detail} · {e?.name} · {timeAgo(a.requestedAt)}</div>
            </div>
            {s === 'pending' ? (
              <div className='flex gap-1.5'>
                <Button size='sm' variant='ghost' onClick={() => decide(a.id, 'rejected')}>Reject</Button>
                <Button size='sm' onClick={() => decide(a.id, 'approved')}>Approve</Button>
              </div>
            ) : (
              <Badge variant={s === 'approved' ? 'success' : 'muted'}>{s === 'approved' ? 'Approved' : 'Rejected'}</Badge>
            )}
          </li>
        );
      })}
    </ul>
  );
}
