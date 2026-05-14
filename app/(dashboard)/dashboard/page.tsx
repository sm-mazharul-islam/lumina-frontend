"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, LayoutGrid, List } from "lucide-react";
import AIDashboard from "@/src/components/dashboard/aiDashboard/AIDashboard";

export default function AIHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Text", "Image", "Code", "Data", "Security"];

  return (
    <div className="min-h-full flex flex-col space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-10 pb-12 transition-all duration-500">
      {/* --- Header Section --- */}
      <header className="flex flex-col space-y-6 pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl space-y-2 sm:space-y-4"
        >
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[9px] sm:text-[11px] mb-1 mt-20 lg:mt-0">
            <Sparkles size={14} className="animate-pulse" />{" "}
            Neural_Hub_Ecosystem: v2.5
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
            AI Tool <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="text-white/40 font-medium text-sm sm:text-lg leading-relaxed">
            Deploy specialized neural nodes for your next big project.
            Seamlessly integrate multi-modal intelligence with zero latency.
          </p>
        </motion.div>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-[#0c0d11] border border-white/5 p-2 sm:p-4 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl shadow-black/50">
          {/* Search Input Container */}
          <div className="relative w-full xl:w-[450px] group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search neural modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050609] border border-white/5 py-4 pl-14 pr-6 rounded-2xl sm:rounded-3xl outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium text-sm text-white placeholder:text-white/10"
            />
          </div>

          {/* Category Pills - Scrollable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full xl:w-auto px-2 py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                    : "bg-[#050609] border-white/5 text-white/40 hover:border-primary/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle (Hidden on Mobile/Tablet) */}
          <div className="hidden xl:flex items-center bg-[#050609] border border-white/5 p-1.5 rounded-2xl">
            <button className="p-2.5 bg-primary/10 text-primary rounded-xl shadow-inner shadow-primary/5">
              <LayoutGrid size={20} />
            </button>
            <button className="p-2.5 text-white/20 hover:text-white transition-colors">
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="flex-1 min-h-0 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.4,
            }}
          >
            <AIDashboard
              searchQuery={searchQuery}
              activeCategory={activeCategory}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Decorative Branding Overlay */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-5 hidden 2xl:block select-none">
        <h1 className="text-[12rem] font-black italic tracking-tighter uppercase leading-none">
          Lumina
        </h1>
      </div>
    </div>
  );
}
