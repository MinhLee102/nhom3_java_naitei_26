import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ngân sách</h1>
          <p className="text-sm text-gray-500 mt-1">
            Thiết lập và theo dõi ngân sách theo danh mục
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Thêm ngân sách
        </Button>
      </div>

      <Card>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Trang Ngân sách đang được xây dựng — kết nối API để hiển thị danh sách.
        </div>
      </Card>
    </div>
  );
}
