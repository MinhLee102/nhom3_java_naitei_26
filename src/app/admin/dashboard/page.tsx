import { StatCard } from "@/components/shared";
import Card from "@/components/ui/Card";
import { Users, Receipt, Wallet, Tag } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tổng quan hệ thống quản lý chi tiêu
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tổng người dùng" value="0" icon={Users} />
        <StatCard title="Tổng chi tiêu" value="0 ₫" icon={Receipt} />
        <StatCard title="Tổng thu nhập" value="0 ₫" icon={Wallet} />
        <StatCard title="Danh mục" value="0" icon={Tag} />
      </div>

      <Card title="Hoạt động gần đây">
        <div className="flex h-64 items-center justify-center text-gray-400">
          Dữ liệu hoạt động sẽ hiển thị khi kết nối API
        </div>
      </Card>
    </div>
  );
}
