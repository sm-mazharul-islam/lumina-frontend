import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/src/components/themeProvider/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumina AI | Premium SaaS Content & Analysis Engine",
    template: "%s | Lumina AI",
  },
  description:
    "Lumina is a next-generation AI platform featuring modern Bento-grid interfaces, role-based dashboards, and high-performance AI content generation.",
  metadataBase: new URL("https://lumina-ai.vercel.app"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#050609] text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false} // ট্রানজিশন স্মুথ করার জন্য এটি false রাখা হয়েছে
        >
          {/* --- ব্যাকগ্রাউন্ড লেয়ার (ফ্লুইড গ্লো ইফেক্ট) --- */}
          <div className="fixed inset-0 -z-50 h-full w-full pointer-events-none overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#050609]">
            {/* গ্রেডিয়েন্ট ওভারলে - যা থিমের সাথে চেঞ্জ হবে */}
            <div className="absolute inset-0 opacity-40 dark:opacity-100 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 dark:from-[#050609] dark:via-[#050609] dark:to-blue-900/20 transition-all duration-700" />

            {/* মেইন গ্লো স্পট - লাইট মোডে খুব হালকা, ডার্ক মোডে গর্জিয়াস */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] dark:blur-[160px] rounded-full transition-all duration-700" />

            {/* সেকেন্ডারি গ্লো - কোণার দিকে */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-400/5 dark:bg-purple-600/5 blur-[100px] rounded-full" />
          </div>

          <div className="relative flex flex-col min-h-screen">
            {/* নাভবার */}

            {/* মেইন কন্টেন্ট এলাকা */}
            <main className="flex-grow pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
