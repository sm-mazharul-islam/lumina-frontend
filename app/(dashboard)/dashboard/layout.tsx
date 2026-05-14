"use client";

import AuthGuard from "@/src/components/auth/AuthGuard";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="fixed inset-0 h-screen w-full flex overflow-hidden bg-[#050609]">
        <div className="h-full shrink-0 z-50">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
          <main className="flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth relative">
            <div className="max-w-[1600px] mx-auto w-full p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>

        <style jsx global>{`
          html,
          body {
            overflow: hidden !important;
            height: 100% !important;
            margin: 0;
            padding: 0;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
