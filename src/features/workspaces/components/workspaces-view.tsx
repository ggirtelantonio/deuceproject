import { useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { workspacesInfoContent } from '@/config/infoconfig';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, useOrganizationList } from '@/lib/auth';
import { useRouter } from '@/lib/compat/navigation';

export default function WorkspacesView() {
  const { orgId, userId } = useAuth();
  const { userMemberships, setActive, isLoaded } = useOrganizationList();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !userId) return;
    setBusy(true);
    const { data, error } = await supabase
      .from('workspaces')
      .insert({ name: name.trim(), created_by: userId })
      .select('id')
      .single();
    setBusy(false);
    if (error) return toast.error(error.message);
    setName('');
    await userMemberships.revalidate();
    await setActive({ organization: data.id });
    toast.success('Workspace created');
    router.push('/dashboard/workspaces/team');
  }

  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
      isLoading={!isLoaded}
    >
      <div className='grid gap-6 lg:grid-cols-[1fr_360px]'>
        <div className='space-y-2'>
          {userMemberships.data.length === 0 && (
            <p className='text-muted-foreground rounded-lg border border-dashed p-6 text-sm'>
              You are not in any workspace yet. Create one to get started.
            </p>
          )}
          {userMemberships.data.map((m) => (
            <div key={m.id} className='hover:bg-accent flex items-center justify-between rounded-lg border p-4'>
              <div>
                <div className='text-lg font-semibold'>{m.organization.name}</div>
                <div className='text-muted-foreground text-sm'>{m.role === 'org:admin' ? 'Admin' : 'Member'}</div>
              </div>
              {m.organization.id === orgId ? (
                <Badge>Active</Badge>
              ) : (
                <Button
                  variant='outline'
                  onClick={async () => {
                    await setActive({ organization: m.organization.id });
                    router.push('/dashboard/workspaces/team');
                  }}
                >
                  Switch
                </Button>
              )}
            </div>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create workspace</CardTitle>
            <CardDescription>You will be its admin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={create} className='space-y-3'>
              <Input placeholder='Acme Inc.' value={name} onChange={(e) => setName(e.target.value)} aria-label='Workspace name' />
              <Button type='submit' className='w-full' disabled={busy || !name.trim()}>
                Create workspace
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
