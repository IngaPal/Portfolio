import { useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthTest = () => {
  const [status, setStatus] = useState('');

  const testAuth = async () => {
    try {
      setStatus('Testing connection...');
      
      // Clear any existing session
      await supabase.auth.signOut();
      
      // Try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@example.com',
        password: 'admin123'
      });

      if (error) throw error;

      setStatus(`Success! Logged in as: ${data.user?.email}`);
      
    } catch (err: unknown) {
      console.error('Test failed:', err);
      setStatus(`Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/50 backdrop-blur rounded-lg border border-cyan-500/20">
      <button 
        onClick={testAuth} 
        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg text-white transition-colors"
      >
        Test Auth
      </button>
      {status && (
        <div className="mt-2 text-sm text-gray-300">
          {status}
        </div>
      )}
    </div>
  );
};

export default AuthTest;