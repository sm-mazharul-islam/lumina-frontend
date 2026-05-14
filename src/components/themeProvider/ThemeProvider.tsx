"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// ১. নতুন ইন্টারফেস তৈরি করুন যা আপনার পাঠানো প্রপসগুলো গ্রহণ করতে পারে
interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string; // ঐচ্ছিক প্রপস হিসেবে রাখুন
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const ThemeProvider = ({
  children,
  defaultTheme = "dark", // ডিফল্ট থিম সেট করে দিন
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme") || defaultTheme;

      if (savedTheme !== theme) {
        setTheme(savedTheme);
      }

      document.documentElement.classList.toggle("dark", savedTheme === "dark");

      requestAnimationFrame(() => {
        setMounted(true);
      });
    };

    initializeTheme();
  }, [defaultTheme, theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
