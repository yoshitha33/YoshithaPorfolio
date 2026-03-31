import API_URL from '../config/api';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-20 relative z-10 w-full bg-slate-100 dark:bg-brand-darker/80 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-brand-accent rounded-full md:mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 rounded-2xl flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full flex-1">
                <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all shadow-sm"
                  
                />
              </div>
              <div className="w-full flex-1">
                <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all shadow-sm"
                
                />
              </div>
            </div>
            
            <div className="w-full">
              <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Message</label>
              <textarea 
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all shadow-sm resize-none"
                placeholder="Hello, I'd like to talk about..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full md:w-auto md:ml-auto mt-4 bg-brand-highlight text-white dark:text-brand-dark px-10 py-4 font-semibold rounded-lg hover:bg-brand-highlight/90 hover:shadow-lg hover:shadow-brand-highlight/20 transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && <div className="text-brand-accent mt-2 text-center bg-brand-accent/10 py-2 rounded">Message sent successfully!</div>}
            {status === 'error' && <div className="text-red-500 mt-2 text-center bg-red-500/10 py-2 rounded">Something went wrong. Please try again.</div>}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


