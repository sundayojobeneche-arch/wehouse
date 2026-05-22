import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'student' | 'staff' | 'admin';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface Student {
  id: string;
  user_id: string;
  school: string | null;
  course: string | null;
  year_of_study: number | null;
  student_id_number: string | null;
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface Staff {
  id: string;
  user_id: string;
  department: string | null;
  position: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  student: Student | null;
  staff: Staff | null;
  role: 'student' | 'staff' | 'admin' | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (email: string, password: string, fullName: string, phone: string, role: 'student' | 'staff') => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    student: null,
    staff: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchUserData = useCallback(async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        setState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }));
        return;
      }

      const typedUser = userData as unknown as User;
      let studentData: Student | null = null;
      let staffData: Staff | null = null;

      if (typedUser.role === 'student') {
        const { data } = await supabase.from('students').select('*').eq('user_id', userId).single();
        studentData = data as unknown as Student | null;
      } else if (typedUser.role === 'staff' || typedUser.role === 'admin') {
        const { data } = await supabase.from('staff').select('*').eq('user_id', userId).single();
        staffData = data as unknown as Staff | null;
      }

      setState({ user: typedUser, student: studentData, staff: staffData, role: typedUser.role, isLoading: false, isAuthenticated: true });
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) fetchUserData(session.user.id);
      else if (event === 'SIGNED_OUT') {
        setState({ user: null, student: null, staff: null, role: null, isLoading: false, isAuthenticated: false });
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchUserData(session.user.id);
      else setState(prev => ({ ...prev, isLoading: false }));
    });
    return () => subscription.unsubscribe();
  }, [fetchUserData]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signup = async (email: string, password: string, fullName: string, phone: string, role: 'student' | 'staff') => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError || !authData.user) return { error: authError || new Error('Signup failed') };

      const { error: userError } = await supabase.from('users').insert({
        id: authData.user.id, email, full_name: fullName, phone, role,
      } as unknown as never[]);
      if (userError) return { error: userError };

      if (role === 'student') {
        await supabase.from('students').insert({ user_id: authData.user.id } as unknown as never[]);
      } else {
        await supabase.from('staff').insert({ user_id: authData.user.id, is_active: true } as unknown as never[]);
      }
      return { error: null };
    } catch (err) { return { error: err as Error }; }
  };

  const logout = async () => { await supabase.auth.signOut(); };
  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) await fetchUserData(session.user.id);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
