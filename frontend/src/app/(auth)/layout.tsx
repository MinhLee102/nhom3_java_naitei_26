import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 font-sans">
      <main className="w-full max-w-110">
        {/* Logo Header */}
        <div className="mb-7 text-center">
          <div className="inline-flex items-center justify-center gap-2.5 mb-4">
            {/* Logo chiếc ví FinTrack Pro */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-700 to-blue-600 text-white shadow-md shadow-blue-700/25">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Viền ngoài ví */}
                <rect x="2" y="5" width="20" height="15" rx="3" />
                {/* Miệng nắp ví */}
                <path d="M2 9h20" />
                {/* Khóa ví */}
                <rect x="14" y="11" width="6" height="5" rx="1.5" fill="currentColor" />
                <circle cx="16.5" cy="13.5" r="0.75" className="fill-blue-700" />
              </svg>
            </div>

            <h1 className="m-0 text-2xl font-bold tracking-tight text-blue-700">
              FinTrack Pro
            </h1>
          </div>
        </div>

        {/* Nội dung form các trang (Login, Signup, Forgot Password,...) */}
        {children}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="m-0 text-xs text-slate-400">
            © 2026 FinTrack Pro. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}