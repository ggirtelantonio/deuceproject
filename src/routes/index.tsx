import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

// Sends signed-in people to the dashboard and everyone else to sign in.
export const Route = createFileRoute('/')({
  ssr: false,
  head: () => ({ meta: [{ title: 'DEUCE' }, { name: 'description', content: 'Run your business with autonomous AI employees, workflows and approvals.' }, { property: 'og:title', content: 'DEUCE' }, { property: 'og:description', content: 'Open source admin dashboard with charts, tables, forms, kanban, chat and team workspaces.' }] }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    throw redirect({ to: data.user ? '/dashboard/overview' : '/auth/sign-in' });
  }
});
