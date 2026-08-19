"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useBudgetTemplates } from "@/features/budget-template/hooks";

export default function AdminBudgetTemplatesPage() {
  const { data: templates, isLoading, isError } = useBudgetTemplates();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Templates</h1>
          <p className="mt-1 text-sm text-gray-500">Quản lý các mẫu ngân sách cho người dùng</p>
        </div>
        <Link href="/admin/budget-templates/new">
          <Button>
            <Plus className="h-4 w-4" />
            Create Budget Template
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingState />}

      {isError && (
        <Card>
          <div className="flex min-h-48 items-center justify-center text-sm text-red-600">
            Không thể tải danh sách mẫu ngân sách.
          </div>
        </Card>
      )}

      {!isLoading && !isError && templates?.length === 0 && (
        <Card>
          <div className="flex min-h-48 items-center justify-center text-sm text-gray-500">
            Chưa có mẫu ngân sách nào.
          </div>
        </Card>
      )}

      {!isLoading && !isError && templates && templates.length > 0 && (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Warning
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Details
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {templates.map((template) => (
                  <tr key={template.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                      {template.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      Tháng {template.month}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge variant="warning">{template.warningPercentage}%</Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      {template.details.length} danh mục
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/budget-templates/${template.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            title={`Edit ${template.name}`}
                            aria-label={`Edit ${template.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled
                          title="Delete will be available in a later commit"
                          aria-label={`Delete ${template.name}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <Card>
      <div className="animate-pulse space-y-3">
        <div className="h-10 rounded bg-gray-200" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-12 rounded bg-gray-100" />
        ))}
      </div>
    </Card>
  );
}
