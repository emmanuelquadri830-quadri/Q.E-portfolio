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
import { ArrowUpRight, MessageSquare } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { InteractiveWaves } from "./components/InteractiveWaves";
import { StackedPortfolio } from "./components/StackedPortfolio";
import { ApproachSection } from "./components/ApproachSection";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const navigationItems = [
    { label: "HOME", href: "#top" },
    { label: "ABOUT", href: "#approach" },
    { label: "WORK", href: "#insights" },
    { label: "CONTACT", href: "#contact" },
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
    target: containerRef,
    offset: ["start start", "end start"]
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

                <div className="mt-12 grid flex-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:gap-12 lg:mt-8">
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
                    className="flex flex-col items-start justify-center md:items-end md:text-right"
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
                        className="group relative flex w-full cursor-pointer justify-start py-1.5 sm:py-2 md:justify-end"
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
                          className="relative inline-block overflow-hidden origin-left will-change-transform md:origin-right"
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
        <section className="relative min-h-screen px-[60px] pb-20 pt-32 flex items-center max-w-[1700px] mx-auto z-30">
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
      <div id="contact" className="h-[200px] bg-black flex items-end justify-center pb-8">
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
