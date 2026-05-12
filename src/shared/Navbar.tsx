"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  PieChart,
  History,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { NavLink } from "../types";
import { ThemeToggle } from "../components/themeProvider/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Connect to your Auth context later

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guestLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  const authLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { name: "AI Tools", href: "/ai-generator", icon: <Sparkles size={16} /> },
    { name: "Analysis", href: "/data-analyzer", icon: <PieChart size={16} /> },
    { name: "History", href: "/history", icon: <History size={16} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={16} /> },
    { name: "Support", href: "/support", icon: <LifeBuoy size={16} /> },
  ];

  const links = isLoggedIn ? authLinks : guestLinks;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400"
        >
          LUMINA<span className="text-slate-400">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              {isLoggedIn && link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              Sign In
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5 cursor-pointer">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Masum"
                alt="avatar"
                className="rounded-full bg-slate-100"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
