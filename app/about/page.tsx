"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/src/shared/Navbar";
import Footer from "@/src/shared/Footer";

export default function AboutPage() {
  const stats = [
    { label: "Neural Nodes", value: "500+" },
    { label: "Data Processed", value: "10PB+" },
    { label: "Active Users", value: "100k+" },
    { label: "Uptime", value: "99.9%" },
  ];

  const values = [
    {
      title: "Neural Precision",
      desc: "Our AI engines are calibrated for extreme accuracy and high-performance output.",
      icon: <Cpu className="text-blue-500" size={24} />,
    },
    {
      title: "Enterprise Security",
      desc: "Bank-grade encryption protecting your data across the entire neural network.",
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
    },
    {
      title: "Global Scalability",
      desc: "Deploy specialized nodes anywhere in the world with zero latency.",
      icon: <Globe className="text-purple-500" size={24} />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="selection:bg-blue-500/30 overflow-hidden font-sans mt-2">
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-16 sm:pt-48 sm:pb-24 px-4 sm:px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] bg-blue-600/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-blue-500 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] mb-6 italic"
            >
              <Zap size={14} className="animate-pulse" /> Origin_Protocol:
              Active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8"
            >
              Architecting <br className="hidden sm:block" />{" "}
              <span className="text-blue-600">The Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto  text-sm sm:text-base md:text-lg font-medium italic leading-relaxed px-4"
            >
              Lumina AI is not just a tool; it&apos;s a high-performance neural
              ecosystem designed to bridge the gap between human creativity and
              machine intelligence.
            </motion.p>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 sm:p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] text-center group hover:border-blue-500/30 transition-all duration-500"
              >
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black italic  mb-1 sm:mb-2 group-hover:text-blue-500 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest  italic">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Values Grid --- */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-12 sm:mb-20 text-center md:text-left">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter ">
                  Core <span className="text-blue-600">Foundations</span>
                </h2>
                <p className=" text-[10px] sm:text-xs font-bold uppercase tracking-widest italic">
                  The pillars of our neural architecture.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black uppercase italic text-[10px] sm:text-xs rounded-2xl hover:bg-blue-600  transition-all shadow-xl shadow-white/5 active:scale-95"
              >
                Enter Dashboard{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 sm:p-12  border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] space-y-6 group transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    {val.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black uppercase italic tracking-tighter ">
                    {val.title}
                  </h4>
                  <p className=" text-xs sm:text-sm font-medium leading-relaxed italic">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-[80px] sm:blur-[120px] rounded-full scale-150 pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-8 sm:space-y-12">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter  leading-tight">
              Ready to synchronize <br className="hidden sm:block" /> with{" "}
              <span className="text-blue-600">Lumina AI?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-blue-600  font-black uppercase italic tracking-widest text-xs sm:text-sm rounded-2xl shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                Request Access
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-transparent border border-white/10  font-black uppercase italic tracking-widest text-xs sm:text-sm rounded-2xl hover:bg-white/5 transition-all active:scale-95"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* --- Footer Signature --- */}
        <div className="py-12 text-center opacity-10 select-none pointer-events-none border-t border-white/5">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] px-4">
            Lumina_Core_Philosophy_2026
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
