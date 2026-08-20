import React from "react";

/**
 * Auth Layout — tối giản, không header/sidebar.
 * Nhúng Material Symbols và style giao diện khung cho toàn bộ luồng Auth.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional");`}</style>

      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
        <main className="w-full max-w-105">
          {/* Logo Header chung cho Auth */}
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#004ac6] to-[#2563eb] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                <span className="material-symbols-outlined text-[26px]">
                  account_balance_wallet
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#004ac6] tracking-tight">
                FinTrack Pro
              </h1>
            </div>
          </div>

          {children}

          {/* Footer*/}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              © 2026 FinTrack Pro. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}