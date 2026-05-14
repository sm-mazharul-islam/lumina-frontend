"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  PieChart,
  History,
  ChevronRight,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "../components/themeProvider/ThemeToggle";

// ১. টাইপ ডিফাইন করা
type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth Context এর জন্য
  const pathname = usePathname();

  // স্ক্রল হ্যান্ডলার: ২০ পিক্সেলের বেশি স্ক্রল করলে গ্লাস ইফেক্ট আসবে
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guestLinks: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  const authLinks: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { name: "AI Hub", href: "/ai-generator", icon: <Sparkles size={16} /> },
    { name: "Analysis", href: "/data-analyzer", icon: <PieChart size={16} /> },
    { name: "History", href: "/history", icon: <History size={16} /> },
  ];

  const links = isLoggedIn ? authLinks : guestLinks;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-white/70 dark:bg-[#050609]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* --- ১. লোগো --- */}
        <Link href="/" className="group relative flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/20">
            <Zap size={20} className="text-white fill-current" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            LUMINA<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* --- ২. ডেস্কটপ নেভিগেশন (hidden on mobile) --- */}
        <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-white/5 px-2 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.icon && <span className="opacity-70">{link.icon}</span>}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- ৩. ডান পাশের বাটন ও অ্যাকশনস --- */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xs:block">
            <ThemeToggle />
          </div>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="group relative px-5 sm:px-7 py-2.5 sm:py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-1">
                Sign In{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-2xl border-2 border-blue-500/30 p-0.5 cursor-pointer bg-gradient-to-tr from-blue-500 to-purple-500"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Masum"
                alt="avatar"
                className="w-full h-full rounded-[12px] bg-slate-900 object-cover"
              />
            </motion.div>
          )}

          {/* মোবাইল মেনু টগল (শুধুমাত্র ছোট স্ক্রিনে দৃশ্যমান) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- ৪. মোবাইল ড্রয়ার মেনু --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="absolute top-full left-0 w-full bg-white dark:bg-[#050609] border-b border-white/10 overflow-hidden md:hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          >
            <div className="px-6 py-12 flex flex-col gap-8">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase italic tracking-tighter text-slate-400 hover:text-blue-600 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-blue-500/20 group-hover:text-blue-500 transition-colors">
                        0{idx + 1}
                      </span>
                      {link.name}
                    </span>
                    <ChevronRight
                      size={24}
                      className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-blue-600"
                    />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-10 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="xs:hidden">
                    <ThemeToggle />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Lumina Neural Interface{" "}
                    <span className="text-blue-600">v2.5</span>
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <History size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <PieChart size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
