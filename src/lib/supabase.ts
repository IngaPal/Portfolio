import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const SUPABASE_URL = 'https://qtfpkbubvqjbwgdyaatk.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Anon Key:', SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    storageKey: 'portfolio-auth',
    detectSessionInUrl: false,
    flowType: 'pkce',
    debug: true,
    autoRefreshToken: true
  }
});

// Установка времени жизни сессии на 30 дней
const setSessionExpiry = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) {
      const newSession = {
        ...data.session,
        expires_at: new Date(Date.now() + 604800 * 1000).toISOString() // 7 дней в миллисекундах
      };
      const { error: setSessionError } = await supabase.auth.setSession(newSession);
      if (setSessionError) throw setSessionError;
    }
  } catch (error) {
    console.error('Fehler beim Festlegen der Sitzungsdauer:', error);
  }
};

setSessionExpiry();

// Debug logging in development
if (import.meta.env.DEV) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('[Supabase Auth Event]', event);
    console.log('[Supabase Session]', session?.user?.email);
    if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed successfully');
    }
    if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      window.localStorage.clear(); // Очищаем localStorage при выходе
    }
  });
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];