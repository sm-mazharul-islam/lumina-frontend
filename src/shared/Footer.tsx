"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Features", href: "#features" },
      { name: "AI Engine", href: "/ai-generator" },
      { name: "Data Analysis", href: "/data-analyzer" },
      { name: "Security", href: "/security" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <Link
            href="/"
            className="text-2xl font-black text-blue-600 mb-6 block"
          >
            LUMINA<span className="text-slate-400">.</span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
            Building the next generation of AI-driven business tools with
            premium aesthetics and top-tier performance.
          </p>
          <div className="flex gap-4">
            <div className="flex gap-4">
              {/* GitHub */}
              <Link
                href="https://github.com"
                target="_blank"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>

              {/* X / Twitter */}
              <Link
                href="https://x.com"
                target="_blank"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298L17.61 20.643z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">
            Platform
          </h4>
          <ul className="space-y-4 text-sm">
            {footerLinks.platform.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">
            Company
          </h4>
          <ul className="space-y-4 text-sm">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-blue-600" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-blue-600" />
              <span>support@lumina.ai</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-blue-600" />
              <span>+880 1XXX XXXXXX</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest">
        <p>© {currentYear} LUMINA AI. DESIGNED FOR PERFORMANCE.</p>
        <p>Built with Next.js 15 & TypeScript</p>
      </div>
    </footer>
  );
}
