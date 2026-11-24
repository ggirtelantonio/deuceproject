import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [{ title: 'Reset Password | DEUCE' }, { name: 'description', content: 'Choose a new password for your account.' }, { property: 'og:title', content: 'Reset Password | DEUCE' }, { property: 'og:description', content: 'Choose a new password for your account.' }] }),
  component: ResetPassword
});

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Password updated');
    void navigate({ to: '/dashboard/overview', replace: true });
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <form onSubmit={submit} className='bg-card w-full max-w-sm space-y-4 rounded-xl border p-6'>
        <h1 className='text-xl font-semibold'>Choose a new password</h1>
        <div className='space-y-2'>
          <Label htmlFor='pw'>New password</Label>
          <Input id='pw' type='password' required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='new-password' />
        </div>
        <Button type='submit' className='w-full' disabled={busy}>Update password</Button>
      </form>
    </div>
  );
}
