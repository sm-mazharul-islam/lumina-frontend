"use client";
import { useState } from "react";
import api from "@/src/lib/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (
    e?: React.FormEvent,
    demoEmail?: string,
    demoPass?: string,
  ) => {
    if (e) e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email: demoEmail || email,
        password: demoPass || password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect based on role (Requirement: Role-Based Dashboard)
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-center mb-8">
          Login to your Lumina account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">Demo Access</span>
          </div>
        </div>

        {/* Mandatory Demo Login Button */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() =>
              handleLogin(undefined, "admin@lumina.com", "admin123")
            }
            className="p-2 text-xs border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin(undefined, "user@lumina.com", "user123")}
            className="p-2 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition"
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
}
