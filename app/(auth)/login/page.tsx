"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import api from "@/src/lib/axios";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. রিকোয়েস্ট পাঠানোর আগে কোনো পুরনো গার্বেজ ডেটা থাকলে তা ক্লিয়ার করুন
      localStorage.clear();

      const res = await api.post("/api/auth/login", { email, password });

      // ২. ব্যাকএন্ড রেসপন্স স্ট্রাকচার চেক করুন
      // অনেক সময় ব্যাকএন্ড res.data.data এর ভেতরে টোকেন পাঠায়
      const data = res.data;

      if (data && data.token) {
        // ৩. টোকেন এবং ইউজার ডেটা আলাদাভাবে বা একত্রে সেভ করুন
        // আপনার Sidebar এবং useAuth 'user' কী-টি চেক করে, তাই এটি নিশ্চিত করুন
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || data));

        // ৪. সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট
        window.location.href = "/dashboard";
      } else {
        alert("Login failed: Invalid response from server");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      // ৫. আসল এরর মেসেজটি ডিবাগ করার জন্য কনসোলে দেখুন
      console.error(
        "Login Error Details:",
        error.response?.data || error.message,
      );

      const errorMessage =
        error.response?.data?.message ||
        "Network Error: Backend is not reachable.";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050609] p-4">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            LUMINA <span className="text-blue-600">LOGIN</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
            Welcome back to the future
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Neural Email ID"
            className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600/50 transition-all font-medium placeholder:text-slate-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Security Key"
            className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600/50 transition-all font-medium placeholder:text-slate-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying...
              </>
            ) : (
              "Login Now"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
          Unauthorized?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Register Neural Link
          </Link>
        </p>
      </div>
    </div>
  );
}
