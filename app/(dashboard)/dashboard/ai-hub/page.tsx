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
  MessageSquare,
  Sparkles,
  Terminal,
  Zap,
  User,
  Bot,
  ArrowRight,
  RefreshCcw,
  Plus,
} from "lucide-react";

export default function AIHubPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // অটো-স্ক্রল যখন নতুন রেজাল্ট আসবে
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [result]);

  // টেক্সটএরিয়া অটো-রিসাইজ
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setLastQuery(prompt); // প্রশ্নটি সেভ করে রাখা হচ্ছে
    setResult("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/ai/generate",
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setResult(res.data.result);
      setPrompt(""); // ইনপুট ক্লিয়ার করা
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setResult(
        "### ⚠️ Neural Link Failure\nUnable to process the request. Please check your connection.",
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

  const handleNewChat = () => {
    setPrompt("");
    setResult("");
    setLastQuery("");
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 flex flex-col font-sans">
      {/* Header / Top Navigation Bar */}
      <header className="border-b border-slate-800/50 bg-[#0a0c10]/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
              Lumina <span className="text-blue-600">AI</span>
            </h1>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs tracking-widest uppercase border-l border-slate-800/50 pl-6 h-8">
              <span className="w-10 h-[1px] bg-blue-600"></span>
              Neural Workspace v2.5
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              SYSTEMS:{" "}
              <span className="text-slate-300 font-bold italic">
                OPERATIONAL
              </span>
            </div>
            <button
              onClick={handleNewChat}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all shadow-md"
            >
              <Plus size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Feature Content Area */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-10 flex flex-col gap-10">
        {/* Dynamic Intelligence Stream / Output Area */}
        <section className="flex-1 bg-slate-950/40 border border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
          {/* Output Controls Bar */}
          <div className="px-8 py-5 border-b border-slate-800/50 flex justify-between items-center bg-slate-950 backdrop-blur-md sticky top-[73px] z-20 rounded-t-[3rem]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-500 font-black text-[10px] tracking-[0.3em] uppercase">
                Intelligence Stream
              </span>
            </div>
            {result && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white text-[10px] font-bold uppercase transition-all active:scale-95 shadow-sm"
              >
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}{" "}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>

          {/* Result Content (Messages) */}
          <div
            ref={scrollRef}
            className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar space-y-10 relative z-10 flex flex-col-reverse justify-end"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="space-y-6 pt-4 w-full">
                  <div className="flex gap-4 animate-pulse items-start">
                    <div className="w-10 h-10 bg-slate-800 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-3 mt-1">
                      <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                      <div className="h-10 bg-slate-800/50 rounded-2xl w-full"></div>
                    </div>
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10 w-full"
                >
                  {/* User Question Message Block */}
                  <div className="flex gap-4 group items-start">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20 mt-1">
                      <User size={20} className="text-white" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                        You Asked
                      </span>
                      <div className="text-xl font-bold text-white leading-tight italic bg-blue-600/5 p-5 rounded-2xl border border-blue-600/10">
                        {lastQuery}
                      </div>
                    </div>
                  </div>

                  {/* AI Response Message Block */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Bot size={20} className="text-purple-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">
                        Lumina Result
                      </span>
                      <div className="prose prose-invert prose-blue max-w-none bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
                        <ReactMarkdown>{result}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-24 w-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse"></div>
                    <Cpu size={80} className="text-slate-700 relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-black tracking-[0.5em] text-[10px] uppercase text-slate-600">
                      Neural Link Inactive
                    </p>
                    <p className="text-slate-800 text-sm font-medium">
                      Transmit a command via the Neural Interface below.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Pro Tip Callout Card */}
        <section className="bg-blue-600/5 border border-blue-600/10 p-6 rounded-[2.5rem] flex items-center gap-5 shadow-inner">
          <div className="p-3.5 bg-blue-600 rounded-2xl text-white shrink-0">
            <Sparkles size={24} />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-blue-400 font-bold uppercase tracking-widest">
              Lumina Pro Tip
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Try asking for complex code architecture, API design, gorgeous UI
              layouts, or debugging help. Lumina is optimized for developers and
              high-performance tasks. Use `Shift+Enter` for a new line.
            </p>
          </div>
          <Zap className="text-slate-800 shrink-0" size={36} />
        </section>
      </main>

      {/* Global Neural Interface (Input Container) */}
      <footer className="w-full bg-[#0a0c10]/90 backdrop-blur-xl border-t border-slate-800/50 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40">
        <div className="max-w-[1600px] mx-auto w-full bg-slate-900/80 border border-slate-800 rounded-[2.5rem] p-4 flex items-center gap-4 group transition-all focus-within:ring-2 focus-within:ring-blue-600/50">
          <div className="flex items-center gap-2 pl-3 text-blue-500 shrink-0">
            <Terminal size={18} />
          </div>

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
            placeholder="Ask Lumina to write something amazing..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none text-white text-base font-medium placeholder:text-slate-700 resize-none max-h-40 leading-normal py-1 custom-scrollbar"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="py-3 px-6 bg-white hover:bg-blue-600 text-black hover:text-white font-black rounded-xl transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 group/btn shrink-0 uppercase tracking-tighter"
          >
            {loading ? (
              <RefreshCcw className="animate-spin" size={18} />
            ) : (
              <>
                <Zap size={18} className="fill-current" />
                Generate Magic
              </>
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-700 font-mono mt-3 uppercase tracking-widest">
          Gemini is AI and can make mistakes. All responses are simulation
          results.
        </p>
      </footer>
    </div>
  );
}
