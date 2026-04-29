/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { InteractiveWaves } from "./components/InteractiveWaves";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const panelPointerX = useMotionValue(0);
  const panelPointerY = useMotionValue(0);
  const panelTranslateX = useSpring(panelPointerX, { stiffness: 120, damping: 18, mass: 0.85 });
  const panelTranslateY = useSpring(panelPointerY, { stiffness: 120, damping: 18, mass: 0.85 });
  const panelHighlightX = useTransform(panelTranslateX, (value) => value * -0.8);
  const panelHighlightY = useTransform(panelTranslateY, (value) => value * -0.8);
  const premiumEase = [0.22, 1, 0.36, 1] as const;

  const roles = [
    {
      full: "CONTEMPORARY ART",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    },
    {
      full: "FRONT END DEVELOPER",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    },
    {
      full: "UI/UX DESIGNER",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    },
    {
      full: "CREATIVE THINKER",
      style: "font-light italic text-white/70 tracking-[-0.05em]",
    }
  ];

  const heroMarqueeItems = [
    "Prototyping",
    "A/B Testing",
    "Research & Synthesis",
    "Design Systems",
    "Product Strategy",
    "User Journeys",
    "Interaction Design",
    "Accessibility",
    "Visual Direction",
    "Frontend Development",
  ];

  const expertiseItems = [
    {
      index: "01",
      title: "ART DIRECTION",
      description:
        "Translating emotion into visual systems, campaign worlds, and digital stories that feel intentional and memorable.",
      projects: ["Norwegian Capsule", "Cultural Launch"],
    },
    {
      index: "02",
      title: "UI / VISUAL DESIGN",
      description:
        "Creating refined interfaces with strong hierarchy, polished interaction states, and a visual language built for trust.",
      projects: ["Fintech Dashboard", "Creator Tools"],
    },
    {
      index: "03",
      title: "UX DESIGN",
      description:
        "Shaping product flows around user needs, behavior, and context so complex journeys feel calm and direct.",
      projects: ["Health Companion", "Learning Portal"],
    },
    {
      index: "04",
      title: "ENTERPRISE DESIGN THINKING",
      description:
        "Aligning teams through research, workshops, service maps, and practical frameworks that move ideas into execution.",
      projects: ["Ops Console", "Internal Systems"],
    },
    {
      index: "05",
      title: "DESIGN STRATEGY",
      description:
        "Connecting brand, product, and business goals into a clear design direction with measurable creative intent.",
      projects: ["Market Entry", "Growth Experiments"],
    },
    {
      index: "06",
      title: "BRAND IDENTITY",
      description:
        "Building distinct identities, type systems, and expressive assets for brands that need to feel sharp and current.",
      projects: ["AI Studio", "Community Platform"],
    },
  ];

  const experienceItems = [
    {
      index: "01",
      status: "CURRENT",
      company: "PUNCH DIGITAL AGENCY",
      location: "Remote / USA",
      role: "Graphics Design / UI/UX Designer",
      date: "2024 - Present",
      active: true,
    },
    {
      index: "02",
      status: "TEACHING",
      company: "GREENWARE ACADEMY",
      location: "Lagos",
      role: "Graphics Design Instructor",
      date: "2025 - Present",
      active: false,
    },
    {
      index: "03",
      status: "PROFESSIONAL",
      company: "SHIREWOOD TECHNOLOGIES",
      location: "UK (Remote)",
      role: "UI/UX Designer",
      date: "2024 - 2025",
      active: false,
    },
    {
      index: "04",
      status: "INTERNSHIP",
      company: "FLEXISAF",
      location: "Lagos",
      role: "UI/UX Designer (Intern)",
      date: "2023",
      active: false,
    },
    {
      index: "05",
      status: "FOUNDATION",
      company: "HNG",
      location: "Lagos",
      role: "UI/UX Designer / PM Intern",
      date: "2022",
      active: false,
    },
  ];

  const navigationItems = [
    { label: "HOME", href: "#top" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "EXPERIENCE", href: "#experience" },
  ];

  const socialLinks = [
    { label: "LINKEDIN", href: "#" },
    { label: "BEHANCE", href: "#" },
    { label: "INSTAGRAM", href: "#" },
  ];

  const closeMenu = () => {
    setHoveredNavItem(null);
    panelPointerX.set(0);
    panelPointerY.set(0);
    setIsMenuOpen(false);
  };

  const handlePanelPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch" || !panelRef.current) {
      return;
    }

    const bounds = panelRef.current.getBoundingClientRect();
    const xProgress = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yProgress = (event.clientY - bounds.top) / bounds.height - 0.5;

    panelPointerX.set(xProgress * 12);
    panelPointerY.set(yProgress * 10);
  };

  const handlePanelPointerLeave = () => {
    panelPointerX.set(0);
    panelPointerY.set(0);
  };

  const navListVariants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { delayChildren: 0 }
        : { staggerChildren: 0.06, delayChildren: 0.12 },
    },
    exit: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, staggerDirection: -1 }
        : { staggerChildren: 0.035, staggerDirection: -1 },
    },
  };

  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      scale: shouldReduceMotion ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0.2 }
        : { type: "spring" as const, stiffness: 220, damping: 24, mass: 0.9 },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: { duration: 0.2, ease: premiumEase },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      setHoveredNavItem(null);
      panelPointerX.set(0);
      panelPointerY.set(0);
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, panelPointerX, panelPointerY]);

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
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: experienceScrollProgress } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"],
  });
  const smoothExperienceProgress = useSpring(experienceScrollProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      id="top"
      ref={containerRef}
      className="relative min-h-screen bg-black selection:bg-brand-blue/30 selection:text-white"
    >
      {/* Navigation */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 transition-[padding] duration-500 ${
          isScrolled ? "pt-3" : "pt-5"
        }`}
      >
        <motion.nav
          initial={false}
          animate={{
            y: isScrolled ? -2 : 0,
            scale: isScrolled ? 0.985 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto relative flex w-full max-w-[1180px] items-center justify-between overflow-visible rounded-[24px] border px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 transition-[background-color,border-color,box-shadow] duration-500 ${
            isScrolled
              ? "border-white/12 bg-black/70 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
              : "border-white/10 bg-white/[0.05] shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_32%,transparent_72%)] opacity-70" />

          <a
            href="#top"
            className="relative z-10 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-80 sm:text-[12px] sm:tracking-[0.28em]"
          >
            QUADRI EMMANUEL
          </a>

          <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
            <motion.button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (isMenuOpen) {
                  closeMenu();
                  return;
                }

                setIsMenuOpen(true);
              }}
              className="group inline-flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-black shadow-[0_16px_32px_rgba(255,255,255,0.15)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_20px_45px_rgba(255,255,255,0.24)] sm:px-5 sm:text-[12px]"
            >
              <span>MENU</span>
              <span className="relative flex h-3.5 w-4 flex-col justify-between">
                <span
                  className={`h-[2px] w-full rounded-full bg-black transition-transform duration-300 ${
                    isMenuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[2px] w-full rounded-full bg-black transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-[2px] w-full rounded-full bg-black transition-transform duration-300 ${
                    isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </motion.button>

            <motion.div
              aria-hidden="true"
              whileHover={{ y: -2, rotate: 6, scale: 1.03 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            >
              <div className="relative h-4 w-4">
                <span className="absolute left-[1px] top-[2px] h-1 w-1 rounded-full bg-white/75" />
                <span className="absolute right-[1px] top-[2px] h-1 w-1 rounded-full bg-white/75" />
                <span className="absolute left-1/2 top-[8px] h-[6px] w-[10px] -translate-x-1/2 rounded-b-full border-b border-white/65" />
              </div>
            </motion.div>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-[10px] sm:px-6 sm:py-8 lg:px-8"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.982, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.972, y: 16 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="site-menu-title"
              className="h-full max-h-[820px] w-full max-w-[1220px]"
            >
              <motion.div
                ref={panelRef}
                onPointerMove={handlePanelPointerMove}
                onPointerLeave={handlePanelPointerLeave}
                style={shouldReduceMotion ? undefined : { x: panelTranslateX, y: panelTranslateY }}
                className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-black/10 bg-[#f3efe8] text-black shadow-[0_40px_140px_rgba(0,0,0,0.34)] will-change-transform sm:rounded-[40px]"
              >
                <motion.div
                  aria-hidden="true"
                  style={shouldReduceMotion ? undefined : { x: panelHighlightX, y: panelHighlightY }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_48%),linear-gradient(135deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_36%)] opacity-90 will-change-transform"
                />
                <motion.div
                  aria-hidden="true"
                  style={shouldReduceMotion ? undefined : { x: panelHighlightX, y: panelHighlightY }}
                  className="pointer-events-none absolute right-[-10%] top-[-14%] h-64 w-64 rounded-full bg-white/45 blur-3xl"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(243,239,232,0)_0%,rgba(230,226,218,0.72)_100%)]" />

                <div className="relative flex h-full flex-col p-5 sm:p-8 lg:p-12">
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-[420px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-black/35">
                      Site Index
                    </p>
                    <h2
                      id="site-menu-title"
                      className="mt-6 max-w-[280px] text-[28px] font-semibold leading-[0.95] tracking-[-0.08em] text-black/80 sm:text-[38px]"
                    >
                      A quieter way into the work.
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/45 sm:text-[15px]">
                      Navigate the portfolio through a simple editorial menu built for calm focus on both desktop and mobile.
                    </p>
                  </div>

                  <motion.button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeMenu}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                    variants={{
                      rest: { rotate: 0, scale: 1 },
                      hover: {
                        rotate: 90,
                        scale: 1.05,
                        transition: shouldReduceMotion
                          ? { duration: 0.15 }
                          : { type: "spring" as const, stiffness: 260, damping: 18 },
                      },
                    }}
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white/55 text-black/80 shadow-[0_14px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-colors duration-300 hover:border-black/20 focus:outline-none focus:ring-2 focus:ring-black/20"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.82 },
                        hover: {
                          opacity: 1,
                          scale: 1,
                          transition: shouldReduceMotion
                            ? { duration: 0.15 }
                            : { type: "spring" as const, stiffness: 260, damping: 18 },
                        },
                      }}
                      className="absolute inset-0 rounded-full bg-black/[0.07]"
                    />
                    <span className="sr-only">Close menu</span>
                    <span className="absolute h-px w-5 rotate-45 bg-current" />
                    <span className="absolute h-px w-5 -rotate-45 bg-current" />
                  </motion.button>
                </div>

                <div className="mt-12 grid flex-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(340px,500px)] md:gap-12 lg:mt-8">
                  <div className="flex min-h-[180px] items-end">
                    <div className="max-w-[420px]">
                      <div className="h-px w-24 bg-black/15" />
                      <p className="mt-5 text-sm leading-relaxed text-black/45 sm:text-[15px]">
                        Editorial restraint, tactile motion, and space for the typography to breathe.
                      </p>
                    </div>
                  </div>

                  <motion.nav
                    variants={navListVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onPointerLeave={() => setHoveredNavItem(null)}
                    className="flex w-full flex-col items-start justify-center overflow-visible md:items-end md:text-right"
                  >
                    {navigationItems.map((item) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        variants={navItemVariants}
                        onHoverStart={() => setHoveredNavItem(item.href)}
                        onHoverEnd={() => {
                          setHoveredNavItem((current) => (current === item.href ? null : current));
                        }}
                        className="group relative flex w-full cursor-pointer justify-start overflow-visible py-1.5 sm:py-2 md:justify-end"
                      >
                        <motion.span
                          animate={{
                            y: hoveredNavItem === item.href && !shouldReduceMotion ? -4 : 0,
                            scale: hoveredNavItem === item.href && !shouldReduceMotion ? 1.02 : 1,
                            opacity: hoveredNavItem && hoveredNavItem !== item.href ? 0.58 : 1,
                            color: hoveredNavItem === item.href ? "#000000" : "rgba(0,0,0,0.82)",
                            letterSpacing: hoveredNavItem === item.href ? "-0.108em" : "-0.12em",
                          }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0.16 }
                              : { type: "spring" as const, stiffness: 300, damping: 22, mass: 0.8 }
                          }
                          className="relative inline-block overflow-visible origin-left will-change-transform md:origin-right"
                        >
                          <span className="block text-[clamp(3rem,11vw,6.35rem)] font-black uppercase leading-[0.82]">
                            {item.label}
                          </span>
                          <motion.span
                            aria-hidden="true"
                            animate={{
                              scaleX: hoveredNavItem === item.href ? 1 : 0,
                              opacity: hoveredNavItem === item.href ? 1 : 0.65,
                            }}
                            transition={
                              shouldReduceMotion
                                ? { duration: 0.16 }
                                : { type: "spring" as const, stiffness: 320, damping: 28 }
                            }
                            style={{ originX: 0 }}
                            className="absolute bottom-0 left-0 h-px w-full bg-black/85"
                          />
                        </motion.span>
                      </motion.a>
                    ))}
                  </motion.nav>
                </div>

                <div className="mt-8 border-t border-black/12 pt-5 sm:pt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.48em] text-black/35">
                      Elsewhere
                    </span>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:justify-end">
                      {socialLinks.map((item) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          onClick={(event) => {
                            event.preventDefault();
                            closeMenu();
                          }}
                          initial="rest"
                          animate="rest"
                          whileHover="hover"
                          className="group inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black/65"
                        >
                          <span className="relative inline-flex">
                            <motion.span
                              variants={{
                                rest: { x: 0, color: "rgba(0,0,0,0.65)" },
                                hover: {
                                  x: shouldReduceMotion ? 0 : 1.5,
                                  color: "#000000",
                                  transition: shouldReduceMotion
                                    ? { duration: 0.15 }
                                    : { type: "spring" as const, stiffness: 320, damping: 24 },
                                },
                              }}
                            >
                              {item.label}
                            </motion.span>
                            <motion.span
                              aria-hidden="true"
                              variants={{
                                rest: { scaleX: 0, opacity: 0.7 },
                                hover: {
                                  scaleX: 1,
                                  opacity: 1,
                                  transition: shouldReduceMotion
                                    ? { duration: 0.15 }
                                    : { type: "spring" as const, stiffness: 320, damping: 28 },
                                },
                              }}
                              style={{ originX: 0 }}
                              className="absolute -bottom-1 left-0 h-px w-full bg-black/80"
                            />
                          </span>
                          <motion.span
                            variants={{
                              rest: { x: 0, y: 0, color: "rgba(0,0,0,0.65)" },
                              hover: {
                                x: shouldReduceMotion ? 0 : 2,
                                y: shouldReduceMotion ? 0 : -2,
                                color: "#000000",
                                transition: shouldReduceMotion
                                  ? { duration: 0.15 }
                                  : { type: "spring" as const, stiffness: 320, damping: 24 },
                              },
                            }}
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </motion.span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section Container */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-bg-dark">
        {/* Dynamic Background: Constrained to Hero Content area */}
        <motion.div 
          style={{ y: backgroundY, opacity }}
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
        <section className="relative z-30 flex min-h-screen flex-col">
        <div className="mx-auto grid w-full max-w-[1700px] flex-1 grid-cols-1 items-center gap-12 px-6 pb-28 pt-32 sm:px-10 md:pb-32 lg:grid-cols-2 lg:gap-20 lg:px-[60px]">
          
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
                  Hi, I&apos;m Quadri Emmanuel.
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
              <div className="mt-4 flex w-full flex-col gap-8 border-t border-white/5 pt-10">
                <p className="max-w-[760px] text-[17px] font-light leading-[1.6] text-white/40 md:text-[20px]">
                  Designing brands, digital experiences, and ideas that feel cultural, intelligent, and impossible to ignore.
                </p>
                
                {/* Expertise Tags */}
                <div className="mt-1 flex w-full flex-wrap items-center gap-3">
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
        <div className="absolute inset-x-0 bottom-0 z-40 overflow-hidden border-y border-white/[0.07] bg-black/35 py-4 backdrop-blur-xl sm:py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-dark via-bg-dark/85 to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-dark via-bg-dark/85 to-transparent sm:w-32" />
          <div className="hero-skills-marquee flex w-max items-center whitespace-nowrap will-change-transform">
            {[...heroMarqueeItems, ...heroMarqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex shrink-0 items-center">
                <span className="px-5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/35 transition-colors duration-300 hover:text-white/70 sm:px-7">
                  {item}
                </span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-blue/45" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>

      <section
        id="expertise"
        className="relative overflow-visible bg-bg-dark text-white"
      >
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-0 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[42%_58%] lg:px-[60px] lg:py-0">
          <div className="min-w-0 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pr-12 xl:pr-16">
            <div className="w-full min-w-0 overflow-hidden border-b border-white/[0.08] pb-12 lg:border-b-0 lg:pb-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-white/35">
                [MY OFFERINGS]
              </p>
              <h2 className="mt-9 flex max-w-full flex-col font-display text-[clamp(3.35rem,14vw,5rem)] font-black uppercase leading-[0.84] tracking-[-0.065em] text-white sm:text-[clamp(4rem,10vw,5.75rem)] md:text-[clamp(4.5rem,8vw,6.25rem)] lg:mt-12 lg:text-[clamp(4rem,5.2vw,5.95rem)] xl:text-[clamp(4.4rem,4.9vw,6.35rem)]">
                <span className="block max-w-full">EXPERTISE</span>
                <span className="my-2 block font-serif text-[0.42em] font-light lowercase italic leading-none tracking-normal text-white/45 sm:my-3 lg:my-2">
                  and
                </span>
                <span className="block max-w-full">SKILLS</span>
              </h2>
              <p className="mt-8 max-w-[500px] text-[15px] font-light leading-[1.75] text-white/48 sm:text-[17px] lg:mt-9">
                Bridging emotion and clarity, my practice moves across storytelling, research,
                visual systems, and product thinking. The aim is simple: create useful digital
                experiences with a point of view.
              </p>
            </div>
          </div>

          <div className="lg:border-l lg:border-white/[0.08] lg:pl-12 xl:pl-16">
            <div className="divide-y divide-white/[0.08]">
              {expertiseItems.map((item, index) => (
                <motion.article
                  key={item.index}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px -18%" }}
                  transition={{ duration: 0.75, delay: index * 0.04, ease: premiumEase }}
                  className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[70px_minmax(0,1fr)_190px] lg:gap-8 xl:py-20"
                >
                  <div className="font-mono text-[11px] font-semibold tracking-[0.24em] text-white/35">
                    [{item.index}]
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-5">
                      <h3 className="text-[clamp(2.35rem,10vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-white sm:text-[clamp(3rem,6vw,4rem)] lg:text-[clamp(2.85rem,3.6vw,4.25rem)]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="mt-8 h-px w-full bg-white/[0.08]" />
                    <p className="mt-7 max-w-[620px] text-[15px] font-light leading-[1.75] text-white/48 sm:text-[17px]">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-white/32">
                      RELATED WORK &darr;
                    </p>
                    <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                      {item.projects.map((project) => (
                        <a
                          key={project}
                          href="#expertise"
                          className="group inline-flex w-fit items-center gap-2 border-b border-white/15 pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-white/52 transition-colors duration-300 hover:text-white"
                        >
                          <span>{project}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-80" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        ref={experienceRef}
        className="relative bg-bg-dark text-white"
        style={{ height: `${experienceItems.length * 100}vh` }}
      >
        <div className="sticky top-0 mx-auto grid h-screen max-w-[1700px] grid-cols-1 gap-10 overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[42%_58%] lg:items-center lg:gap-0 lg:px-[60px] lg:py-0">
          <div className="min-w-0 lg:pr-14 xl:pr-20">
            <div className="w-full min-w-0 overflow-hidden border-b border-white/[0.08] pb-8 lg:border-b-0 lg:pb-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-white/34">
                [EXPERIENCE]
              </p>
              <h2 className="mt-8 flex max-w-[620px] flex-col font-display text-[clamp(3.05rem,12vw,4.25rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white/92 sm:text-[clamp(3.7rem,8vw,5rem)] md:text-[clamp(4rem,6.8vw,5.6rem)] lg:mt-10 lg:text-[clamp(3.45rem,4.4vw,5.1rem)] xl:text-[clamp(3.8rem,4.2vw,5.6rem)]">
                <span className="block max-w-full">THE</span>
                <span className="my-1 block font-serif text-[0.38em] font-light lowercase italic leading-none tracking-normal text-white/48 sm:my-2">
                  prequel
                </span>
                <span className="block max-w-full">TO TODAY</span>
              </h2>
              <p className="mt-8 max-w-[380px] text-[14px] font-light leading-[1.9] text-white/42 sm:text-[15px] lg:mt-10">
                Current practice, teaching, professional work, internships, and early product
                foundations arranged as a clean scroll through the path that shaped the work.
              </p>
            </div>
          </div>

          <div className="relative min-h-[48vh] overflow-hidden lg:min-h-[62vh] lg:border-l lg:border-white/[0.08] lg:pl-12 xl:pl-16">
            <div className="relative h-full min-h-[48vh] lg:min-h-[62vh]">
              {experienceItems.map((item, index) => (
                <ExperienceTimelineCard
                  key={item.company}
                  item={item}
                  index={index}
                  total={experienceItems.length}
                  progress={smoothExperienceProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type ExperienceItem = {
  index: string;
  status: string;
  company: string;
  location: string;
  role: string;
  date: string;
  active: boolean;
};

function ExperienceTimelineCard({
  item,
  index,
  total,
  progress,
}: {
  item: ExperienceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const enterEnd = start + segment * 0.22;
  const holdEnd = start + segment * 0.74;
  const exitEnd = Math.min(1, start + segment);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const y = useTransform(
    progress,
    isFirst
      ? [0, holdEnd, exitEnd]
      : isLast
        ? [start, enterEnd, 1]
        : [start, enterEnd, holdEnd, exitEnd],
    isFirst
      ? ["0px", "0px", "-44px"]
      : isLast
        ? ["44px", "0px", "0px"]
        : ["44px", "0px", "0px", "-44px"]
  );
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, holdEnd, exitEnd]
      : isLast
        ? [start, enterEnd, 1]
        : [start, enterEnd, holdEnd, exitEnd],
    isFirst
      ? [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.6 ? "auto" : "none"));

  return (
    <motion.article
      style={{ y, opacity, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center bg-bg-dark"
    >
      <div className="grid min-w-0 gap-10 border-t border-white/[0.08] py-8 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)] sm:items-start sm:gap-14 sm:py-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(240px,0.42fr)] lg:gap-16 lg:py-12 xl:gap-20">
        <div className="min-w-0 max-w-[760px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[10px] font-semibold tracking-[0.24em] text-white/34">
              [{item.index}]
            </span>
            <span className="inline-flex min-w-0 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/36">
              {item.active && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.68)]" />
              )}
              {item.active ? "Active" : item.status}
            </span>
          </div>
          <h3 className="mt-7 max-w-full overflow-wrap-anywhere text-[clamp(1.2rem,4.5vw,2.4rem)] sm:text-[clamp(1.2rem,3.5vw,2.6rem)] lg:text-[clamp(1rem,2.4vw,2.8rem)] font-black uppercase leading-[1] tracking-[-0.03em] text-white/92">
  {item.company}
</h3>
          <p className="mt-6 max-w-[520px] text-[14px] font-light leading-[1.75] text-white/48 sm:text-[15px]">
            {item.role}
          </p>
          <p className="mt-4 max-w-full break-words font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/32">
            [{item.location}]
          </p>
        </div>

        <div className="min-w-0 max-w-full border-t border-white/[0.08] pt-6 sm:border-t-0 sm:pt-[3.65rem] sm:text-right">
          <p className="max-w-full break-words font-display text-[clamp(1.2rem,2.5vw,1.8rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-white/84 sm:ml-auto sm:text-[clamp(1.9rem,3.2vw,2.8rem)] lg:text-[clamp(2rem,2.35vw,3rem)]">
            {item.date}
          </p>
          <p className="mt-5 inline-flex max-w-full items-center justify-start gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/34 sm:justify-end">
            {item.active && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.68)]" />
            )}
            <span className="min-w-0 break-words">{item.active ? "Active" : item.status}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}
