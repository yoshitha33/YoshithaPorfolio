import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollBackground = () => {
  const { scrollY } = useScroll();

  // Different speeds for parallax
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, 400]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y4 = useTransform(scrollY, [0, 3000], [0, 500]);
  const y5 = useTransform(scrollY, [0, 3000], [0, -200]);
  const rotate1 = useTransform(scrollY, [0, 3000], [0, 180]);
  const rotate2 = useTransform(scrollY, [0, 3000], [0, -360]);
  const rotate3 = useTransform(scrollY, [0, 3000], [0, 90]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">


      {/* Triple concentric rings glow - top left */}
      <motion.div
        style={{ y: y2 }}
        className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full"
      >
        <div className="absolute inset-0 rounded-full border-2 border-brand-highlight/20"></div>
        <div className="absolute inset-10 rounded-full border border-brand-accent/15"></div>
        <div className="absolute inset-20 rounded-full border border-purple-400/15"></div>
        <div className="absolute inset-32 rounded-full bg-brand-highlight/8 blur-3xl"></div>
      </motion.div>

      {/* Spinning diamond - mid left */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute top-[38%] -left-8 w-48 h-48"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,3 97,50 50,97 3,50"
            fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="2" strokeOpacity="0.5" />
          <polygon points="50,18 82,50 50,82 18,50"
            fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.35" />
          <circle cx="50" cy="50" r="5" fill="#818cf8" fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Glowing orb blob - center right */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[45%] -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-brand-highlight/20 to-brand-accent/15 blur-[80px]"
      ></motion.div>

      {/* Pink triangle - lower left */}
      <motion.div
        style={{ y: y1, rotate: rotate3 }}
        className="absolute top-[65%] left-10 w-28 h-28"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,90 5,90"
            fill="rgba(244,114,182,0.08)" stroke="#f472b6" strokeWidth="2.5" strokeOpacity="0.45" />
        </svg>
      </motion.div>

      {/* Dotted cross star - bottom right */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute bottom-10 -right-8 w-56 h-56"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full" opacity="0.3">
          <line x1="60" y1="5" x2="60" y2="115" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="5" y1="60" x2="115" y2="60" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="100" y2="100" stroke="#a78bfa" strokeWidth="0.8" />
          <line x1="100" y1="20" x2="20" y2="100" stroke="#a78bfa" strokeWidth="0.8" />
          <circle cx="60" cy="60" r="20" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="#818cf8" strokeWidth="0.8" strokeDasharray="4 6" />
        </svg>
      </motion.div>

      {/* Dot grid - bottom left */}
      <motion.div
        style={{ y: y5 }}
        className="absolute bottom-16 left-8"
      >
        <svg width="130" height="130" opacity="0.25">
          {[0,1,2,3,4,5].map(row => [0,1,2,3,4,5].map(col => (
            <circle key={`${row}-${col}`}
              cx={col * 24 + 10} cy={row * 24 + 10} r="2.5"
              fill={col % 2 === 0 ? '#38bdf8' : '#10b981'} />
          )))}
        </svg>
      </motion.div>

      {/* Floating dashed orbit ring - bottom center */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border-2 border-dashed border-brand-accent/25"
      ></motion.div>

      {/* Small glowing pulse orb - top center */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-purple-500/15 blur-2xl"
      ></motion.div>

    </div>
  );
};

export default ScrollBackground;
