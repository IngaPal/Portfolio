import React, { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          content: formData.message
        }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err:  unknown) {
      console.error('Error sending message:', err);
      setError('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Kontakt
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Ich freue mich auf Ihre Nachricht.
        </p>
      </motion.section>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-lg blur-xl group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8 h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Kontaktieren Sie mich
            </h2>
            
            <div className="space-y-6">
              <motion.a
                href="mailto:ingapalatova@gmail.com"
                className="group/item flex items-center space-x-4 p-4 bg-black/20 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 group-hover/item:from-cyan-500/30 group-hover/item:to-purple-500/30">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">E-Mail</p>
                  <p className="text-cyan-400">ingapalatova@gmail.com</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover/item:animate-ping" />
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg blur-xl group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg">
                  Ihre Nachricht wurde erfolgreich gesendet!
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 bg-black/30 border border-cyan-500/20 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-colors resize-none"
                  required
                  disabled={loading}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Nachricht senden
                  </>
                )}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
      </div>
    </div>
  );
};

export default Contact;