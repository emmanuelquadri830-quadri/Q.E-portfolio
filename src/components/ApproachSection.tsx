import React from 'react';
import { motion } from 'framer-motion';

export const ApproachSection: React.FC = () => {
  return (
    <div className="relative w-full bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Background Grid: Subtle Vertical Subdivisions */}
      <div className="absolute inset-0 flex justify-between px-[60px] pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-white/[0.04] last:hidden" />
        ))}
      </div>

      {/* Top Edge Wave Pattern: Purely visual, subtle opacity */}
      <div className="absolute top-0 left-0 right-0 h-12 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path 
            d="M0,30 Q300,0 600,30 T1200,30" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5" 
            className="animate-[pulse_4s_infinite]"
          />
        </svg>
      </div>

      {/* Panoramic Content Container */}
      <div className="relative z-10 w-full px-[60px] flex justify-between items-center max-w-[1800px] mx-auto py-16 md:py-24">
        
        {/* Left Column: Heading Block */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 md:gap-4"
        >
          <span className="text-[10px] md:text-[12px] font-mono font-medium text-white/40 tracking-[0.2em]">Strategy</span>
          <h2 className="text-[32px] md:text-[54px] lg:text-[72px] font-black leading-[0.9] tracking-[-0.07em] text-white uppercase max-w-[600px]">
            How I Approach<br />
            Every Project?
          </h2>
        </motion.div>

        {/* Right Column: Rotational Orbit Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center opacity-80"
        >
          {/* Animated Orbiting Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full fill-white/10 italic text-[8px] font-bold uppercase tracking-[0.6em]">
              <path id="orbitPath" d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" fill="none" />
              <text>
                <textPath href="#orbitPath">
                   Step by Step • Step by Step • Step by Step •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Core Wireframe Globe */}
          <div className="relative w-[60%] h-[60%] rounded-full border border-white/5 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
              <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" />
              {[...Array(4)].map((_, i) => (
                <ellipse 
                  key={i} cx="50" cy="50" rx="48" ry="12" 
                  transform={`rotate(${i * 45} 50 50)`} 
                  fill="none" stroke="white" strokeWidth="0.3" 
                />
              ))}
            </svg>
            <div className="absolute w-2 h-2 rounded-full bg-white/20 blur-[1px]" />
          </div>
        </motion.div>

      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
    </div>
  );
};
