import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface CardData {
  id: string;
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  label: string;
}

const portfolioCards: CardData[] = [
  {
    id: '01',
    number: '01',
    title: 'FINTECH REVOLUTION',
    description: 'Reimagining digital banking for the next generation of global citizens. A focus on radical transparency and seamless cross-border transactions.',
    bgColor: '#E5E7EB',
    textColor: '#111827',
    label: 'Case Study • 2024'
  },
  {
    id: '02',
    number: '02',
    title: 'AI DESIGN SYSTEMS',
    description: 'Developing adaptive interface frameworks that leverage machine learning to personalize user experiences in real-time.',
    bgColor: '#D1D5DB',
    textColor: '#111827',
    label: 'Experimental • 2024'
  },
  {
    id: '03',
    number: '03',
    title: 'SAGE COMMUNITIES',
    description: 'A platform dedicated to sustainable living, connecting local producers with urban consumers through an organic digital marketplace.',
    bgColor: '#A7C0A0',
    textColor: '#1A2F1A',
    label: 'Architecture • 2023'
  },
  {
    id: '04',
    number: '04',
    title: 'COGNITIVE TOOLS',
    description: 'Tools designed to augment human intelligence through intuitive data visualization and multi-modal interaction models.',
    bgColor: '#E2E8F0',
    textColor: '#1E293B',
    label: 'Product Design • 2023'
  }
];

const PortfolioCard: React.FC<{ card: CardData; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const handleCardClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    // Simulate data fetching or detailed view preparation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Scale: Active card grows slightly
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.88, 1.03, 1.03, 0.88]);
  const smoothedScale = useSpring(scale, { stiffness: 100, damping: 25 });
  
  // Blur: Cards leaving/entering focus are blurred
  const blurValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [8, 0, 0, 8]);
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);
  
  // Opacity: Subtle fade for non-focused cards
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.3, 1, 1, 0.3]);

  return (
    <div className="relative h-[80vh] md:h-screen flex items-center justify-center py-24 px-[40px] md:px-[80px]">
      <motion.div
        ref={cardRef}
        onClick={handleCardClick}
        style={{
          scale: isLoading ? 0.98 : smoothedScale,
          opacity,
          filter: blur,
          backgroundColor: card.bgColor,
          color: card.textColor
        }}
        className={`relative w-full max-w-[1500px] aspect-[16/8] min-h-[500px] max-h-[750px] rounded-[32px] md:rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between p-10 md:p-16 lg:p-24 group transition-transform duration-500 cursor-pointer will-change-transform ${isLoading ? 'cursor-wait' : ''}`}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]"
            >
              {/* Shimmer Effect */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "110%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <div className="flex flex-col items-center gap-4 z-10">
                <Loader2 className="w-10 h-10 animate-spin text-current opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Fetching Context</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Faded Background Number */}
        <div className="absolute top-[-5%] right-[-2%] text-[24vw] font-black opacity-[0.04] select-none pointer-events-none leading-none tracking-tighter">
          {card.number}
        </div>

        {/* Top Header Labels */}
        <div className="flex justify-between items-start z-10 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-extrabold opacity-40">{card.label}</span>
            <div className="h-[2px] w-16 bg-current opacity-15" />
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-current/20 flex items-center justify-center cursor-pointer hover:bg-current hover:text-white transition-all duration-500"
          >
            <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10" />
          </motion.div>
        </div>

        {/* Dynamic Card Content */}
        <div className="flex flex-col gap-4 md:gap-8 max-w-[900px] z-10">
          <h2 className={`text-[34px] md:text-[64px] lg:text-[90px] font-black leading-[0.82] tracking-[-0.07em] uppercase transition-all duration-500 ${isLoading ? 'blur-md opacity-20' : ''}`}>
            {card.title}
          </h2>
          <p className={`text-base md:text-xl lg:text-2xl font-medium leading-normal md:leading-relaxed opacity-60 transition-all duration-500 ${isLoading ? 'blur-md opacity-10' : ''}`}>
            {card.description}
          </p>
        </div>

        {/* Footer Link */}
        <div className="mt-8 group-hover:translate-x-6 transition-transform duration-700 cursor-pointer flex items-center gap-6 z-10">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80">
            {isLoading ? 'Processing' : 'Check Insight'}
          </span>
          <div className={`h-[1px] bg-current transition-all duration-700 ${isLoading ? 'w-48 opacity-20' : 'w-24 bg-current/30 group-hover:w-40 group-hover:bg-current'}`} />
        </div>
      </motion.div>
    </div>
  );
};

export const StackedPortfolio: React.FC = () => {
  return (
    <div id="insights" className="relative z-40 bg-black pt-20 pb-40">
      <div className="px-[60px] mb-20 flex flex-col items-start gap-4">
        <span className="text-[11px] font-mono text-white/30 tracking-[0.5em] uppercase">Architecture of Value</span>
        <h2 className="text-[60px] md:text-[100px] font-black text-white leading-none tracking-[-0.07em] uppercase">
          Key Insights<span className="text-brand-blue">.</span>
        </h2>
      </div>
      
      <div className="flex flex-col">
        {portfolioCards.map((card, index) => (
          <div key={card.id} className={index !== 0 ? "-mt-5" : ""}>
            <PortfolioCard card={card} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
