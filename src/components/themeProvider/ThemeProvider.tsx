"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // ১. requestAnimationFrame ব্যবহার করে স্টেট আপডেটকে পরবর্তী ফ্রেম-এ পাঠানো হয়েছে।
    // এটি 'Cascading Render' এবং 'Script Tag' এরর দুটোই ফিক্স করে।
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // ২. হাইড্রেশন শেষ না হওয়া পর্যন্ত কন্টেন্ট রেন্ডার করা থেকে বিরত থাকে।
  // তবে Children গুলোকে একটি wrapper এ রাখা হয়েছে যাতে Layout শিফট না হয়।
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }} aria-hidden="true">
        {children}
      </div>
    );
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
