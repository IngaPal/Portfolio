import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const log = (message: string, data?: unknown) => {
  if (import.meta.env.DEV) {
    console.log(`[Auth Context] ${message}`, data || '');
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: false
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        log('Initializing auth...');
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          log('Found existing session:', { email: session.user.email });
          
          const { data: profile } = await supabase
            .from('users')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          setState({
            user: session.user,
            isAdmin: !!profile?.is_admin,
            loading: false
          });

          if (location.pathname === '/login') {
            navigate(profile?.is_admin ? '/admin' : '/');
          }
        } else {
          setState({ user: null, isAdmin: false, loading: false });
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setState({ user: null, isAdmin: false, loading: false });
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      log('Auth state changed:', { event, email: session?.user?.email });
      
      if (event === 'SIGNED_OUT') {
        setState({ user: null, isAdmin: false, loading: false });
        navigate('/login');
        return;
      }

      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('users')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          setState({
            user: session.user,
            isAdmin: !!profile?.is_admin,
            loading: false
          });

          if (location.pathname === '/login') {
            navigate(profile?.is_admin ? '/admin' : '/');
          }
        } catch (err) {
          console.error('Profile fetch error:', err);
          setState({ user: null, isAdmin: false, loading: false });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      console.log('Starting sign in attempt...');
  
      // Очищаем localStorage и существующую сессию
      localStorage.clear();
      await supabase.auth.signOut();
      
      console.log('Session cleared, attempting login...');
  
      // Пробуем войти
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });
      console.log('Sign in response:', { data, error });
  
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
  
      if (!data.user) {
        throw new Error('No user data received');
      }
  
      console.log('Auth successful, checking admin status...');
  
      // Проверяем админ права
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();
  
      console.log('Profile check response:', { profile, profileError });
  
      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw profileError;
      }
  
      console.log('Setting state with admin status:', !!profile?.is_admin);
  
      setState({
        user: data.user,
        isAdmin: !!profile?.is_admin,
        loading: false
      });
  
      console.log('Navigation starting, isAdmin:', !!profile?.is_admin);
  
      // Немного задержки перед навигацией
      await new Promise(resolve => setTimeout(resolve, 100));
  
      if (profile?.is_admin) {
        console.log('Navigating to admin panel...');
        navigate('/admin', { replace: true });
      } else {
        console.log('Navigating to home...');
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Full sign in error:', err);
      setState(prev => ({ ...prev, loading: false }));
      throw err;
    }
  };
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await supabase.auth.signOut();
      setState({ user: null, isAdmin: false, loading: false });
      navigate('/login');
    } catch (err) {
      setState(prev => ({ ...prev, loading: false }));
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};