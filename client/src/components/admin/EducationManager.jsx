import API_URL from '../../config/api';
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

const EducationManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    degree: '',
    institute: '',
    year: '',
    grade: '',
    order: 1
  });

  const handleEdit = (edu) => {
    setIsEditing(true);
    setCurrentId(edu._id);
    setFormData({
      degree: edu.degree,
      institute: edu.institute,
      year: edu.year,
      grade: edu.grade,
      order: edu.order || 1
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ degree: '', institute: '', year: '', grade: '', order: 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = isEditing ? `${API_URL}/api/education/${currentId}` : `${API_URL}/api/education`;
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
        alert('Failed to save education');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      const res = await fetch(`${API_URL}/api/education/${id}`, {
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
        <h3 className="text-2xl font-semibold text-brand-accent">Education Management</h3>
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
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Degree / Course</label>
            <input required type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="B.Tech in Computer Science" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Institute / School</label>
            <input required type="text" value={formData.institute} onChange={e => setFormData({...formData, institute: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="University Name" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Year / Duration</label>
            <input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="2020 - 2024" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Sort Order</label>
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Grade / GPA</label>
              <input type="text" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="CGPA: 8.5" />
            </div>
          </div>
        </div>
        <button disabled={loading} type="submit" className="bg-brand-accent text-white dark:text-brand-dark px-6 py-2 rounded-lg font-medium hover:bg-brand-accent/90 transition-colors w-full md:w-auto mt-4">
          {loading ? 'Saving...' : isEditing ? 'Update Education' : 'Add Education'}
        </button>
      </form>

      <div className="space-y-4">
        {data.education?.length > 0 ? data.education.map(edu => (
          <div key={edu._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{edu.degree}</h4>
              <p className="text-brand-highlight text-sm">{edu.institute}</p>
              <div className="flex items-center gap-4 mt-1 text-slate-400 text-sm">
                <span>{edu.year}</span>
                <span className="text-slate-500">•</span>
                <span>{edu.grade}</span>
              </div>
            </div>
            <div className="flex gap-3 text-sm shrink-0">
              <button onClick={() => handleEdit(edu)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-highlight px-3 py-1.5 rounded transition-colors">Edit</button>
              <button onClick={() => handleDelete(edu._id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors">Delete</button>
            </div>
          </div>
        )) : <p className="text-slate-500">No education entries added yet.</p>}
      </div>
    </div>
  );
};

export default EducationManager;
