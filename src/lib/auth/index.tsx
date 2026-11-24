// Account + workspace context backed by Lovable Cloud. Exposes the hook shapes the
// dashboard screens use (user, organization, membership list, sign out).
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { User } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ACTIVE_WS_KEY = 'active_workspace_id';

export type AppUser = {
  id: string;
  fullName: string | null;
  imageUrl: string;
  emailAddresses: Array<{ emailAddress: string }>;
  primaryEmailAddress: { emailAddress: string } | null;
};
export type Organization = { id: string; name: string; imageUrl: string; hasImage: boolean };
export type Membership = {
  id: string;
  role: 'org:admin' | 'org:member';
  permissions: string[];
  organization: Organization;
};

type Ctx = {
  isLoaded: boolean;
  authUser: User | null;
  user: AppUser | null;
  memberships: Membership[];
  membershipsLoaded: boolean;
  orgId: string | null;
  setActiveOrg: (id: string | null) => void;
  refetchMemberships: () => Promise<unknown>;
  refetchProfile: () => Promise<unknown>;
  signOut: (opts?: { redirectUrl?: string }) => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    setOrgId(localStorage.getItem(ACTIVE_WS_KEY));
    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user ?? null);
      setLoaded(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'SIGNED_IN' && event !== 'SIGNED_OUT' && event !== 'USER_UPDATED') return;
      setAuthUser(session?.user ?? null);
      if (event !== 'SIGNED_OUT') void queryClient.invalidateQueries({ queryKey: ['account'] });
    });
    return () => sub.subscription.unsubscribe();
  }, [queryClient]);

  const uid = authUser?.id;

  const profileQ = useQuery({
    queryKey: ['account', 'profile', uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', uid!).maybeSingle();
      if (error) throw error;
      return data;
    }
  });

  const membershipsQ = useQuery({
    queryKey: ['account', 'memberships', uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workspace_members')
        .select('id, role, workspaces(id, name, image_url)')
        .eq('user_id', uid!)
        .order('created_at');
      if (error) throw error;
      return (data ?? [])
        .filter((m) => m.workspaces)
        .map<Membership>((m) => ({
          id: m.id,
          role: m.role === 'admin' ? 'org:admin' : 'org:member',
          permissions: m.role === 'admin' ? ['org:teams:manage'] : [],
          organization: {
            id: m.workspaces!.id,
            name: m.workspaces!.name,
            imageUrl: m.workspaces!.image_url ?? '',
            hasImage: !!m.workspaces!.image_url
          }
        }));
    }
  });

  const user = useMemo<AppUser | null>(() => {
    if (!authUser) return null;
    const email = profileQ.data?.email ?? authUser.email ?? '';
    const meta = authUser.user_metadata ?? {};
    return {
      id: authUser.id,
      fullName: profileQ.data?.full_name ?? meta['full_name'] ?? meta['name'] ?? email.split('@')[0] ?? null,
      imageUrl: profileQ.data?.avatar_url ?? meta['avatar_url'] ?? '',
      emailAddresses: [{ emailAddress: email }],
      primaryEmailAddress: { emailAddress: email }
    };
  }, [authUser, profileQ.data]);

  const memberships = membershipsQ.data ?? [];
  const validOrgId = memberships.some((m) => m.organization.id === orgId) ? orgId : (memberships[0]?.organization.id ?? null);

  const setActiveOrg = useCallback((id: string | null) => {
    if (id) localStorage.setItem(ACTIVE_WS_KEY, id);
    else localStorage.removeItem(ACTIVE_WS_KEY);
    setOrgId(id);
  }, []);

  const signOut = useCallback(
    async (opts?: { redirectUrl?: string }) => {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      void navigate({ href: opts?.redirectUrl ?? '/auth/sign-in', replace: true });
    },
    [navigate, queryClient]
  );

  const value: Ctx = {
    isLoaded,
    authUser,
    user,
    memberships,
    membershipsLoaded: !uid || membershipsQ.isFetched,
    orgId: validOrgId,
    setActiveOrg,
    refetchMemberships: membershipsQ.refetch,
    refetchProfile: profileQ.refetch,
    signOut
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useCtx() {
  const c = useContext(AuthContext);
  if (!c) throw new Error('Auth hooks must be used inside <AuthProvider>');
  return c;
}

export function useUser() {
  const c = useCtx();
  return { user: c.user, isLoaded: c.isLoaded, isSignedIn: !!c.user, refetch: c.refetchProfile };
}

export function useAuth() {
  const c = useCtx();
  return { userId: c.user?.id ?? null, orgId: c.orgId, isLoaded: c.isLoaded, isSignedIn: !!c.user, signOut: c.signOut };
}

export function useClerk() {
  const c = useCtx();
  return { signOut: c.signOut };
}

export function useOrganization() {
  const c = useCtx();
  const membership = c.memberships.find((m) => m.organization.id === c.orgId) ?? null;
  return {
    organization: membership?.organization ?? null,
    membership,
    isLoaded: c.isLoaded && c.membershipsLoaded
  };
}

export function useOrganizationList(_opts?: unknown) {
  const c = useCtx();
  return {
    isLoaded: c.isLoaded && c.membershipsLoaded,
    setActive: async ({ organization }: { organization: string | null }) => c.setActiveOrg(organization),
    userMemberships: { data: c.memberships, revalidate: c.refetchMemberships }
  };
}
