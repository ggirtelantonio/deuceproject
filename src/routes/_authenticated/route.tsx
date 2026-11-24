import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

// Signed-in gate for everything under /dashboard. The session lives in browser storage, so this runs client-side.
export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: '/auth/sign-in', search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />
});
