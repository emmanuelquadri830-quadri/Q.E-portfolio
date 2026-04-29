// components/sections/WorkIntro.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  "UI/UX Design", "Product Strategy", "Design Systems", "User Research",
  "Wireframing", "Prototyping", "Figma Expert", "Framer", "Webflow",
  "WordPress", "Cross-Functional", "Accessibility", "Modern Interfaces",
];

const tags = [
  { label: "Available for Work", dot: "bg-green-400", delay: 0 },
  { label: "Lagos, Nigeria",     dot: "bg-blue-400",  delay: 0.09 },
  { label: "Global Remote",      dot: "bg-[#c9a96e]", delay: 0.17 },
  { label: "Product Designer",   dot: "bg-[#c9a96e]", delay: 0.25 },
];

const doubled = [...skills, ...skills, ...skills, ...skills];

export function WorkIntro() {
  const sectionRef  = useRef(null);
  const headlineRef = useRef(null);
  const inView      = useInView(sectionRef,  { once: true, margin: "-60px" });
  const hlInView    = useInView(headlineRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-black overflow-hidden px-[60px] py-[100px] max-w-[1700px] mx-auto"
    >
      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* ── TOP ROW ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">

        {/* Bio */}
        <motion.p
          className="max-w-[440px] text-[15px] font-light leading-[1.8] text-white/50"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Lagos raised, globally minded. Five years of experience designing thoughtful
          digital products across{" "}
          <span className="text-white font-normal">
            SaaS, EdTech, enterprise platforms
          </span>
          , growth brands, and modern web experiences. Turning complexity into clarity
          through{" "}
          <span className="text-white font-normal">
            design systems, strategy
          </span>
          , and user-centered execution.
        </motion.p>

        {/* Tags */}
        <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
          {tags.map((t) => (
            <motion.div
              key={t.label}
              className="inline-flex items-center gap-2.5 px-4 py-[7px] rounded-full border border-white/10 bg-white/[0.04] backdrop-blur font-mono text-[10px] tracking-[0.18em] uppercase text-white/50 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors duration-300"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: t.delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
              {t.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER 1 ──────────────────────────────── */}
      <motion.div
        className="relative z-10 h-px bg-white/10 my-12"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── SKILLS MARQUEE ─────────────────────────── */}
      <motion.div
        className="relative z-10 overflow-hidden -mx-[60px] px-[60px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: "marquee 26s linear infinite" }}
        >
          {doubled.map((skill, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/25 px-7 hover:text-white transition-colors duration-300 cursor-default">
                {skill}
              </span>
              <span className="text-[#c9a96e]/40 text-[8px]">✦</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── DIVIDER 2 ──────────────────────────────── */}
      <motion.div
        className="relative z-10 h-px bg-white/10 mt-12"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── BOTTOM: WORK HEADLINE ──────────────────── */}
      <div ref={headlineRef} className="relative z-10 mt-12 flex flex-col gap-2">
        <motion.span
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25"
          initial={{ opacity: 0, y: 16 }}
          animate={hlInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Selected Projects
        </motion.span>

        <div className="overflow-hidden">
          <motion.h2
            className="font-['Bebas_Neue'] text-[clamp(80px,14vw,220px)] leading-[0.88] tracking-[-0.02em] text-white"
            initial={{ y: "110%" }}
            animate={hlInView ? { y: "0%" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Work
          </motion.h2>
        </div>
      </div>
    </section>
  );
}