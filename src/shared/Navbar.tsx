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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // পরে Auth Context থেকে ডাটা নিবেন
  const pathname = usePathname();

  // স্ক্রল হ্যান্ডলার
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
      icon: <LayoutDashboard size={14} />,
    },
    { name: "AI Hub", href: "/ai-generator", icon: <Sparkles size={14} /> },
    { name: "Analysis", href: "/data-analyzer", icon: <PieChart size={14} /> },
    { name: "History", href: "/history", icon: <History size={14} /> },
  ];

  const links = isLoggedIn ? authLinks : guestLinks;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-2xl border-b border-border shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* --- লোগো সেকশন --- */}
        <Link
          href="/"
          className="group relative flex items-center gap-2 shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
            <Zap size={18} className="text-primary-foreground fill-current" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-foreground uppercase italic">
            LUMINA<span className="text-primary">.</span>
          </span>
        </Link>

        {/* --- ডেস্কটপ মেনু (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center bg-card/50 px-2 py-1.5 rounded-full border border-border backdrop-blur-md">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                  isActive ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-background dark:bg-primary/10 rounded-full shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.icon && <span className="opacity-70">{link.icon}</span>}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- রাইট সাইড অ্যাকশনস --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="group relative px-5 sm:px-7 py-2.5 sm:py-3 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hidden xs:flex"
            >
              <span className="relative z-10 flex items-center gap-1">
                Sign In{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-2xl border-2 border-primary/30 p-0.5 cursor-pointer bg-gradient-to-tr from-primary to-purple-500 hidden xs:block"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Masum"
                alt="avatar"
                className="w-full h-full rounded-[12px] bg-card object-cover"
              />
            </motion.div>
          )}

          {/* মোবাইল মেনু টগল */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-card border border-border text-muted transition-colors hover:text-foreground"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* --- মোবাইল রেসপন্সিভ ড্রয়ার --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border overflow-hidden md:hidden shadow-2xl"
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
                    className="text-3xl font-black uppercase italic tracking-tighter text-muted hover:text-primary transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-primary/20 group-hover:text-primary transition-colors italic font-mono text-xl">
                        0{idx + 1}
                      </span>
                      {link.name}
                    </span>
                    <ChevronRight
                      size={24}
                      className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary"
                    />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-10 mt-4 border-t border-border flex justify-between items-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Lumina Interface <span className="text-primary">v2.5</span>
                </p>
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="text-xs font-black uppercase tracking-widest text-primary underline"
                  >
                    Sign In Now
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
