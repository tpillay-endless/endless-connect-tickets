'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type StaffRole = 'admin' | 'staff';

export type StaffSessionUser = {
  name: string;
  role: StaffRole;
  createdAt?: string;
};

type UseStaffSessionOptions = {
  /**
   * Auto-fetch the current session on mount. Defaults to true.
   */
  autoRefresh?: boolean;
  /**
   * Restrict the session to a specific role. When provided, non-matching roles
   * will be treated as unauthenticated with an authorization error.
   */
  requiredRole?: StaffRole;
};

type State = {
  loading: boolean;
  session: StaffSessionUser | null;
  error?: string;
};

const DEFAULT_STATE: State = { loading: false, session: null };

type StaffMeResponse = {
  ok: boolean;
  error?: string;
  user?: {
    name: string;
    role: StaffRole;
    createdAt?: string;
  };
};

type StaffLoginResponse = {
  ok: boolean;
  error?: string;
  user?: {
    name: string;
    role: StaffRole;
    createdAt?: string;
  };
};

function handleRoleGate(
  session: StaffSessionUser | null,
  requiredRole?: StaffRole
): { session: StaffSessionUser | null; error?: string } {
  if (!session) return { session: null, error: 'No active session' };
  if (requiredRole && session.role !== requiredRole) {
    return { session: null, error: 'Unauthorized' };
  }
  return { session, error: undefined };
}

export function useStaffSession(options: UseStaffSessionOptions = {}) {
  const { autoRefresh = true, requiredRole } = options;
  const [state, setState] = useState<State>({ ...DEFAULT_STATE, loading: autoRefresh });

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
   try {
      const r = await fetch('/tickets/api/staff/me', { cache: 'no-store' });
      const data = (await r.json().catch(() => null)) as StaffMeResponse | null;
      if (!r.ok || !data?.ok || !data.user) {
        setState({
          loading: false,
          session: null,
          error: data?.error || 'No active session',
        });
        return;
      }
      const { session, error } = handleRoleGate(
        {
          name: data.user.name,
          role: data.user.role,
          createdAt: data.user.createdAt,
        },
        requiredRole
      );
      setState({ loading: false, session, error });
    } catch (err) {
      console.error('[useStaffSession] refresh failed', err);
      setState({ loading: false, session: null, error: 'Auth check failed' });
    }
  }, [requiredRole]);

  useEffect(() => {
    if (autoRefresh) {
      refresh();
    }
  }, [autoRefresh, refresh]);

  const login = useCallback(
    async (name: string, password: string): Promise<{
      ok: boolean;
      user: StaffSessionUser | null;
      error?: string;
    }> => {
      setState((prev) => ({ ...prev, loading: true, error: undefined }));
      try {
        const r = await fetch('/tickets/api/staff/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, password }),
        });
        const data = (await r.json().catch(() => null)) as StaffLoginResponse | null;
        if (!r.ok || !data?.ok || !data.user) {
          const error = data?.error || 'Login failed';
          setState({ loading: false, session: null, error });
          return { ok: false, user: null, error };
        }
        const { session, error } = handleRoleGate(
          { name: data.user.name, role: data.user.role },
          requiredRole
        );
        setState({ loading: false, session, error });
        return { ok: !error && !!session, user: session, error };
      } catch (err) {
        console.error('[useStaffSession] login failed', err);
        setState({ loading: false, session: null, error: 'Login failed' });
        return { ok: false, user: null, error: 'Login failed' };
      }
    },
    [requiredRole]
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/tickets/api/staff/logout', { method: 'POST' });
    } catch (err) {
      console.error('[useStaffSession] logout failed', err);
    } finally {
      setState({ loading: false, session: null });
    }
  }, []);

  const derived = useMemo(() => {
    const { session, error } = state;
    const isAuthenticated = !!session;
    const role: StaffRole | null = session?.role ?? null;
    return { session, error, isAuthenticated, role };
  }, [state]);

  return {
    ...derived,
    loading: state.loading,
    refresh,
    login,
    logout,
    state,
  };
}
