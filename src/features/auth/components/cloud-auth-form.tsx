import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from '@/lib/compat/link';
import { useRouter } from '@/lib/compat/navigation';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';

type Mode = 'sign-in' | 'sign-up' | 'forgot';

export function CloudAuthForm({ mode: initialMode }: { mode: 'sign-in' | 'sign-up' }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotice(null);
    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace('/dashboard/overview');
      } else if (mode === 'sign-up') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + '/dashboard/overview', data: { full_name: fullName } }
        });
        if (error) throw error;
        if (data.session) router.replace('/dashboard/overview');
        else setNotice('Check your email to confirm your account, then sign in.');
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password'
        });
        if (error) throw error;
        setNotice('If an account exists for that email, a reset link is on its way.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin + '/auth/sign-in' });
    if (result.error) {
      toast.error(result.error.message ?? 'Google sign-in failed');
      return;
    }
    if (result.redirected) return;
    router.replace('/dashboard/overview');
  }

  const title = mode === 'sign-in' ? 'Sign in' : mode === 'sign-up' ? 'Create an account' : 'Reset your password';

  return (
    <div className='bg-card text-card-foreground w-full space-y-6 rounded-xl border p-6 shadow-sm'>
      <div className='space-y-1 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground text-sm'>
          {mode === 'forgot' ? 'We will email you a link to choose a new password.' : 'Welcome! Please fill in the details to continue.'}
        </p>
      </div>
      {mode !== 'forgot' && (
        <>
          <Button type='button' variant='outline' className='w-full' onClick={google}>
            Continue with Google
          </Button>
          <div className='text-muted-foreground flex items-center gap-3 text-xs uppercase'>
            <span className='bg-border h-px flex-1' />or<span className='bg-border h-px flex-1' />
          </div>
        </>
      )}
      <form onSubmit={onSubmit} className='space-y-4'>
        {mode === 'sign-up' && (
          <div className='space-y-2'>
            <Label htmlFor='full-name'>Full name</Label>
            <Input id='full-name' value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete='name' />
          </div>
        )}
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
        </div>
        {mode !== 'forgot' && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
              {mode === 'sign-in' && (
                <button type='button' className='text-muted-foreground text-xs underline' onClick={() => setMode('forgot')}>
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              id='password'
              type='password'
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            />
          </div>
        )}
        {notice && <p className='bg-muted rounded-md p-3 text-sm'>{notice}</p>}
        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Please wait…' : mode === 'sign-in' ? 'Continue' : mode === 'sign-up' ? 'Create account' : 'Send reset link'}
        </Button>
      </form>
      <p className='text-muted-foreground text-center text-sm'>
        {mode === 'sign-up' ? (
          <>Already have an account? <Link href='/auth/sign-in' className='text-foreground underline'>Sign in</Link></>
        ) : mode === 'forgot' ? (
          <button type='button' className='text-foreground underline' onClick={() => setMode('sign-in')}>Back to sign in</button>
        ) : (
          <>Don&apos;t have an account? <Link href='/auth/sign-up' className='text-foreground underline'>Sign up</Link></>
        )}
      </p>
    </div>
  );
}
