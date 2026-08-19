import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

/**
 * Trang chi tiết Chi tiêu.
 * TODO: Fetch dữ liệu theo ID, hiển thị form chỉnh sửa.
 */
export default async function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={ROUTES.EXPENSES}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết chi tiêu
          </h1>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      </div>

      <Card>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Trang chi tiết đang được xây dựng — kết nối API để hiển thị dữ liệu.
        </div>
      </Card>
    </div>
  );
}
