"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import api from "@/src/lib/axios";

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

      alert("Registration Successful! Please login.");
      router.push("/login");
    } catch (err: unknown) {
      // TypeScript safety for axios errors
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || "Registration failed. Try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Create Account
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1 italic">
            Join Lumina AI and start building.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600 transition-all placeholder:text-slate-500 font-medium"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600 transition-all placeholder:text-slate-500 font-medium"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full p-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600 transition-all placeholder:text-slate-500 font-medium"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className="w-full p-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 tracking-widest mt-2"
          >
            {loading ? "CREATING ACCOUNT..." : "SIGN UP NOW"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-slate-500 text-sm font-bold">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors underline decoration-2 underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
