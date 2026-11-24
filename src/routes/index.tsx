import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

// Sends signed-in people to the dashboard and everyone else to sign in.
export const Route = createFileRoute('/')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Shadcn Dashboard' }, { name: 'description', content: 'Open source admin dashboard with charts, tables, forms, kanban, chat and team workspaces.' }, { property: 'og:title', content: 'Shadcn Dashboard' }, { property: 'og:description', content: 'Open source admin dashboard with charts, tables, forms, kanban, chat and team workspaces.' }] }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    throw redirect({ to: data.user ? '/dashboard/overview' : '/auth/sign-in' });
  }
});
