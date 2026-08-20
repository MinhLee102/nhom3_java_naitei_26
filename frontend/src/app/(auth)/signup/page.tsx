"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await apiClient.post("/auth/register", { name, email, password });
      const { token, refreshToken, user } = res.data;

      localStorage.setItem("access_token", token);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center -mt-4 mb-6">
        <h2 className="text-xl font-bold text-[#131b2e] mb-1">Create Account</h2>
        <p className="text-sm text-[#515f74]">
          Join FinTrack Pro to manage your personal finances today.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-lg p-8">
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#515f74] mb-1.5" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="block w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] text-[#131b2e] text-sm focus:bg-white focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#515f74] mb-1.5" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@fintrack.pro"
                className="block w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] text-[#131b2e] text-sm focus:bg-white focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#515f74] mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="block w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] text-[#131b2e] text-sm focus:bg-white focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-[#004ac6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004ac6] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center">
          <p className="text-xs text-[#515f74]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#004ac6] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}