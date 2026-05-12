"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-blue-500/50 transition-all duration-300 active:scale-95"
      aria-label="Toggle theme"
    >
      {/* Both icons are rendered, but CSS handles the switch */}
      <Sun className="h-5 w-5 transition-all scale-100 dark:scale-0 dark:-rotate-90 text-amber-500" />
      <Moon className="absolute h-5 w-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 text-blue-400" />
    </button>
  );
}
