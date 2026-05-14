"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      } else {
        requestAnimationFrame(() => {
          setLoading(false);
        });
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050609]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Validating Neural Signature...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
