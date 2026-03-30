import API_URL from '../../config/api';
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

const ExperienceManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
    order: 1
  });

  const handleEdit = (exp) => {
    setIsEditing(true);
    setCurrentId(exp._id);
    setFormData({
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      description: exp.description,
      order: exp.order || 1
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ company: '', role: '', duration: '', description: '', order: 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = isEditing ? `${API_URL}/api/experience/${currentId}` : `${API_URL}/api/experience`;
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        refreshData();
        resetForm();
      } else {
        alert('Failed to save experience');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      const res = await fetch(`${API_URL}/api/experience/${id}`, {
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-brand-accent">Experience Management</h3>
        <button 
          onClick={resetForm}
          className="bg-brand-highlight text-white dark:text-brand-dark px-4 py-2 font-medium rounded-lg hover:bg-brand-highlight/90 transition-colors"
        >
          Add New +
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Role / Position</label>
            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="Senior Developer" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Company</label>
            <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="Tech Corp" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Duration</label>
            <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="2021 - Present" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Sort Order</label>
            <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Description</label>
          <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 resize-none"></textarea>
        </div>
        <button disabled={loading} type="submit" className="bg-brand-accent text-white dark:text-brand-dark px-6 py-2 rounded-lg font-medium hover:bg-brand-accent/90 transition-colors w-full md:w-auto">
          {loading ? 'Saving...' : isEditing ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>

      <div className="space-y-4">
        {data.experience?.length > 0 ? data.experience.map(exp => (
          <div key={exp._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{exp.role} <span className="text-brand-highlight">@ {exp.company}</span></h4>
              <p className="text-slate-400 text-sm">{exp.duration}</p>
            </div>
            <div className="flex gap-3 text-sm shrink-0">
              <button onClick={() => handleEdit(exp)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-highlight px-3 py-1.5 rounded transition-colors">Edit</button>
              <button onClick={() => handleDelete(exp._id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors">Delete</button>
            </div>
          </div>
        )) : <p className="text-slate-500">No experience added yet.</p>}
      </div>
    </div>
  );
};

export default ExperienceManager;


