"use client";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, BarChart3, Sparkles } from "lucide-react";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full">
      {/* Hero Section - 70% Height Requirement */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> Intelligence Redefined
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Build Smarter <br /> With Lumina AI
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The premium SaaS engine for content generation and data analysis.
            Experience the future of productivity in a gorgeous, modern
            interface.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-95">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Feature Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              Powerful Capabilities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Tools designed to scale with your ambition.
            </p>
          </div>
          <div className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Explore all features →
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4"
        >
          {/* Large Card: AI Generator */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 p-10 rounded-[3rem] bg-blue-600 text-white flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Cpu size={200} />
            </div>
            <div className="z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Sparkles size={24} />
              </div>
              <h3 className="text-4xl font-bold mb-4">AI Content Engine</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Generate high-conversion copy, technical documentation, and
                complex code snippets in seconds.
              </p>
            </div>
            <button className="z-10 self-start mt-8 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm shadow-xl">
              Try Generator
            </button>
          </motion.div>

          {/* Medium Card: Analysis */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-2xl flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <span className="text-xs font-black text-slate-400">
                LIVE DATA
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Smart Data Analysis</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Turn raw data into actionable business intelligence.
              </p>
            </div>
          </motion.div>

          {/* Small Card: Security */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-[3rem] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50"
          >
            <Shield className="text-emerald-600 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-1">Secure RBAC</h3>
            <p className="text-sm text-slate-500">Enterprise security.</p>
          </motion.div>

          {/* Small Card: Speed */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-[3rem] bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50"
          >
            <Zap className="text-purple-600 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-1">Next.js 15</h3>
            <p className="text-sm text-slate-500">Blazing performance.</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
