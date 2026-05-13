"use client";

import React, { useState, useRef, useEffect } from "react";
import { AxiosError } from "axios";
import api from "@/src/lib/axios";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Cpu,
  Sparkles,
  Terminal,
  Zap,
  User,
  Bot,
  Plus,
  Send,
} from "lucide-react";

export default function AIHubPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // অটো-স্ক্রল যখন নতুন কন্টেন্ট আসবে
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [result, loading]);

  // ইনপুট বক্স অটো-রিসাইজ
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setLastQuery(prompt);
    setResult("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/ai/generate",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResult(res.data.result);
      setPrompt("");
    } catch (err: unknown) {
      setResult(
        "### ⚠️ Connection Lost\nNeural link disrupted. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    // 'fixed inset-0' ব্যবহার করা হয়েছে যাতে এই কম্পোনেন্টটি পুরো স্ক্রিন দখল করে এবং একটুও না নড়ে।
    <div className="fixed inset-0 bg-[#050609] text-slate-300 flex flex-col overflow-hidden font-sans z-10">
      {/* 1. Header - Absolute Fixed Height */}
      <header className="h-16 border-b border-white/5 bg-[#050609]/80 backdrop-blur-xl shrink-0 flex items-center">
        <nav className="max-w-[1000px] w-full mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
              LUMINA <span className="text-blue-600">AI</span>
            </h1>
            <div className="hidden md:block h-4 w-[1px] bg-white/10 mx-2"></div>
            <p className="hidden md:block text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">
              Neural Interface
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[9px] font-mono text-green-500 bg-green-500/5 px-3 py-1 rounded-full border border-green-500/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              SYNC_ON
            </div>
            <button
              onClick={() => {
                setResult("");
                setLastQuery("");
              }}
              className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-slate-500"
            >
              <Plus size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* 2. Main Chat Area - Only this part scrolls */}
      <main className="flex-1 overflow-hidden relative flex flex-col w-full max-w-4xl mx-auto">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto no-scrollbar py-10 px-4 space-y-12 pb-44"
        >
          <AnimatePresence mode="wait">
            {!result && !loading && !lastQuery ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-10 space-y-4">
                <Cpu size={60} strokeWidth={1} className="animate-pulse" />
                <p className="text-[10px] font-black tracking-[0.5em] uppercase italic">
                  Awaiting Synchronisation
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* User Instruction Block */}
                {lastQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-900/30 text-white">
                      <User size={16} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest opacity-60 italic">
                        Master_Command
                      </p>
                      <p className="text-xl font-bold text-white leading-relaxed italic pr-4">
                        {lastQuery}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* AI Result Block */}
                {(loading || result) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-1 text-purple-500">
                      <Bot size={16} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-center pr-2">
                        <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest italic">
                          Lumina_Intel_Stream
                        </p>
                        {result && (
                          <button
                            onClick={copyToClipboard}
                            className="text-slate-600 hover:text-white transition-all bg-white/5 p-1.5 rounded-md border border-white/5"
                          >
                            {copied ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        )}
                      </div>

                      {loading ? (
                        <div className="flex items-center gap-3 text-slate-700 font-mono text-[9px] italic tracking-widest">
                          <LoadingSpinner size={14} className="text-blue-500" />
                          COMPILING_NEURAL_MAP...
                        </div>
                      ) : (
                        <div className="prose prose-invert prose-blue max-w-none text-slate-300 text-lg leading-8 selection:bg-blue-600/20">
                          <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Footer - Neural Interface Bar (Fixed inside Main) */}
        <div className="absolute bottom-0 left-0 w-full px-4 pb-10 bg-gradient-to-t from-[#050609] via-[#050609] to-transparent shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#0d0f14] border border-white/5 rounded-[2rem] p-2 flex items-end gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-within:border-white/10 focus-within:ring-1 ring-blue-600/30 transition-all">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Transmit command..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 px-4 resize-none max-h-40 no-scrollbar placeholder:text-slate-800 leading-normal"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="mb-1 mr-1 p-3.5 bg-white hover:bg-blue-600 text-black hover:text-white rounded-2xl transition-all active:scale-90 disabled:opacity-5 shadow-lg"
              >
                {loading ? (
                  <LoadingSpinner size={18} />
                ) : (
                  <Send size={18} strokeWidth={3} />
                )}
              </button>
            </div>

            <div className="flex justify-center gap-8 mt-4 opacity-30">
              <div className="flex items-center gap-2 text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] italic">
                <Sparkles size={10} /> Sync: v2.5
              </div>
              <div className="flex items-center gap-2 text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] italic">
                <Zap size={10} /> Latency: 4ms
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        /* ব্রাউজারের মেইন স্ক্রলবার ভ্যানিশ */
        html,
        body {
          overflow: hidden !important;
          height: 100% !important;
          margin: 0;
          padding: 0;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// লোডিং আইকন এর জন্য
const LoadingSpinner = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </motion.svg>
);
