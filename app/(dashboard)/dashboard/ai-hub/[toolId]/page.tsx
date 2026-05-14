"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  Trash2,
  ExternalLink,
  Calendar,
  Sparkles,
  Filter,
  Copy,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

// ১. টাইপ ডিফাইন করা
interface Generation {
  _id: string;
  toolName: string;
  prompt: string;
  content: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // ২. ব্যাকএন্ড থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // ডামি ডাটা (টেস্টিং এর জন্য)
        const dummyData = [
          {
            _id: "1",
            toolName: "Content Engine",
            prompt: "Write a blog about AI",
            content: "AI is the future...",
            createdAt: "2026-05-14T10:00:00Z",
          },
          {
            _id: "2",
            toolName: "Logic Architect",
            prompt: "React Sidebar Code",
            content: "const Sidebar = () => ...",
            createdAt: "2026-05-13T15:30:00Z",
          },
        ];
        setHistory(dummyData);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toolName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-full flex flex-col space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-10 pb-12 transition-all duration-500 bg-[#050609] mt-15 lg:mt-0">
      {/* --- Header & Search Section --- */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] mb-1">
            <History size={14} className="animate-pulse" /> Neural_Archive_Core:
            Online
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            Neural <span className="text-primary">Library</span>
          </h2>
          <p className="text-white/40 font-medium text-sm sm:text-base max-w-xl">
            Access your previous neural generations and synchronized archives
            from the cloud.
          </p>
        </motion.div>

        <div className="relative group w-full xl:w-[400px]">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0d11] border border-white/5 py-4 pl-14 pr-6 rounded-2xl sm:rounded-3xl outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all font-medium text-sm text-white placeholder:text-white/10"
          />
        </div>
      </header>

      {/* --- History List Container --- */}
      <div className="flex-1 bg-[#0c0d11] border border-white/5 rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/50 relative flex flex-col min-h-[400px]">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />

        {/* List Header (Hidden on Mobile) */}
        <div className="hidden sm:flex p-8 border-b border-white/5 items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">
              Module_Source
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">
              Neural_Input_Insight
            </span>
          </div>
          <Filter
            size={16}
            className="text-white/20 hover:text-primary cursor-pointer transition-colors"
          />
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
                  Synchronizing_Archives...
                </p>
              </div>
            ) : filteredHistory.length > 0 ? (
              filteredHistory.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    delay: idx * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 sm:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer relative"
                >
                  <div className="flex items-center gap-4 sm:gap-8 flex-1">
                    {/* Icon Box */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5">
                      <Sparkles size={22} />
                    </div>

                    {/* Info */}
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-widest">
                        {item.toolName}
                      </p>
                      <h4 className="text-white font-bold text-base sm:text-xl line-clamp-1 group-hover:text-primary transition-colors italic uppercase tracking-tighter pr-4">
                        {item.prompt}
                      </h4>
                      <div className="flex items-center gap-3 text-white/20 text-[10px] font-bold uppercase italic">
                        <Calendar size={12} />{" "}
                        {new Date(item.createdAt).toDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-6 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="p-3 bg-[#050609] border border-white/10 rounded-xl text-white/60 hover:text-primary hover:border-primary/40 transition-all shadow-xl">
                      <Copy size={16} />
                    </button>
                    <button className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500/60 hover:bg-red-500 hover:text-white transition-all shadow-xl">
                      <Trash2 size={16} />
                    </button>
                    <ChevronRight
                      size={20}
                      className="hidden sm:block text-white/10 group-hover:text-primary group-hover:translate-x-2 transition-all"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-32 text-center flex flex-col items-center justify-center opacity-20">
                <History
                  size={64}
                  strokeWidth={1}
                  className="mb-6 animate-pulse"
                />
                <h3 className="text-xl font-black uppercase italic tracking-widest text-white">
                  Empty Memory Cores
                </h3>
                <p className="text-sm font-medium mt-2">
                  Neural archives return zero results.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Footer Statistics --- */}
      <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 pt-4">
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 bg-[#0c0d11] border border-white/5 rounded-[2.5rem] flex items-center gap-8 shadow-xl"
        >
          <div className="text-4xl sm:text-5xl font-black italic text-primary drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            {history.length.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-white/40 leading-relaxed italic">
            Synchronized <br /> Neural_Archives
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="lg:col-span-2 p-8 bg-primary rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer shadow-2xl shadow-primary/20 transition-all duration-500 overflow-hidden relative"
        >
          <Sparkles className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10 space-y-1">
            <span className="font-black uppercase tracking-[0.3em] text-[10px] opacity-70 italic">
              Admin_Protocol
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter">
              Export Neural Data
            </h3>
          </div>
          <ExternalLink
            size={28}
            className="relative z-10 group-hover:rotate-45 group-hover:scale-110 transition-all duration-500"
          />
        </motion.div>
      </footer>
    </div>
  );
}
