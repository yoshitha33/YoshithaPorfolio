import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-20 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-widest z-10">
            YOSHITHA<span className="text-brand-highlight">.</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 items-center font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-brand-highlight transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Social + Theme */}
          <div className="hidden md:flex gap-4 items-center">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-brand-highlight transition-colors"><FaGithub size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-brand-highlight transition-colors"><FaLinkedin size={20} /></a>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-brand-highlight transition-colors"><SiLeetcode size={20} /></a>
            <button onClick={toggleTheme} className="ml-2 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-sm">
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>

          {/* Mobile Right: Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors">
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3 px-4 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-brand-highlight/10 hover:text-brand-highlight transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-highlight/60 inline-block"></span>
                    {link.label}
                  </motion.a>
                ))}
                {/* Social links in mobile menu */}
                <div className="flex gap-5 pt-4 px-4 border-t border-slate-200 dark:border-slate-800 mt-2">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-brand-highlight transition-colors"><FaGithub size={20} /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-brand-highlight transition-colors"><FaLinkedin size={20} /></a>
                  <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-brand-highlight transition-colors"><SiLeetcode size={20} /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
