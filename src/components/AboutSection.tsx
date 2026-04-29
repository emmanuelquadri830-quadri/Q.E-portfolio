import { motion } from "motion/react";
import React from "react";

const expertiseItems = [
  "Frontend Development",
  "UI/UX Design",
  "Creative Strategy",
];

const toolItems = [
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Figma",
  "Vercel",
  "AI Tools",
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070707] px-6 py-24 sm:px-10 lg:px-14 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_56%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.48em] text-white/40">
            About
          </p>
          <h2 className="mt-5 text-[3.4rem] leading-[0.92] tracking-[-0.08em] font-black uppercase text-white sm:text-[4.4rem] lg:text-[5.2rem]">
            ABOUT QUADRI EMMANUEL
          </h2>
          <p className="mt-8 max-w-3xl text-[1.02rem] leading-[1.9] text-white/60 sm:text-[1.08rem]">
            I’m a frontend developer and designer focused on creating digital experiences that are visually refined, high-performing, and built with purpose.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.82, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card border-white/10 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.24)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.44em] text-white/35">
                Expertise!ssss
              </span>
              <h3 className="mt-5 text-[1.45rem] font-black uppercase leading-[1.02] tracking-[-0.05em] text-white">
                {item}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/35">
                Building polished experiences with clarity, structure, and modern editorial energy.
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(255,255,255,0.05)]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-white/40">
              Philosophy
            </span>
            <p className="mt-6 text-[1.03rem] leading-[1.9] text-white/65 sm:text-[1.08rem]">
              Great products should feel effortless. Clean design, smooth interaction, and meaningful performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(255,255,255,0.05)]"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/40">
                Ready to build
              </p>
              <p className="mt-4 text-[1.05rem] leading-[1.75] text-white/60">
                Let’s collaborate on standout digital work that feels refined, fast, and unmistakably premium.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-7 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-brand-blue transition-all duration-300 hover:border-brand-blue/50 hover:bg-brand-blue/15 hover:text-white"
            >
              LET’S WORK TOGETHER ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_90px_rgba(255,255,255,0.05)]"
        >
          <div className="flex flex-wrap items-center gap-3">
            {toolItems.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-black/40 px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:border-brand-blue/40 hover:text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
