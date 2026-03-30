import API_URL from '../../config/api';
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { convertToBase64 } from '../../utils/helpers';

const CertificatesManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: '',
    issueDate: '',
    credentialUrl: '',
    order: 1
  });

  const handleEdit = (cert) => {
    setIsEditing(true);
    setCurrentId(cert._id);
    setFormData({
      title: cert.title,
      issuer: cert.issuer || '',
      image: cert.image || '',
      issueDate: cert.issueDate || '',
      credentialUrl: cert.credentialUrl || '',
      order: cert.order || 1
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: '', issuer: '', image: '', issueDate: '', credentialUrl: '', order: 1 });
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
    
    try {
      const url = isEditing ? `${API_URL}/api/certificates/${currentId}` : `${API_URL}/api/certificates`;
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
        alert('Failed to save certificate');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      const res = await fetch(`${API_URL}/api/certificates/${id}`, {
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
        <h3 className="text-2xl font-semibold text-brand-accent">Certificates Management</h3>
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
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Certificate Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="e.g. AWS Certified Developer" />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Issuer</label>
            <input type="text" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="e.g. Amazon Web Services" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Certificate Image (Upload File)</label>
            <input 
              required={!isEditing}
              type="file" 
              accept=".jpeg, .png, .jpg, .webp"
              onChange={handleImageUpload} 
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-highlight/10 file:text-brand-accent hover:file:bg-brand-highlight/20" 
            />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-16 w-32 object-contain rounded shadow bg-slate-100" />}
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Issue Date</label>
            <input type="text" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="e.g. March 2024" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Credential URL (Optional)</label>
            <input type="text" value={formData.credentialUrl} onChange={e => setFormData({...formData, credentialUrl: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" placeholder="https://..." />
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-1 block">Sort Order</label>
            <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200" />
          </div>
        </div>
        
        <button disabled={loading} type="submit" className="bg-brand-accent text-white dark:text-brand-dark px-6 py-2 rounded-lg font-medium hover:bg-brand-accent/90 transition-colors w-full md:w-auto">
          {loading ? 'Saving...' : isEditing ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </form>

      <div className="space-y-4">
        {data.certificates?.length > 0 ? data.certificates.map(c => (
          <div key={c._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {c.image && <img src={c.image} alt={c.title} className="h-12 w-20 object-contain rounded bg-slate-100 dark:bg-slate-800" />}
              <div>
                <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{c.title}</h4>
                <p className="text-slate-500 text-sm">{c.issuer}</p>
              </div>
            </div>
            <div className="flex gap-3 text-sm shrink-0">
              <button onClick={() => handleEdit(c)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-highlight px-3 py-1.5 rounded transition-colors">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors">Delete</button>
            </div>
          </div>
        )) : <p className="text-slate-500">No certificates added yet.</p>}
      </div>
    </div>
  );
};

export default CertificatesManager;


