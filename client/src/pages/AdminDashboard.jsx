import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUser, FaProjectDiagram, FaTools, FaBriefcase, FaArrowLeft, FaCertificate } from 'react-icons/fa';

import ProfileManager from '../components/admin/ProfileManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import CertificatesManager from '../components/admin/CertificatesManager';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'profile', label: 'Profile & Bio', icon: <FaUser /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'certificates', label: 'Certificates', icon: <FaCertificate /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark flex flex-col md:flex-row z-20 relative font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Sidebar - Desktop */}
      <div className="w-full md:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col shrink-0">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-brand-highlight tracking-wide">Admin Panel</h2>
        </div>
        
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 mb-8 md:mb-0 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal font-medium ${
                activeTab === item.id 
                  ? 'bg-brand-highlight/10 text-brand-highlight border border-brand-highlight/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden md:flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaArrowLeft /> View Portfolio
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'profile' && <ProfileManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'certificates' && <CertificatesManager />}
        </div>
      </div>
      
      {/* Mobile bottom actions */}
      <div className="md:hidden flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 gap-4 justify-between">
         <button onClick={() => navigate('/')} className="flex-1 flex justify-center items-center gap-2 py-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <FaArrowLeft /> View Site
          </button>
          <button onClick={handleLogout} className="flex-1 flex justify-center items-center gap-2 py-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg">
            <FaSignOutAlt /> Logout
          </button>
      </div>

    </div>
  );
};

export default AdminDashboard;
