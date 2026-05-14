"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Command,
  Globe,
} from "lucide-react";

export default function HomePage() {
  // ১. Variants টাইপ ডিফাইন করা (TypeScript Error সলভ করার জন্য)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full bg-background text-foreground selection:bg-primary/30 transition-colors duration-500">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[20%] left-[10%] p-4 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hidden lg:block"
          >
            <Command size={24} className="text-primary" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-[20%] right-[10%] p-4 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hidden lg:block"
          >
            <Globe size={24} className="text-purple-500" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles size={14} className="animate-pulse" /> Intelligence
            Redefined
          </div>

          {/* Main Title - Responsive & Fixed Color Logic */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] italic uppercase text-foreground">
            Build <span className="text-primary">Smarter</span> <br />
            <span className="opacity-70 dark:opacity-90">With Lumina AI</span>
          </h1>

          {/* Description - Using text-muted for theme safety */}
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            The premium SaaS engine for content generation and data analysis.
            Experience the future of productivity in a gorgeous interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20">
              <span className="relative z-10 flex items-center gap-2">
                Get Started{" "}
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button className="px-10 py-5 bg-card border border-border text-foreground rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-muted/10 transition-all active:scale-95">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Scroll Line Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* --- BENTO GRID FEATURE SECTION --- */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-border pb-10">
          <div className="max-w-xl text-left">
            <h2 className="text-5xl font-black tracking-tighter uppercase italic text-foreground">
              Powerful <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-muted mt-4 text-lg font-medium leading-relaxed">
              Enterprise-grade tools designed to scale with your ambition.
            </p>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs cursor-pointer group"
          >
            Explore all features{" "}
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition-transform"
            />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6"
        >
          {/* Card: AI Generator (Blue High Contrast) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 p-12 rounded-[3.5rem] bg-primary text-primary-foreground flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-primary/20"
          >
            <div className="absolute -top-10 -right-10 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <Cpu size={300} />
            </div>

            <div className="z-10">
              <div className="w-14 h-14 bg-white/20 rounded-[1.5rem] flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                <Sparkles size={28} />
              </div>
              <h3 className="text-5xl font-black tracking-tighter mb-6 uppercase italic leading-none">
                AI Content <br /> Engine
              </h3>
              <p className="opacity-90 text-xl leading-relaxed font-medium max-w-sm">
                Generate high-conversion copy and complex code snippets with
                neural precision.
              </p>
            </div>

            <button className="z-10 self-start mt-10 px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform">
              Try Generator
            </button>
          </motion.div>

          {/* Card: Analysis (Card Theme) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 rounded-[3.5rem] bg-card border border-border flex flex-col justify-between group transition-all hover:border-primary/30 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6">
                <BarChart3 size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
                  System Status
                </span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] italic">
                  Live_Sync
                </span>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-3xl font-black tracking-tighter uppercase italic text-foreground mb-3">
                Data Analysis
              </h3>
              <p className="text-muted font-medium leading-relaxed">
                Turn raw data into actionable intelligence with automated
                visualization patterns.
              </p>
            </div>
          </motion.div>

          {/* Small Card: Security */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-10 rounded-[3.5rem] bg-card border border-border group shadow-sm"
          >
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="font-black text-xl uppercase tracking-tight mb-2 italic text-foreground">
              Secure RBAC
            </h3>
            <p className="text-sm text-muted font-medium">
              Enterprise-level security for every request.
            </p>
          </motion.div>

          {/* Small Card: Speed */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-10 rounded-[3.5rem] bg-card border border-border group shadow-sm"
          >
            <div className="w-12 h-12 bg-purple-500/20 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-black text-xl uppercase tracking-tight mb-2 italic text-foreground">
              Next.js 15
            </h3>
            <p className="text-sm text-muted font-medium">
              Hyper-fast server components runtime.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
