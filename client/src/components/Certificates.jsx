import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Certificates = () => {
  const { data } = usePortfolio();
  
  if (!data?.certificates || data.certificates.length === 0) return null;

  // Duplicate the array purely for the infinite scrolling effect
  const scrollerContent = [...data.certificates, ...data.certificates];

  return (
    <section id="certificates" className="py-24 bg-slate-50 dark:bg-brand-dark transition-colors duration-300 overflow-hidden relative">
      
      {/* Background aesthetic blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-highlight/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Certificates</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Continuous learning and verified achievements driving my technical expertise.
        </p>
      </div>

      {/* Marquee Scroller Container */}
      <div className="relative flex overflow-x-hidden group">
        
        {/* Left and Right Gradients for smooth fade out */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent dark:from-brand-dark z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent dark:from-brand-dark z-10 pointer-events-none"></div>
        
        <div className="flex gap-8 py-8 px-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {scrollerContent.map((cert, index) => (
            <div 
              key={`${cert._id}-${index}`}
              className="glass-effect relative rounded-2xl p-6 min-w-[300px] max-w-[300px] md:min-w-[350px] md:max-w-[350px] flex flex-col items-center text-center gap-4 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-full h-40 bg-white/50 dark:bg-slate-800/50 rounded-xl overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              
              <div className="w-full space-y-2 mt-2">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">{cert.title}</h3>
                <p className="text-brand-accent font-medium text-sm drop-shadow-sm">{cert.issuer}</p>
                {cert.issueDate && <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issueDate}</p>}
              </div>

              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-2 w-full inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-highlight dark:hover:bg-brand-highlight hover:text-white transition-colors"
                >
                  Verify Credential
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
