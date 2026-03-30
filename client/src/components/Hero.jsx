import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ profile }) => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, staggerChildren: 0.06 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const heroText = profile?.heroText || "Hi, I'm a Developer";

  const ProfileRings = ({ size = 'lg' }) => {
    const insets = size === 'sm'
      ? ['inset-[-10px]', 'inset-[-18px]', 'inset-[-26px]', 'inset-[-34px]']
      : ['inset-[-18px]', 'inset-[-30px]', 'inset-[-44px]', 'inset-[-58px]'];

    return (
      <>
        <div className={`absolute ${insets[0]} rounded-full border-[3px] border-transparent border-t-brand-highlight border-r-brand-highlight/30 animate-spin`} style={{animationDuration:'3s'}}></div>
        <div className={`absolute ${insets[1]} rounded-full border-[2px] border-transparent border-b-brand-accent border-l-brand-accent/30 animate-spin`} style={{animationDuration:'5s', animationDirection:'reverse'}}></div>
        <div className={`absolute ${insets[2]} rounded-full border-[2px] border-transparent border-t-purple-400/60 border-r-pink-400/60 animate-spin`} style={{animationDuration:'8s'}}></div>
        <div className={`absolute ${insets[3]} rounded-full border-[1.5px] border-transparent border-b-fuchsia-500/40 border-l-cyan-400/40 animate-spin`} style={{animationDuration:'12s', animationDirection:'reverse'}}></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-highlight/25 to-brand-accent/25 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/15 to-pink-500/15 rounded-full blur-xl animate-pulse" style={{animationDelay:'1s'}}></div>
      </>
    );
  };

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 relative pt-24 md:pt-20 pb-12 md:pb-0">

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col items-center text-center w-full md:hidden z-10">

        {/* Profile photo — centered on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-44 h-44 mb-10 flex items-center justify-center"
        >
          <ProfileRings size="sm" />
          {profile?.profileImage ? (
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.4)] border-2 border-white/20">
              <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover object-center" />
            </div>
          ) : (
            <div className="relative z-10 w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
              <span className="text-brand-accent text-lg font-light tracking-widest uppercase">YO</span>
            </div>
          )}
        </motion.div>

        {/* Hero title */}
        <motion.div
          className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent leading-tight"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {heroText.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-sm leading-relaxed"
        >
          {profile?.bio || "Crafting digital experiences with MERN stack. I build pixel-perfect, engaging, and accessible digital products."}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <a
            href={profile?.resumeLink || '#'}
            target={profile?.resumeLink ? "_blank" : "_self"}
            rel="noreferrer"
            className="px-7 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-brand-highlight to-brand-accent text-white shadow-lg shadow-brand-highlight/20 hover:scale-105 transition-transform"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full text-sm font-medium glass-effect text-slate-700 dark:text-slate-200 hover:scale-105 transition-transform"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-brand-highlight to-transparent mx-auto animate-pulse"></div>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex w-full items-center justify-between">

        {/* Left — text */}
        <div className="w-1/2 z-10 flex flex-col justify-center">
          <motion.div
            className="text-5xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent leading-tight"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {heroText.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed"
          >
            {profile?.bio || "Crafting digital experiences with MERN stack. I build pixel-perfect, engaging, and accessible digital products."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex gap-4"
          >
            <a
              href={profile?.resumeLink || '#'}
              target={profile?.resumeLink ? "_blank" : "_self"}
              rel="noreferrer"
              className="inline-block glass-effect px-8 py-4 rounded-full text-brand-highlight border-brand-highlight/30 hover:bg-brand-highlight/10 hover:border-brand-highlight transition-all duration-300 font-medium tracking-wide"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right — profile image with rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-1/2 flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center">
            <ProfileRings size="lg" />
            {profile?.profileImage ? (
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.35)] border-2 border-white/20">
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover object-center" />
              </div>
            ) : (
              <div className="relative z-10 w-full h-full rounded-full border border-slate-300 dark:border-white/10 flex items-center justify-center bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-xl">
                <span className="text-brand-accent dark:text-brand-accent/50 text-3xl font-light tracking-[0.3em] uppercase">Creative</span>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
