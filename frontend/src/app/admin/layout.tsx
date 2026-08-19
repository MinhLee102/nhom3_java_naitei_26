"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, Shield, Wallet } from "lucide-react";
import { AdminSidebar } from "@/components/layout";
import Footer from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/lib/constants";

/**
 * Admin Layout — khu vực quản trị, thiết kế khác biệt rõ ràng so với User layout.
 * - Topbar có badge "Admin Panel" màu amber
 * - Sidebar dark theme để phân biệt rõ khi dev
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = ROUTES.LOGIN;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-gray-900 px-4 lg:px-6">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 rounded-lg p-2 text-gray-400 hover:bg-gray-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href={ROUTES.ADMIN_DASHBOARD}
          className="flex items-center gap-2 font-semibold text-white"
        >
          <Wallet className="h-6 w-6 text-amber-500" />
          <span className="text-lg">ExpenseApp</span>
        </Link>

        {/* Admin badge */}
        <div className="ml-4 flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1">
          <Shield className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-semibold text-amber-500">ADMIN</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden text-sm text-gray-300 sm:block">
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 min-h-[calc(100vh-4rem-3.5rem)]">
        <div className="p-4 lg:p-6">{children}</div>
      </main>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
}
