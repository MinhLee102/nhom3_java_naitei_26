import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PiggyBank,
} from "lucide-react";
import { StatCard } from "@/components/shared";
import Card from "@/components/ui/Card";

/**
 * Dashboard — trang tổng quan cho người dùng.
 * Hiện tại là placeholder, sẽ hiển thị biểu đồ và số liệu khi backend sẵn sàng.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tổng quan chi tiêu và thu nhập của bạn
        </p>
      </div>

      {/* Stat cards — placeholder data */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng chi tiêu"
          value="0 ₫"
          icon={Receipt}
        />
        <StatCard
          title="Tổng thu nhập"
          value="0 ₫"
          icon={Wallet}
        />
        <StatCard
          title="Số dư"
          value="0 ₫"
          icon={PiggyBank}
        />
        <StatCard
          title="Danh mục"
          value="0"
          icon={LayoutDashboard}
        />
      </div>

      {/* Chart placeholder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Chi tiêu theo tháng">
          <div className="flex h-64 items-center justify-center text-gray-400">
            Biểu đồ sẽ hiển thị khi có dữ liệu từ API
          </div>
        </Card>
        <Card title="Chi tiêu theo danh mục">
          <div className="flex h-64 items-center justify-center text-gray-400">
            Biểu đồ sẽ hiển thị khi có dữ liệu từ API
          </div>
        </Card>
      </div>
    </div>
  );
}
