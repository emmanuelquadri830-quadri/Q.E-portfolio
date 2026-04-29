import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

const words = ["Design", "Create", "Inspire"];
const ease = [0.4, 0, 0.2, 1] as const;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const hasCompletedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setWordIndex(words.length - 1);
      setProgress(100);

      const completeTimer = window.setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }, 500);

      return () => window.clearTimeout(completeTimer);
    }

    const wordTimers = [
      window.setTimeout(() => setWordIndex(1), 900),
      window.setTimeout(() => setWordIndex(2), 1800),
    ];

    return () => wordTimers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let frameId = 0;
    let completeTimer = 0;
    const duration = 2700;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      completeTimer = window.setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }, 400);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed inset-0 z-[9999] flex overflow-hidden bg-[#0a0a0a] text-[#f5f5f5]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0)_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="absolute left-6 top-6 font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-[#888888] sm:left-10 sm:top-9"
      >
        Portfolio
      </motion.p>

      <div className="relative mx-auto flex w-full max-w-[1700px] items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[wordIndex]}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -34 }}
            transition={{ duration: 0.58, ease }}
            className="font-display text-[clamp(4.3rem,18vw,15rem)] font-black leading-none tracking-[-0.075em] text-[#f5f5f5]"
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-6 text-right sm:bottom-10 sm:right-10">
        <p className="font-display text-[clamp(3.2rem,10vw,7.5rem)] font-black leading-none tracking-[-0.07em] text-[#f5f5f5]">
          {String(progress).padStart(3, "0")}
        </p>
        <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-[#888888]">
          Loading
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-[#1f1f1f]">
        <motion.div
          className="h-full origin-left bg-[#f5f5f5] shadow-[0_0_18px_rgba(245,245,245,0.42)]"
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
