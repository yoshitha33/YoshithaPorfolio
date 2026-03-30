import API_URL from '../config/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-brand-dark z-20 relative transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-10 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Admin Login</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 dark:text-red-400 p-3 rounded mb-6 text-sm flex items-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all shadow-sm"
              required 
            />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all shadow-sm"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-brand-highlight hover:bg-brand-highlight/90 text-white dark:text-brand-dark 
            px-10 py-3 font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;


