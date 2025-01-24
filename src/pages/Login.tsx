import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader2, User } from 'lucide-react';

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setError(null);
      setLoading(true);

      await signIn(email, password);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Login error:', err);
      
      const errorMessages: Record<string, string> = {
        'Invalid login credentials': 'Ungültige Anmeldedaten',
        'Email not confirmed': 'E-Mail wurde noch nicht bestätigt',
        'Password should be at least 6 characters': 'Das Passwort muss mindestens 6 Zeichen lang sein',
        'Invalid email or password': 'Ungültige E-Mail oder Passwort',
        'No user data received': 'Anmeldung fehlgeschlagen'
      };
      
      setError(errorMessages[error.message] || error.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      Admin-Login
      </h1>
      
      <div className="bg-black/30 backdrop-blur rounded-lg border border-cyan-500/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              required
              disabled={loading}
              autoComplete="username"
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-md focus:ring-cyan-500 focus:border-cyan-500 text-white"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Anmeldung...
              </>
            ) : (
              <>
                <User className="w-5 h-5 mr-2" />
                Anmelden
              </>
            )}
          </button>

          {import.meta.env.DEV && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-md">
              <p className="text-sm text-gray-400 mb-2">Debug Login:</p>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@example.com');
                  setPassword('admin123');
                }}
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Fill Admin Credentials
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;