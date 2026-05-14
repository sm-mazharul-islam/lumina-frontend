"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/images/logo.png";
import {
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  History,
  ChevronRight,
  Zap,
  LogOut,
  UserPlus,
  LogIn,
  Settings,
  Mail,
} from "lucide-react";
import { ThemeToggle } from "../components/themeProvider/ThemeToggle";
import Image from "next/image";

type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null); // ইউজার ডাটা স্টেট
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const savedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (token) {
      const timeoutId = setTimeout(() => {
        setIsLoggedIn(true);
        if (savedUser) {
          try {
            setUserData(JSON.parse(savedUser));
          } catch (e) {
            console.error("Error parsing user data");
          }
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setUserData(null);
    window.location.href = "/login";
  };

  const guestLinks: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "/about" },
  ];

  const authLinks: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={14} />,
    },
    { name: "AI Hub", href: "/dashboard/ai-hub", icon: <Sparkles size={14} /> },
    // {
    //   name: "History",
    //   href: "/dashboard/history",
    //   icon: <History size={14} />,
    // },
  ];

  const links = isLoggedIn ? authLinks : guestLinks;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled || mobileMenuOpen
          ? "py-3 bg-background/70 backdrop-blur-2xl border-b border-border shadow-2xl"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* --- Logo --- */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
            <Image src={logo} width={80} height={40} alt="" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-foreground uppercase italic leading-none">
            LUMINA<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center bg-accent/30 px-2 py-1.5 rounded-full border border-border backdrop-blur-md">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 
                  ${isActive ? "text-blue-500" : "text-muted-foreground hover:text-foreground"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-600/10 rounded-full border border-blue-500/20 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div
            className="hidden md:flex items-center gap-3 relative"
            ref={dropdownRef}
          >
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg active:scale-95"
              >
                Sign In
              </Link>
            ) : (
              <>
                <motion.div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl border border-border p-0.5 cursor-pointer bg-gradient-to-tr from-blue-600 to-indigo-600 overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name || "Lumina User"}`}
                    alt="avatar"
                    className="w-full h-full rounded-[10px] bg-background object-cover"
                  />
                </motion.div>

                {/* --- Premium Dropdown Menu --- */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-full right-0 mt-4 w-64 bg-background/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-2 overflow-hidden"
                    >
                      {/* User Gmail & Name Section */}
                      <div className="px-4 py-4 border-b border-border mb-1 bg-accent/20">
                        <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] italic mb-1">
                          Authorized Node
                        </p>
                        <p className="text-sm font-black text-foreground truncate uppercase tracking-tighter">
                          {userData?.name || "Lumina User"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                          <Mail size={12} className="shrink-0" />
                          <p className="text-[11px] font-medium truncate lowercase italic">
                            {userData?.email || "neural.link@lumina.ai"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-2xl transition-all group"
                      >
                        <Settings
                          size={16}
                          className="group-hover:rotate-45 transition-transform"
                        />
                        Account Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-destructive hover:bg-destructive/10 rounded-2xl transition-all group"
                      >
                        <LogOut
                          size={16}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        Terminate Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-accent/50 border border-border text-foreground/50 active:scale-90 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Full-Blur Drawer --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full h-screen bg-background/80 backdrop-blur-[50px] border-b border-border md:hidden overflow-y-auto"
          >
            <div className="px-8 py-12 flex flex-col gap-8 h-full pb-40">
              {isLoggedIn && (
                <div className="flex flex-col p-6 bg-accent/30 rounded-[2.5rem] border border-border shadow-2xl space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl border border-blue-500/30 p-0.5 bg-gradient-to-tr from-blue-600 to-purple-500">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name || "Masum"}`}
                        alt="user"
                        className="w-full h-full rounded-2xl bg-background"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">
                        Active Node
                      </p>
                      <p className="text-xl font-black text-foreground italic tracking-tighter uppercase leading-none truncate max-w-[150px]">
                        {userData?.name || "Masum"}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic flex items-center gap-2">
                      <Mail size={12} />{" "}
                      {userData?.email || "neural.link@lumina.ai"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-black uppercase italic tracking-tighter text-muted-foreground hover:text-blue-500 transition-all flex items-center justify-between group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={24} className="text-blue-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-border space-y-6">
                {!isLoggedIn ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 p-5 bg-accent border border-border rounded-2xl text-xs font-black uppercase tracking-widest text-foreground italic"
                    >
                      <LogIn size={16} /> Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 p-5 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white italic shadow-lg"
                    >
                      <UserPlus size={16} /> Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-5 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-black uppercase tracking-widest italic active:scale-95 transition-all"
                  >
                    <LogOut size={18} /> Terminate Session
                  </button>
                )}
                <div className="text-center opacity-10 pointer-events-none">
                  <p className="text-[9px] font-black uppercase tracking-[0.6em] text-foreground italic">
                    Neural_Interface_v2.5
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
