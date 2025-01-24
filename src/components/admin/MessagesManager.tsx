import { useState, useEffect } from 'react';
import { Mail, Trash2, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Message } from '../../lib/supabase';

const MessagesManager = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Möchten Sie diese Nachricht wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nachrichten</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-black/30 backdrop-blur rounded-lg border ${
              message.read ? 'border-gray-700' : 'border-cyan-500/20'
            } p-6`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className={`w-5 h-5 ${message.read ? 'text-gray-400' : 'text-cyan-400'}`} />
                  <h3 className="text-lg font-semibold">{message.name}</h3>
                  {!message.read && (
                    <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full">
                      Neu
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-2">{message.email}</p>
                <p className="text-gray-300">{message.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(message.created_at).toLocaleString('de-DE')}
                </p>
              </div>
              <div className="flex space-x-2">
                {!message.read && (
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Keine Nachrichten vorhanden
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;