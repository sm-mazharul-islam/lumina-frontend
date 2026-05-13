"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Zap,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("User");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cascading render এড়াতে এবং ব্রাউজার পেইন্ট হওয়ার পর মাউন্ট করতে requestAnimationFrame ব্যবহার করা হয়েছে
    const handleMount = () => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUserRole(savedUser.role || "User");
      }
    };

    const frameId = requestAnimationFrame(handleMount);
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
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // হাইড্রেশন এরর এড়াতে মাউন্ট হওয়ার আগ পর্যন্ত কন্টেন্ট রেন্ডার হবে না
  if (!mounted) {
    return (
      <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800" />
    );
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col overflow-hidden">
      {/* Branding Section */}
      <div className="mb-10 px-2">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/30">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            LUMINA<span className="text-blue-600">.</span>
          </h1>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-slate-100 dark:bg-blue-900/10 w-fit px-3 py-1.5 rounded-full border border-slate-200 dark:border-blue-900/30">
          {userRole === "Admin" ? (
            <ShieldCheck size={12} className="text-blue-500" />
          ) : (
            <UserIcon size={12} className="text-blue-500" />
          )}
          <p className="text-[10px] font-black text-slate-500 dark:text-blue-400 uppercase tracking-widest">
            {userRole} MODE
          </p>
        </div>
      </div>

      <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        Intelligence Core
      </p>

      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 group relative ${
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/25 translate-x-1"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span
                className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"} transition-colors`}
              >
                {item.icon}
              </span>
              <span className="tracking-tight">{item.name}</span>

              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 space-y-3 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-xs font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-tighter group"
        >
          <Home
            size={16}
            className="group-hover:scale-110 transition-transform"
          />
          <span>Exit to Website</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-red-500 font-black text-sm hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30 group"
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="tracking-tight italic uppercase">
            Terminate Session
          </span>
        </button>
      </div>
    </aside>
  );
}
