import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function AdminBudgetTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mẫu ngân sách</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý các mẫu ngân sách cho người dùng</p>
        </div>
        <Button><Plus className="h-4 w-4" />Thêm mẫu</Button>
      </div>
      <Card>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Trang Mẫu ngân sách đang được xây dựng
        </div>
      </Card>
    </div>
  );
}
