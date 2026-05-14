// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { motion } from "framer-motion";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="group relative inline-flex p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-all duration-300 active:scale-90"
//       aria-label="Toggle theme"
//     >
//       <div className="relative h-5 w-5 flex items-center justify-center overflow-hidden">
//         {/* Sun Icon */}
//         <Sun className="h-5 w-5 transition-all duration-500 ease-in-out scale-100 rotate-0 dark:scale-0 dark:rotate-90 text-amber-500" />

//         {/* Moon Icon */}
//         <Moon className="absolute h-5 w-5 transition-all duration-500 ease-in-out scale-0 -rotate-90 dark:scale-100 dark:rotate-0 text-blue-400" />
//       </div>

//       {/* Background Glow on Hover */}
//       <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
//     </button>
//   );
// }
//!
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex p-2.5 rounded-xl bg-accent/20 dark:bg-white/5 border border-border hover:border-blue-500/50 transition-all duration-500 active:scale-95 overflow-hidden shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <Moon className="h-5 w-5 text-blue-400 fill-blue-400/10" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <Sun className="h-5 w-5 text-amber-500 fill-amber-500/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  );
}
