"use client";
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useHasMounted } from "@/src/hooks/useHasMounted";

export default function DashboardHome() {
  const hasMounted = useHasMounted();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // সমাধান: সরাসরি setState না করে একটি ছোট ডিলে বা
    // মাইক্রোটাস্কের ভেতর রাখলে Cascading Render এরর আসে না।
    if (hasMounted) {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (savedUser.name) {
        // Use requestAnimationFrame or setTimeout to move the update
        // to the next tick
        const timeout = setTimeout(() => {
          setUserName(savedUser.name);
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [hasMounted]);

  // হাইড্রেশন এরর এড়াতে মাউন্ট না হওয়া পর্যন্ত কিছুই রেন্ডার করবেন না
  if (!hasMounted) return null;

  const stats = [
    {
      label: "Revenue",
      value: "$12,450",
      growth: "+12.5%",
      icon: <TrendingUp className="text-blue-500" />,
    },
    {
      label: "Active Users",
      value: "1,205",
      growth: "+3.2%",
      icon: <Users className="text-purple-500" />,
    },
    {
      label: "AI Generations",
      value: "45.2k",
      growth: "+18%",
      icon: <Zap className="text-amber-500" />,
    },
    {
      label: "System Health",
      value: "99.9%",
      growth: "Stable",
      icon: <ShieldCheck className="text-emerald-500" />,
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-6 overflow-hidden no-scrollbar">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome back, {userName}! 👋
          </h2>
          <p className="text-slate-500 font-medium">
            Here&apos;s your Lumina performance today.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 text-sm transition-all">
          Generate Report <ArrowUpRight size={18} />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-100 text-emerald-600">
                {stat.growth}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h4 className="text-2xl font-black">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Bento Grid Layout Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-black mb-4">Activity Overview</h3>
          <div className="w-full h-48 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 flex items-center justify-center">
            <p className="text-slate-400 text-sm font-bold italic">
              Chart Placeholder
            </p>
          </div>
        </div>
        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            Upgrade to Pro
          </h3>
          <p className="text-blue-100 text-sm opacity-80">
            Unlimited AI generations and advanced insights.
          </p>
          <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl active:scale-95 transition-all">
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );
}
