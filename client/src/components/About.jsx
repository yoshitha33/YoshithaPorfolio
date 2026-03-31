import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaFlask,
  FaUsers,
  FaCode,
  FaTrophy,
  FaLaptopCode,
  FaRobot,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

/* ── Fade-up preset ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
});

/* ── Section heading ─────────────────────────────────────── */
const SectionHeading = ({ tag, title }) => (
  <div className="text-center mb-16">
    <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-brand-highlight mb-3 px-4 py-1.5 rounded-full bg-brand-highlight/10 border border-brand-highlight/20">
      {tag}
    </span>
    <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
      {title}
    </h2>
    <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-brand-highlight to-brand-accent" />
  </div>
);

/* ── Education Styles (Static) ───────────────────────────── */
const educationStyles = [
  { icon: <FaGraduationCap size={22} />, color: 'from-sky-400 to-cyan-500' },
  { icon: <FaLaptopCode size={22} />, color: 'from-violet-400 to-purple-500' },
  { icon: <FaTrophy size={22} />, color: 'from-amber-400 to-orange-500' },
  { icon: <FaCode size={22} />, color: 'from-emerald-400 to-teal-500' },
  { icon: <FaRobot size={22} />, color: 'from-pink-400 to-rose-500' },
];

/* ── Main Component ──────────────────────────────────────── */
const About = ({ profile, education }) => {
  return (
    <section id="about" className="relative py-28 px-6 md:px-20 overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-highlight/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-3xl" />

      {/* ── ABOUT ME ──────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <SectionHeading tag="Get to know me" title="About Me" />

        <div className="flex justify-center">
          {/* Left – personal summary */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full max-w-4xl">
            <div className="relative glass-effect rounded-3xl p-8 md:p-10 space-y-5 border border-white/20">
              {/* Decorative accent bar */}
              <div className="absolute top-0 left-8 w-20 h-1 rounded-b-full bg-gradient-to-r from-brand-highlight to-brand-accent" />

              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {profile?.bio ||
                  "Hi! I'm Yoshitha — a passionate full-stack developer pursuing B.Tech in Information Tecnology. I love building fast, accessible, and beautiful web experiences using the MERN stack."}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Beyond code, I enjoy solving algorithmic challenges, DSA Problems and collaborating on open-source projects. I believe great software is built at the intersection of clean design and solid engineering.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {[
                  { label: 'Name', value: profile?.name || 'Yoshitha' },
                  { label: 'Role', value: 'Full-Stack Developer' },
                  { label: 'E-Mail', value: 'yoshithanunna77@gmail.com' },
                 
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-highlight">{label}</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium mt-0.5">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── EDUCATION ─────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto mt-28"
      >
        <SectionHeading tag="Academic Background" title="Education" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-highlight via-brand-accent to-transparent hidden sm:block" />

          <div className="space-y-10">
            {education?.length > 0 ? (
              education.map((edu, i) => {
                const style = educationStyles[i % educationStyles.length];
                return (
                  <motion.div
                    key={edu._id || i}
                    variants={fadeUp(0.15 * i)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`relative flex flex-col sm:flex-row gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-6 md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-brand-highlight to-brand-accent ring-4 ring-slate-100 dark:ring-brand-dark z-10" />

                    {/* Card */}
                    <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:ml-auto md:pr-10' : 'md:mr-auto md:pl-10'}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-brand-highlight/30 transition-all duration-300 group"
                      >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {style.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{edu.degree}</h3>
                        <p className="text-brand-highlight text-sm font-semibold mb-1">{edu.institute}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{edu.year}</span>
                          <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${style.color}`}>{edu.grade}</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-slate-500">No education details available.</p>
            )}
          </div>
        </div>
      </motion.div>



    </section>
  );
};

export default About;
