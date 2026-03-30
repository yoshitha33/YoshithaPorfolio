import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ScrollBackground from './components/ScrollBackground';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <CustomCursor />
      <div className="min-h-screen relative text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <ScrollBackground />
        <div className="relative z-10 w-full scroll-smooth">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
