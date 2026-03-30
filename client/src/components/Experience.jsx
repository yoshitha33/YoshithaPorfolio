import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experience }) => {
  return (
    <section id="experience" className="py-20 px-6 md:px-20 relative z-10 w-full transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-brand-accent rounded-full"></div>
        </motion.div>

        <div className="relative border-l-2 border-brand-highlight/30 ml-4 md:ml-0">
          {experience && experience.length > 0 ? (
            experience.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 ml-8 relative"
              >
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-brand-highlight rounded-full -left-[41px] top-1.5 shadow-[0_0_15px_rgba(56,189,248,0.8)] border-4 border-slate-50 dark:border-brand-dark"></div>
                
                <div className="glass-effect p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] transition-all duration-300 group">
                  <h3 className="text-2xl font-semibold text-slate-800 dark:text-white group-hover:text-brand-highlight transition-colors">{exp.role}</h3>
                  <h4 className="text-lg text-brand-accent font-medium mt-1">{exp.company}</h4>
                  <span className="inline-block py-1 px-3 bg-brand-highlight/10 text-brand-highlight rounded-full text-sm font-medium mt-3 mb-4">{exp.duration}</span>
                  <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-10 text-slate-500 pl-8">
              Experience details coming soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
