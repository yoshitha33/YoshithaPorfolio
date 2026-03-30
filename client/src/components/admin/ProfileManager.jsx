import API_URL from '../../config/api';
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { convertToBase64 } from '../../utils/helpers';

const ProfileManager = () => {
  const { data, refreshData } = usePortfolio();
  const { user } = useAuth();

  const [bio, setBio] = useState('');
  const [heroText, setHeroText] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (data.profile) {
      setBio(data.profile.bio || '');
      setHeroText(data.profile.heroText || '');
      setProfileImage(data.profile.profileImage || '');
      setResumeLink(data.profile.resumeLink || '');
    }
  }, [data.profile]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setProfileImage(base64);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch(`${API_URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ bio, heroText, profileImage, resumeLink })
      });
      if (res.ok) {
        setStatus('success');
        refreshData();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="glass-effect p-8 rounded-2xl mb-10 w-full">
      <h3 className="text-2xl font-semibold mb-6 text-brand-accent">Edit Profile & Bio</h3>
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
          <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Hero Text (Main Heading)</label>
          <input 
            type="text" 
            value={heroText}
            onChange={(e) => setHeroText(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight transition-all"
            placeholder="Hi, I'm..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Profile Image (Upload File)</label>
            <input 
              type="file" 
              accept=".jpeg, .png, .jpg, .webp"
              onChange={handleImageUpload}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-highlight/10 file:text-brand-accent hover:file:bg-brand-highlight/20"
            />
            {profileImage && <img src={profileImage} alt="Profile Preview" className="mt-4 h-24 w-24 object-cover rounded-full border-2 border-brand-accent shadow-lg" />}
          </div>
          <div>
            <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Resume Link (PDF/Google Drive URL)</label>
            <input 
              type="text" 
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight transition-all"
              placeholder="https://drive.google.com/..."
            />
          </div>
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 text-sm mb-2 block font-medium">Bio / Summary</label>
          <textarea 
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none focus:border-brand-highlight transition-all resize-none"
            placeholder="Write something about yourself..."
          ></textarea>
        </div>
        
        <div className="flex items-center gap-4">
          <button disabled={status === 'saving'} className="bg-brand-highlight text-white dark:text-brand-dark px-10 py-3 rounded-lg font-bold hover:bg-brand-highlight/90 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)] disabled:opacity-50">
            {status === 'saving' ? 'Saving...' : 'Save Profile'}
          </button>
          
          {status === 'success' && <span className="text-brand-accent font-medium px-4 py-2 bg-brand-accent/10 rounded">Profile updated successfully!</span>}
          {status === 'error' && <span className="text-red-500 font-medium px-4 py-2 bg-red-500/10 rounded">Error saving profile.</span>}
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;


