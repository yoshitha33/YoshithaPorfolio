import API_URL from '../../config/api';
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

const SkillsManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    icon: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        refreshData();
        setFormData({ name: '', category: 'Frontend', icon: '' });
      } else {
        alert('Failed to save skill');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`${API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-effect p-8 rounded-2xl mb-10 w-full">
      <h3 className="text-2xl font-semibold text-brand-accent mb-6">Skills Management</h3>

      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Skill Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="e.g. React.js" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools/Other</option>
            </select>
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Icon URL</label>
            <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="https://..." />
          </div>
        </div>
        <button disabled={loading} type="submit" className="bg-brand-accent text-white dark:text-brand-dark px-6 py-2 rounded-lg font-medium hover:bg-brand-accent/90 transition-colors w-full md:w-auto">
          {loading ? 'Saving...' : 'Add Skill'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.skills?.length > 0 ? data.skills.map(skill => (
          <div key={skill._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 p-4 rounded-xl flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {skill.icon && <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />}
              <div>
                <span className="font-semibold block text-slate-800 dark:text-white leading-tight">{skill.name}</span>
                <span className="text-slate-400 text-xs">{skill.category}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(skill._id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors text-sm">Delete</button>
          </div>
        )) : <p className="text-slate-500">No skills added yet.</p>}
      </div>
    </div>
  );
};

export default SkillsManager;


