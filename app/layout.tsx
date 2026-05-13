import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/themeProvider/ThemeProvider";

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
  // ... বাকি মেটাডাটা
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background Layer */}
          <div className="fixed inset-0 -z-50 h-full w-full pointer-events-none overflow-hidden bg-white dark:bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/40 via-transparent to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-blue-900/10 transition-colors duration-500" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-blue-500/10 blur-[140px] dark:bg-blue-600/5 rounded-full" />
          </div>

          <div className="relative flex flex-col min-h-screen">
            <main className="flex-grow pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
