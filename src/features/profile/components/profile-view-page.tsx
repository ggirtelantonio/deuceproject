import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/lib/auth';

export default function ProfileViewPage() {
  const { user, refetch } = useUser();
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName ?? '');
    setAvatarUrl(user?.imageUrl ?? '');
  }, [user?.fullName, user?.imageUrl]);

  if (!user) return null;

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, avatar_url: avatarUrl || null, updated_at: new Date().toISOString() })
      .eq('id', user!.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await refetch();
    toast.success('Profile updated');
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: next, current_password: current } as never);
    if (error) return toast.error(error.message);
    setCurrent('');
    setNext('');
    toast.success('Password changed');
  }

  return (
    <div className='flex w-full max-w-3xl flex-col gap-6 p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Profile details</CardTitle>
          <CardDescription>How you appear across your workspaces.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveProfile} className='space-y-4'>
            <UserAvatarProfile user={user} showInfo className='size-12' />
            <div className='space-y-2'>
              <Label htmlFor='fn'>Full name</Label>
              <Input id='fn' value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='av'>Avatar image URL</Label>
              <Input id='av' value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder='https://…' />
            </div>
            <div className='space-y-2'>
              <Label>Email</Label>
              <Input value={user.primaryEmailAddress?.emailAddress ?? ''} disabled />
            </div>
            <Button type='submit' disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={changePassword} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='cur'>Current password</Label>
              <Input id='cur' type='password' value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete='current-password' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new'>New password</Label>
              <Input id='new' type='password' required minLength={6} value={next} onChange={(e) => setNext(e.target.value)} autoComplete='new-password' />
            </div>
            <Button type='submit' variant='outline'>Update password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
