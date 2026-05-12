"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useHasMounted } from "@/src/hooks/useHasMounted";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const hasMounted = useHasMounted();

  /**
   * হাইড্রেশন এরর এবং স্ক্রিপ্ট ট্যাগ এরর এড়াতে:
   * ক্লায়েন্ট সাইডে মাউন্ট হওয়ার আগ পর্যন্ত থিম প্রোভাইডার রেন্ডার হবে না।
   * এর ফলে সার্ভার এবং ক্লায়েন্টের আউটপুট প্রথম রেন্ডারে একই থাকবে।
   */
  if (!hasMounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
