import API_URL from '../../config/api';
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { convertToBase64 } from '../../utils/helpers';

const ProjectsManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    order: 1
  });

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      techStack: project.techStack ? project.techStack.join(', ') : '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      order: project.order || 1
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '', order: 1 });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({...formData, image: base64});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = { ...formData, techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean) };
    
    try {
      const url = isEditing ? `${API_URL}/api/projects/${currentId}` : `${API_URL}/api/projects`;
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        refreshData();
        resetForm();
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
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
        <h3 className="text-2xl font-semibold text-brand-accent">Projects Management</h3>
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
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Tech Stack (comma separated)</label>
            <input required type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="React, Node.js, Tailwind" />
          </div>
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Description</label>
          <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 resize-none"></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Project Image (Upload File)</label>
            <input 
              type="file" 
              accept=".jpeg, .png, .jpg, .webp"
              onChange={handleImageUpload} 
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-highlight/10 file:text-brand-accent hover:file:bg-brand-highlight/20" 
            />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded shadow" />}
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Sort Order</label>
            <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">GitHub Link</label>
            <input type="text" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Live Link</label>
            <input type="text" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
        </div>
        <button disabled={loading} type="submit" className="bg-brand-accent text-white dark:text-brand-dark px-6 py-2 rounded-lg font-medium hover:bg-brand-accent/90 transition-colors w-full md:w-auto">
          {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div className="space-y-4">
        {data.projects?.length > 0 ? data.projects.map(p => (
          <div key={p._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{p.title}</h4>
              <p className="text-slate-500 text-sm line-clamp-1">{p.description}</p>
            </div>
            <div className="flex gap-3 text-sm shrink-0">
              <button onClick={() => handleEdit(p)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-highlight px-3 py-1.5 rounded transition-colors">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors">Delete</button>
            </div>
          </div>
        )) : <p className="text-slate-500">No projects added yet.</p>}
      </div>
    </div>
  );
};

export default ProjectsManager;


