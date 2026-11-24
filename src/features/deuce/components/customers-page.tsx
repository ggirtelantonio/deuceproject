import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icons } from '@/components/icons';
import { timeAgo, type Customer, type CustomerStatus } from '@/constants/deuce-data';
import { useDeuce } from '../store';
import { CustomerStatusBadge, DemoBadge } from './shared';

type SortKey = 'company' | 'mrr' | 'lastContact';
const PAGE = 10;
const blank: Omit<Customer, 'id'> = { company: '', contact: '', email: '', plan: 'Growth', status: 'trial', mrr: 0, employeesDeployed: 1, lastContact: new Date().toISOString(), industry: 'SaaS' };

export default function CustomersPage() {
  const { customers, upsertCustomer, removeCustomer } = useDeuce();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | CustomerStatus>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'mrr', dir: -1 });
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<(Omit<Customer, 'id'> & { id?: number }) | null>(null);

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return customers
      .filter((c) => (status === 'all' || c.status === status) && (!t || `${c.company} ${c.contact} ${c.email}`.toLowerCase().includes(t)))
      .sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir);
  }, [customers, q, status, sort]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const view = rows.slice(page * PAGE, page * PAGE + PAGE);
  const totalMrr = customers.reduce((n, c) => n + c.mrr, 0);

  const sortBy = (key: SortKey) => setSort((s) => ({ key, dir: s.key === key ? (-s.dir as 1 | -1) : -1 }));
  const Th = ({ k, children, className }: { k: SortKey; children: string; className?: string }) => (
    <TableHead className={className}>
      <button className='hover:text-foreground inline-flex items-center gap-1' onClick={() => sortBy(k)}>
        {children}{sort.key === k && (sort.dir === 1 ? <Icons.chevronUp className='size-3' /> : <Icons.chevronDown className='size-3' />)}
      </button>
    </TableHead>
  );

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing?.company.trim()) return;
    upsertCustomer(editing);
    toast.success(editing.id ? 'Customer updated' : 'Customer added');
    setEditing(null);
  }

  return (
    <PageContainer
      pageTitle='Customers'
      pageDescription={`${customers.length} accounts · $${totalMrr.toLocaleString()} MRR`}
      pageHeaderAction={<><DemoBadge /><Button size='sm' onClick={() => setEditing({ ...blank })}><Icons.add /> Add customer</Button></>}
    >
      <Card className='surface gap-0 p-0'>
        <div className='flex flex-col gap-2 border-b p-3 sm:flex-row'>
          <Input placeholder='Search company, contact or email…' value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} className='sm:max-w-xs' aria-label='Search customers' />
          <NativeSelect value={status} onChange={(e) => { setStatus(e.target.value as typeof status); setPage(0); }} aria-label='Filter by status'>
            <NativeSelectOption value='all'>All statuses</NativeSelectOption>
            <NativeSelectOption value='active'>Active</NativeSelectOption>
            <NativeSelectOption value='trial'>Trial</NativeSelectOption>
            <NativeSelectOption value='at_risk'>At risk</NativeSelectOption>
            <NativeSelectOption value='churned'>Churned</NativeSelectOption>
          </NativeSelect>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <Th k='company'>Company</Th>
              <TableHead>Contact</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <Th k='mrr' className='text-right'>MRR</Th>
              <TableHead className='hidden lg:table-cell'>AI employees</TableHead>
              <Th k='lastContact' className='hidden md:table-cell'>Last contact</Th>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((c) => (
              <TableRow key={c.id} className='cursor-pointer' onClick={() => setEditing(c)}>
                <TableCell><div className='font-medium'>{c.company}</div><div className='text-muted-foreground text-xs'>{c.industry}</div></TableCell>
                <TableCell><div>{c.contact}</div><div className='text-muted-foreground text-xs'>{c.email}</div></TableCell>
                <TableCell>{c.plan}</TableCell>
                <TableCell><CustomerStatusBadge status={c.status} /></TableCell>
                <TableCell className='text-right font-mono tabular-nums'>${c.mrr.toLocaleString()}</TableCell>
                <TableCell className='hidden font-mono lg:table-cell'>{c.employeesDeployed}</TableCell>
                <TableCell className='text-muted-foreground hidden font-mono text-xs md:table-cell'>{timeAgo(c.lastContact)}</TableCell>
                <TableCell className='text-right'>
                  <Button size='sm' variant='ghost' aria-label={`Delete ${c.company}`} onClick={(e) => { e.stopPropagation(); removeCustomer(c.id); toast.success('Customer removed'); }}>
                    <Icons.trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {view.length === 0 && (
              <TableRow><TableCell colSpan={8} className='text-muted-foreground py-10 text-center'>No customers match.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
        <div className='text-muted-foreground flex items-center justify-between border-t px-4 py-3 text-xs'>
          <span className='font-mono'>{rows.length} results · page {page + 1}/{pages}</span>
          <div className='flex gap-1'>
            <Button size='sm' variant='outline' disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <Button size='sm' variant='outline' disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>

      <Sheet open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <SheetContent className='w-full sm:max-w-md'>
          {editing && (
            <form onSubmit={save} className='flex h-full flex-col'>
              <SheetHeader>
                <SheetTitle>{editing.id ? editing.company : 'New customer'}</SheetTitle>
                <SheetDescription>Changes are kept in this browser session only.</SheetDescription>
              </SheetHeader>
              <div className='flex-1 space-y-4 overflow-y-auto px-4'>
                {([['company', 'Company'], ['contact', 'Contact name'], ['email', 'Email'], ['industry', 'Industry']] as const).map(([k, l]) => (
                  <div key={k} className='space-y-2'>
                    <Label htmlFor={k}>{l}</Label>
                    <Input id={k} required={k === 'company'} value={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} />
                  </div>
                ))}
                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='plan'>Plan</Label>
                    <NativeSelect id='plan' value={editing.plan} onChange={(e) => setEditing({ ...editing, plan: e.target.value as Customer['plan'] })}>
                      <NativeSelectOption value='Starter'>Starter</NativeSelectOption>
                      <NativeSelectOption value='Growth'>Growth</NativeSelectOption>
                      <NativeSelectOption value='Enterprise'>Enterprise</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='status'>Status</Label>
                    <NativeSelect id='status' value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as CustomerStatus })}>
                      <NativeSelectOption value='active'>Active</NativeSelectOption>
                      <NativeSelectOption value='trial'>Trial</NativeSelectOption>
                      <NativeSelectOption value='at_risk'>At risk</NativeSelectOption>
                      <NativeSelectOption value='churned'>Churned</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mrr'>Monthly revenue ($)</Label>
                  <Input id='mrr' type='number' min={0} value={editing.mrr} onChange={(e) => setEditing({ ...editing, mrr: Number(e.target.value) })} />
                </div>
              </div>
              <SheetFooter>
                <Button type='submit'>{editing.id ? 'Save changes' : 'Add customer'}</Button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
}
