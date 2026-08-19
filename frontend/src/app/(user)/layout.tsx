"use client";

import { useState } from "react";
import { Header, Sidebar, Footer } from "@/components/layout";

/**
 * User Layout — dùng cho khu vực client (người dùng cuối).
 * Bao gồm Header + Sidebar + nội dung chính + Footer.
 *
 * Lý do dùng Route Group (user):
 * - Tách biệt layout client khỏi admin, mỗi khu vực có sidebar/menu riêng.
 * - Route group không ảnh hưởng URL path: /dashboard, /expenses (không có /user/).
 */
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset bởi sidebar width trên desktop */}
      <main className="lg:ml-64 min-h-[calc(100vh-4rem-3.5rem)]">
        <div className="p-4 lg:p-6">{children}</div>
      </main>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
}
