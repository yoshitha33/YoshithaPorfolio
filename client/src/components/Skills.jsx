import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="py-20 px-6 md:px-20 relative z-10 w-full bg-slate-100/50 dark:bg-brand-darker/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-white">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-brand-accent rounded-full md:mx-auto"></div>
        </motion.div>

        {skills && skills.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id || index}
                variants={item}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass-effect px-6 py-4 rounded-xl flex items-center justify-center gap-3 border border-brand-highlight/20 hover:border-brand-highlight hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
              >
                {skill.icon && <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />}
                <span className="font-medium tracking-wide text-slate-700 dark:text-slate-200">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center text-slate-500">
            No skills listed yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
