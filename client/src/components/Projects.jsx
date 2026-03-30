import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-20 px-6 md:px-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-brand-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl overflow-hidden group flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative border-b border-slate-100 dark:border-transparent">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-slate-500">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-white/20 dark:bg-brand-dark/40 group-hover:bg-transparent transition-all duration-300"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-white">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack?.map((tech, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-brand-highlight/20 dark:bg-brand-highlight/10 text-brand-highlight">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white flex items-center gap-2 transition-colors">
                        <FaGithub size={20} />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-brand-accent hover:text-brand-highlight flex items-center gap-2 transition-colors ml-auto">
                        <span className="text-sm">Live Demo</span>
                        <FaExternalLinkAlt size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-500">
              No projects available yet. Admin needs to add some!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
