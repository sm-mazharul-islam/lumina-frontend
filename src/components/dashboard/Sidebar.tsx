"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("User");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু কন্ট্রোল

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

  // মেনু আইটেম
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
    {
      name: "User Management",
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
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
      roles: ["Admin", "User"],
    },
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
      {/* --- মোবাইল মেনু বাটন (শুধুমাত্র মোবাইলে দেখাবে) --- */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg active:scale-90 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* --- মোবাইল ওভারলে (সাইডবার খুললে ব্যাকগ্রাউন্ড ঝাপসা হবে) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- মেইন সাইডবার --- */}
      <aside
        className={`fixed lg:static top-0 left-0 z-[55] w-64 h-screen bg-[#050609] border-r border-white/5 p-6 flex flex-col shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Branding */}
        <div className="mb-10 px-2 flex items-center gap-3 shrink-0">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
            LUMINA<span className="text-blue-600">.</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // মোবাইলে ক্লিক করলে মেনু বন্ধ হবে
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/25"
                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Action Area */}
        <div className="mt-auto pt-6 shrink-0 border-t border-white/5">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 px-4 py-3 text-slate-500 hover:text-white transition-all group"
            >
              <Home
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Exit to Website
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
            >
              <div className="relative flex items-center justify-center">
                <LogOut
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border-2 border-[#050609]" />
              </div>
              <span className="text-[11px] font-black uppercase italic tracking-tighter">
                Terminate Session
              </span>
            </button>
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
