"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../public/images/logo.png";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Zap,
  Menu,
  X,
  History,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("User");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUserRole(savedUser.role || "User");
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      roles: ["Admin", "User"],
    },
    {
      name: "AI Hub",
      href: "/dashboard/ai-hub",
      icon: <Sparkles size={20} />,
      roles: ["User", "Admin"],
    },
    // {
    //   name: "History",
    //   href: "/dashboard/history",
    //   icon: <History size={20} />,
    //   roles: ["User", "Admin"],
    // },
    {
      name: "User Control",
      href: "/dashboard/users",
      icon: <Users size={20} />,
      roles: ["Admin"],
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 size={20} />,
      roles: ["Admin"],
    },
    // {
    //   name: "Settings",
    //   href: "/dashboard/settings",
    //   icon: <Settings size={20} />,
    //   roles: ["Admin", "User"],
    // },
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole),
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!mounted) return null;

  return (
    <>
      {/* --- মোবাইল নেভিগেশন বার (মেনু বাটন ডানপাশে) --- */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between z-[60]">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-blue-600 fill-blue-600" />
        </div>

        {/* মেনু বাটন ডানপাশে (End) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-blue-600/10 border border-blue-600/20 text-blue-500 rounded-xl transition-all active:scale-90"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* --- মোবাইল ব্যাকড্রপ ওভারলে --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- মেইন ওবসিডিয়ান সাইডবার --- */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-[55] w-72 h-screen border-r border-white/5 p-6 flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Ambient Glow Effect (Top) */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-600/5 blur-[80px] pointer-events-none" />

        {/* Branding Area */}
        <div className="pt-8 pb-10 px-2 shrink-0 relative z-10">
          <div>
            <Link href="/">
              <Image
                src={logo}
                width={80}
                height={30}
                alt="Lumina Logo"
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex flex-col">
            {/* <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
              LUMINA<span className="text-blue-500">.</span>
            </h1> */}
            <span className="text-[9px] font-bold text-blue-500/50 uppercase tracking-[0.3em] mt-1">
              Neural Interface
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar relative z-10">
          <div className="px-4 mb-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            Command_Center
          </div>
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="relative group block"
              >
                <div
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all duration-300 ${
                    isActive
                      ? "text-white bg-blue-600/10"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-1/4 w-1 h-1/2 bg-blue-500 rounded-full"
                    />
                  )}
                  <span
                    className={`${isActive ? "text-blue-500" : "group-hover:text-blue-400"} transition-colors`}
                  >
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout Section */}
        <div className="mt-auto pt-6 shrink-0 border-t border-white/5 relative z-10">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 mb-4">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-black italic border border-blue-600/30">
                {userRole[0]}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-white italic leading-none truncate">
                  {userRole} Node
                </span>
                <span className="text-[9px] font-bold text-green-500 mt-1 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  Synchronized
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2 text-white/30 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest group"
              >
                <Home
                  size={16}
                  className="group-hover:text-blue-500 transition-colors"
                />
                Exit to Web
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
              >
                <LogOut
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-[11px] font-black uppercase italic tracking-tighter">
                  Terminate_Session
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
