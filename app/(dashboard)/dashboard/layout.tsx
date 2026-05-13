"use client";

import Sidebar from "@/src/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 'fixed inset-0' পুরো লেআউটকে ব্রাউজারের সাথে লক করে দিবে
    <div className="fixed inset-0 h-screen w-full flex overflow-hidden bg-[#050609]">
      {/* বাম দিকের সাইডবার - এটি ফিক্সড থাকবে */}
      <div className="h-full shrink-0 z-50">
        <Sidebar />
      </div>

      {/* ডান দিকের কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* মেইন কন্টেন্ট - শুধুমাত্র এই অংশটি স্ক্রল করবে */}
        <main className="flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth relative">
          <div className="max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* গ্লোবাল সিএসএস - ব্রাউজারের সব ডিফল্ট স্ক্রলবার বন্ধ করার জন্য */}
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
  );
}
