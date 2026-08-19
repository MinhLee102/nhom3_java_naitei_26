import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

/**
 * Trang danh sách Chi tiêu.
 * TODO: Kết nối API, thêm bảng dữ liệu, filter, và pagination.
 */
export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiêu</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các khoản chi tiêu của bạn
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Thêm chi tiêu
        </Button>
      </div>

      <Card>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Trang Chi tiêu đang được xây dựng — kết nối API để hiển thị danh sách.
        </div>
      </Card>
    </div>
  );
}
