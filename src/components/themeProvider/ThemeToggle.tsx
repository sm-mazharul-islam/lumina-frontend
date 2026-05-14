"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative inline-flex p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-all duration-300 active:scale-90"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun className="h-5 w-5 transition-all duration-500 ease-in-out scale-100 rotate-0 dark:scale-0 dark:rotate-90 text-amber-500" />

        {/* Moon Icon */}
        <Moon className="absolute h-5 w-5 transition-all duration-500 ease-in-out scale-0 -rotate-90 dark:scale-100 dark:rotate-0 text-blue-400" />
      </div>

      {/* Background Glow on Hover */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
    </button>
  );
}
