import Card from "@/components/ui/Card";

export default function AdminExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý chi tiêu</h1>
        <p className="text-sm text-gray-500 mt-1">Xem và quản lý chi tiêu của tất cả người dùng</p>
      </div>
      <Card>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Trang Quản lý chi tiêu (Admin) đang được xây dựng
        </div>
      </Card>
    </div>
  );
}
