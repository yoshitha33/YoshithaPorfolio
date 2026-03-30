import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';

const Home = () => {
  const { data, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="w-16 h-16 border-4 border-brand-highlight border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <Navbar />
      <Hero profile={data.profile} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience experience={data.experience} />
      <Certificates />
      <Contact />
      
      <footer className="py-8 text-center text-slate-500 border-t border-slate-200 dark:border-slate-800 mt-20 relative z-10">
        <p>&copy; {new Date().getFullYear()} - Built with React, Tailwind & Framer Motion</p>
      </footer>
    </div>
  );
};

export default Home;
