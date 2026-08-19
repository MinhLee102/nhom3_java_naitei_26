import Card from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo</h1>
        <p className="text-sm text-gray-500 mt-1">
          Xem báo cáo chi tiêu và thu nhập theo thời gian
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Báo cáo chi tiêu theo tháng">
          <div className="flex h-64 items-center justify-center text-gray-400">
            Biểu đồ sẽ hiển thị khi có dữ liệu từ API
          </div>
        </Card>
        <Card title="So sánh thu chi">
          <div className="flex h-64 items-center justify-center text-gray-400">
            Biểu đồ sẽ hiển thị khi có dữ liệu từ API
          </div>
        </Card>
      </div>
    </div>
  );
}
