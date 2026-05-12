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

// Top-Class SEO Metadata

export const metadata: Metadata = {
  title: {
    default: "Lumina AI | Premium SaaS Content & Analysis Engine",

    template: "%s | Lumina AI",
  },

  description:
    "Lumina is a next-generation AI platform featuring modern Bento-grid interfaces, role-based dashboards, and high-performance AI content generation.",

  keywords: [
    "AI SaaS",

    "Content Generation",

    "Data Analysis",

    "Next.js 15",

    "MERN Stack",

    "Bento Grid",
  ],

  authors: [{ name: "S M Mazharul Islam Masum" }],

  creator: "S M Mazharul Islam Masum",

  metadataBase: new URL("https://lumina-ai.vercel.app"),

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://lumina-ai.vercel.app",

    title: "Lumina AI - Premium SaaS Intelligence",

    description:
      "Elevate your workflow with modern AI tools and gorgeous data insights.",

    siteName: "Lumina AI",
  },

  twitter: {
    card: "summary_large_image",

    title: "Lumina AI",

    description: "Premium AI SaaS Platform",

    creator: "@masum_dev",
  },

  icons: {
    icon: "/favicon.ico",
  },
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
          {/* FIX: Enhanced Global Background Gradient

              Changed 'via-white' to 'dark:via-slate-950' and added smooth transitions.

              This ensures the sides and corners match your theme perfectly.

          */}

          <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-white to-purple-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-blue-900/20 transition-colors duration-500" />

            {/* Dynamic Light/Dark Glow */}

            <div className="absolute top-0 left-0 right-0 h-[500px] bg-blue-500/10 blur-[120px] dark:bg-blue-600/5 rounded-full transition-opacity duration-500" />
          </div>

          <div className="relative flex flex-col min-h-screen">
            {/* Persistent Navbar */}

            {/* Main Content Area */}

            <main className="flex-grow pt-16">{children}</main>

            {/* Persistent Footer */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
