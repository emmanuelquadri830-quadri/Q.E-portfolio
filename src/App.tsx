/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Cpu, 
  Globe, 
  Layers, 
  MessageSquare, 
  TrendingUp,
  Layout
} from "lucide-react";
import React, { useRef, ReactNode, useState, useEffect } from "react";
import { InteractiveWaves } from "./components/InteractiveWaves";
import { StackedPortfolio } from "./components/StackedPortfolio";
import { ApproachSection } from "./components/ApproachSection";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = [
    {
      full: "Sr. Product Designer",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    },
    {
      full: "Contemporary Artist",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    }
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[activeRoleIndex];
      const fullText = currentRole.full;

      if (!isDeleting) {
        // Typing phase
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          setTypingSpeed(70 + Math.random() * 60); // Variations for human feel
        } else {
          // Finished typing, pause
          setTypingSpeed(1800); // Long pause at completion
          setIsDeleting(true);
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(fullText.substring(0, displayText.length - 1));
          setTypingSpeed(40); // Faster backspace
        } else {
          // Finished deleting, switch role
          setIsDeleting(false);
          setActiveRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(600); // Pause before starting next role
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, activeRoleIndex, typingSpeed]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black selection:bg-brand-blue/30 selection:text-white">
      {/* Navigation */}
      <nav className="relative flex justify-between items-center px-[60px] py-[40px] z-50">
        <div className="text-[20px] font-bold tracking-[-1px] uppercase">Quadri Emmanuel</div>
        <div className="flex gap-8 text-[13px] uppercase tracking-[1px] font-medium text-white/60">
          <a href="#insights" className="hover:text-white transition-colors">Insights</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section Container */}
      <div className="relative overflow-hidden bg-bg-dark">
        {/* Dynamic Background: Constrained to Hero Content area */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none"
        >
          <InteractiveWaves />
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-[100px]" />
          {/* Subtle animated light beam */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              x: [-20, 20, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[1px] h-[400px] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-45"
          />
          {/* Transition Fade at the bottom of the hero */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
        </motion.div>

        {/* Hero Section Content */}
        <section className="relative min-h-[calc(100vh-100px)] px-[60px] py-20 flex items-center max-w-[1700px] mx-auto z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          
          {/* Left Column: Silhouette / Artistic Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-full border-4 border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-gradient-to-b from-white/5 to-brand-blue/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)] z-10 pointer-events-none" />
              <img 
                src="https://i.imgur.com/YpetXvB.jpeg" 
                alt="Quadri Emmanuel - Professional Identity"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top brightness-105 contrast-[1.02] scale-110"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Editorial Typography */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full justify-center"
          >
            <h1 className="font-display leading-tight tracking-[-0.07em] flex flex-col items-start gap-4 min-h-[300px] justify-center">
              <div className="flex flex-col gap-4 relative w-full">
                <span className="text-[55px] md:text-[85px] font-black text-white uppercase leading-[0.85] tracking-[-0.08em]">
                  Sup, I’m Quadri Emmanuel.
                </span>
                <span className={`text-[45px] md:text-[65px] uppercase leading-[0.85] tracking-[-0.07em] flex items-center min-h-[1.1em] transition-all duration-700 ${roles[activeRoleIndex].style}`}>
                  {displayText}
                  <motion.span 
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="inline-block w-[1.5px] md:w-[2px] h-[35px] md:h-[50px] bg-brand-blue/80 ml-2 md:ml-3"
                  />
                </span>
              </div>

              {/* Body Copy */}
              <div className="flex flex-col gap-8 mt-4 pt-10 border-t border-white/5 w-full">
                <p className="text-[17px] md:text-[20px] font-light leading-[1.6] text-white/40 whitespace-nowrap">
                  Designing brands, digital experiences, and ideas that feel cultural, intelligent, and impossible to ignore.
                </p>
                
                {/* Expertise Tags */}
                <div className="flex flex-nowrap items-center gap-3 mt-1 w-full">
                  {[
                    { label: "Fintech", color: "bg-blue-500", glow: "shadow-blue-500/50" },
                    { label: "Ed/Fun Tech", color: "bg-orange-500", glow: "shadow-orange-500/50" },
                    { label: "Tools", color: "bg-purple-500", glow: "shadow-purple-500/50" },
                    { label: "AI", color: "bg-red-500", glow: "shadow-red-500/50" },
                    { label: "Health", color: "bg-green-500", glow: "shadow-green-500/50" },
                    { label: "Communities", color: "bg-cyan-400", glow: "shadow-cyan-400/50" },
                  ].map((tag, idx) => (
                    <motion.div
                      key={tag.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                        delay: 1.2 + idx * 0.08
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all cursor-pointer group"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${tag.color} group-hover:shadow-[0_0_8px] ${tag.glow} transition-all`} />
                      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/50 group-hover:text-white transition-colors">
                        {tag.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </h1>
          </motion.div>
        </div>
      </section>
    </div>

    {/* Strategic Approach Section */}
    <ApproachSection />

    {/* Portfolio Stacked Cards Section */}
    <StackedPortfolio />

      {/* Floating CTA / Quick Contact */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <button className="flex items-center gap-3 p-4 glass-card rounded-2xl hover:scale-105 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="pr-4 text-left">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Initiate</p>
            <p className="text-sm font-semibold">Let's Talk</p>
          </div>
        </button>
      </motion.div>

      {/* Grid Overlay Footer Accent (Clean separate background section) */}
      <div className="h-[200px] bg-black flex items-end justify-center pb-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-[1px] bg-white/5 mb-8" />
          <p className="text-white/20 font-mono text-xs uppercase tracking-[0.4em]">Designed for the New Era &copy; 2026</p>
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-l border-white/10 hover:border-brand-blue transition-colors group">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:shadow-[0_0_10px_#3B82F6] transition-all" />
      <span className="text-[11px] font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}




