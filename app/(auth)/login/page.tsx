"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios"; // Axios error type import
import api from "@/src/lib/axios";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      // TypeScript safety for errors
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Lumina Login
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1 italic">
            Welcome back to the future.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600 transition-all font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-white outline-none focus:ring-2 ring-blue-600 transition-all font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "CHECKING..." : "LOGIN NOW"}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-bold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
