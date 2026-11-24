import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { teamInfoContent } from '@/config/infoconfig';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, useOrganization, useOrganizationList } from '@/lib/auth';
import { useRouter } from '@/lib/compat/navigation';

type Role = 'admin' | 'member';

export default function TeamView() {
  const { organization, membership, isLoaded } = useOrganization();
  const { userId } = useAuth();
  const { userMemberships } = useOrganizationList();
  const qc = useQueryClient();
  const router = useRouter();
  const isAdmin = membership?.role === 'org:admin';
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('member');
  const [wsName, setWsName] = useState<string | null>(null);

  const key = ['account', 'team', organization?.id];
  const members = useQuery({
    queryKey: key,
    enabled: !!organization,
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from('workspace_members')
        .select('id, user_id, role, created_at')
        .eq('workspace_id', organization!.id)
        .order('created_at');
      if (error) throw error;
      const ids = rows.map((r) => r.user_id);
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', ids);
      return rows.map((r) => ({ ...r, profile: profiles?.find((p) => p.id === r.user_id) }));
    }
  });

  const refresh = () => qc.invalidateQueries({ queryKey: key });

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.rpc('add_workspace_member_by_email', {
      _ws: organization!.id,
      _email: email,
      _role: role
    });
    if (error) return toast.error(error.message);
    setEmail('');
    toast.success('Member added');
    refresh();
  }

  async function changeRole(id: string, next: Role) {
    const { error } = await supabase.from('workspace_members').update({ role: next }).eq('id', id);
    if (error) return toast.error(error.message);
    refresh();
  }

  async function remove(id: string, self: boolean) {
    const { error } = await supabase.from('workspace_members').delete().eq('id', id);
    if (error) return toast.error(error.message);
    if (self) {
      await userMemberships.revalidate();
      router.push('/dashboard/workspaces');
    } else refresh();
  }

  async function rename(e: React.FormEvent) {
    e.preventDefault();
    if (!wsName?.trim()) return;
    const { error } = await supabase.from('workspaces').update({ name: wsName.trim() }).eq('id', organization!.id);
    if (error) return toast.error(error.message);
    setWsName(null);
    await userMemberships.revalidate();
    toast.success('Workspace renamed');
  }

  async function deleteWorkspace() {
    if (!confirm(`Delete ${organization!.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from('workspaces').delete().eq('id', organization!.id);
    if (error) return toast.error(error.message);
    await userMemberships.revalidate();
    router.push('/dashboard/workspaces');
  }

  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles and settings.'
      infoContent={teamInfoContent}
      isLoading={!isLoaded}
      access={!!organization}
      accessFallback={
        <div className='flex min-h-[400px] items-center justify-center text-center'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>No Workspace Selected</h2>
            <p className='text-muted-foreground'>Create or select a workspace to manage its team.</p>
            <Button onClick={() => router.push('/dashboard/workspaces')}>Go to workspaces</Button>
          </div>
        </div>
      }
    >
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Members of {organization?.name}</CardTitle>
            <CardDescription>{isAdmin ? 'You are an admin of this workspace.' : 'You are a member of this workspace.'}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.data?.map((m) => {
                  const self = m.user_id === userId;
                  return (
                    <TableRow key={m.id}>
                      <TableCell>{m.profile?.full_name ?? '—'}{self && ' (you)'}</TableCell>
                      <TableCell>{m.profile?.email ?? '—'}</TableCell>
                      <TableCell>
                        {isAdmin && !self ? (
                          <NativeSelect size='sm' value={m.role} onChange={(e) => changeRole(m.id, e.target.value as Role)} aria-label='Role'>
                            <NativeSelectOption value='admin'>Admin</NativeSelectOption>
                            <NativeSelectOption value='member'>Member</NativeSelectOption>
                          </NativeSelect>
                        ) : m.role === 'admin' ? 'Admin' : 'Member'}
                      </TableCell>
                      <TableCell className='text-right'>
                        {(isAdmin || self) && (
                          <Button size='sm' variant='ghost' onClick={() => remove(m.id, self)}>
                            {self ? 'Leave' : 'Remove'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isAdmin && (
              <form onSubmit={invite} className='flex flex-col gap-2 sm:flex-row'>
                <Input type='email' required placeholder='teammate@company.com' value={email} onChange={(e) => setEmail(e.target.value)} aria-label='Member email' />
                <NativeSelect value={role} onChange={(e) => setRole(e.target.value as Role)} aria-label='New member role'>
                  <NativeSelectOption value='member'>Member</NativeSelectOption>
                  <NativeSelectOption value='admin'>Admin</NativeSelectOption>
                </NativeSelect>
                <Button type='submit'>Add member</Button>
              </form>
            )}
            {isAdmin && <p className='text-muted-foreground text-xs'>People need an account before you can add them.</p>}
          </CardContent>
        </Card>
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Workspace settings</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form onSubmit={rename} className='flex gap-2'>
                <Input value={wsName ?? organization?.name ?? ''} onChange={(e) => setWsName(e.target.value)} aria-label='Workspace name' />
                <Button type='submit' variant='outline'>Rename</Button>
              </form>
              <Button variant='destructive' onClick={deleteWorkspace}>Delete workspace</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
