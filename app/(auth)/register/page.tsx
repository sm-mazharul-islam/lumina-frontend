"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import api from "@/src/lib/axios";
import { Loader2 } from "lucide-react";
import Navbar from "@/src/shared/Navbar";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/auth/register", formData);
      alert("Neural Registration Successful! Proceeding to entry.");
      router.push("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Neural link timeout.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex mt-20 items-center justify-center  p-4">
        <div className="w-full max-w-md bg-[#050609] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
          {/* Header - Styled after Login Page */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              LUMINA <span className="text-blue-600">REGISTER</span>
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
              Initialize your neural presence
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Neural Full Name"
              className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600/50 transition-all font-medium placeholder:text-slate-600"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Neural Email ID"
              className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600/50 transition-all font-medium placeholder:text-slate-600"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Security Key"
              className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600/50 transition-all font-medium placeholder:text-slate-600"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
                  Initializing...
                </>
              ) : (
                "Initialize Sign Up"
              )}
            </button>
          </form>

          {/* Footer Link - Styled after Login Page */}
          <p className="mt-8 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
            Already part of the net?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 transition-colors italic underline decoration-blue-600/30 underline-offset-4"
            >
              Login Neural Link
            </Link>
          </p>
        </div>
      </div>
      <p className="text-center">
        <Link href="/">Back Home</Link>
      </p>
    </>
  );
}
