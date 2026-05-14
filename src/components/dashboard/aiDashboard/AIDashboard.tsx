"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  PenTool,
  ImageIcon,
  Code2,
  Terminal,
  BarChart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface AIDashboardProps {
  searchQuery: string;
  activeCategory: string;
}

export default function AIDashboard({
  searchQuery,
  activeCategory,
}: AIDashboardProps) {
  // টুলস অ্যারে - এখানে আইকনের সাইজ Tailwind ক্লাস দিয়ে কন্ট্রোল করা হয়েছে (w-6 h-6 মোবাইলে, w-8 h-8 বড় স্ক্রিনে)
  const tools = [
    {
      id: "content-engine",
      title: "Neural Content Engine",
      desc: "Generate SEO-optimized blog posts and marketing copy with neural precision.",
      icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-blue-600 to-indigo-600",
      size: "large",
      category: "Text",
      status: "Online",
    },
    {
      id: "logic-architect",
      title: "Logic Architect",
      desc: "Debug and generate complex code snippets in 20+ languages.",
      icon: <Code2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-emerald-600 to-teal-500",
      size: "medium",
      category: "Code",
      status: "Stable",
    },
    {
      id: "visionary-ai",
      title: "Visionary AI",
      desc: "Create premium photorealistic images from text prompts.",
      icon: <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-purple-600 to-fuchsia-600",
      size: "medium",
      category: "Image",
      status: "Beta",
    },
    {
      id: "deep-analysis",
      title: "Deep Analysis",
      desc: "Predictive data patterns for business growth.",
      icon: <BarChart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-orange-600 to-rose-600",
      size: "small",
      category: "Data",
      status: "Live",
    },
    {
      id: "secure-terminal",
      title: "Secure Terminal",
      desc: "Private AI workspace with enterprise security.",
      icon: <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-slate-700 to-slate-800",
      size: "small",
      category: "Security",
      status: "Encrypted",
    },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 pb-10">
      <AnimatePresence mode="popLayout">
        {filteredTools.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                layout
                className={`group relative rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#0a0c10] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ${
                  tool.size === "large"
                    ? "md:col-span-4 md:row-span-2 min-h-[400px] sm:min-h-[480px]"
                    : "md:col-span-2 min-h-[260px] sm:min-h-[280px]"
                }`}
              >
                {/* Background Effects */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`}
                />
                <div
                  className={`absolute -top-32 -right-32 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br ${tool.color} opacity-0 blur-[80px] sm:blur-[120px] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none`}
                />

                <Link
                  href={`/dashboard/ai-hub/${tool.id}`}
                  className="flex flex-col h-full p-6 sm:p-8 lg:p-10 justify-between relative z-10"
                >
                  <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className="flex justify-between items-start">
                      {/* Icon Box */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${tool.color} text-white shadow-[0_10px_30px_-10px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        {tool.icon}
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.color} animate-pulse`}
                          />
                          <span className="text-[8px] sm:text-[9px] font-black text-white/60 uppercase tracking-widest leading-none">
                            {tool.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3
                        className={`${
                          tool.size === "large"
                            ? "text-3xl sm:text-5xl lg:text-6xl"
                            : "text-2xl sm:text-3xl"
                        } font-black uppercase italic tracking-tighter text-white leading-none`}
                      >
                        {tool.title.split(" ").map((word, i) => (
                          <span
                            key={i}
                            className={i === 1 ? "text-primary" : ""}
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </h3>
                      <p className="text-white/50 font-medium leading-relaxed max-w-sm text-xs sm:text-sm lg:text-base group-hover:text-white/80 transition-colors line-clamp-3 sm:line-clamp-none">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-white/5 pt-6 sm:pt-8">
                    <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary group-hover:text-white transition-colors duration-300">
                      Initialize Node{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-3 sm:group-hover:translate-x-4 transition-transform duration-500"
                      />
                    </div>

                    {/* Visual Interface Decoration */}
                    <div className="flex gap-1 sm:gap-1.5 items-end h-3 sm:h-4">
                      {[1, 0.6, 0.4].map((op, i) => (
                        <div
                          key={i}
                          className={`w-0.5 sm:w-1 bg-primary rounded-full transition-all duration-500`}
                          style={{ height: `${(i + 1) * 30}%`, opacity: op }}
                        />
                      ))}
                    </div>
                  </div>
                </Link>

                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] sm:rounded-[3.5rem] pointer-events-none transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 sm:mx-0 py-20 sm:py-32 text-center flex flex-col items-center bg-[#0a0c10] rounded-[2.5rem] sm:rounded-[4rem] border border-white/5 shadow-2xl"
          >
            <div className="p-8 sm:p-10 bg-primary/5 rounded-full mb-6 sm:mb-8 relative">
              <Sparkles className="text-primary animate-pulse" size={48} />
              <div className="absolute inset-0 bg-primary/20 blur-[40px] sm:blur-[50px] rounded-full" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-widest text-white px-4">
              Node Unavailable
            </h3>
            <p className="text-white/40 font-medium mt-4 max-w-[250px] sm:max-w-xs text-sm sm:text-base px-4">
              Neural search returned zero results. Adjust your parameters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
