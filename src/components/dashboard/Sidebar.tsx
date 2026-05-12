"use client";
import React, { useState } from "react";
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
  ChevronLeft,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [userRole] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      return savedUser.role || "User";
    }
    return "User";
  });

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      roles: ["Admin", "User"],
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <Users size={20} />,
      roles: ["Admin"],
    },
    {
      name: "AI Tools",
      href: "/dashboard/tools",
      icon: <Sparkles size={20} />,
      roles: ["User", "Admin"],
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

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col overflow-hidden no-scrollbar">
      {/* Branding & Role */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">
          LUMINA.
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {userRole} Mode
          </p>
        </div>
      </div>

      {/* Back to Home Option */}
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
            <Home size={14} />
          </div>
          Back to Website
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {filteredMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              pathname === item.href
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto pt-6 space-y-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all"
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
