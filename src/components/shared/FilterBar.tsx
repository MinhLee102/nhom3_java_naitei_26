"use client";

import { ReactNode } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Search, RotateCcw } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  onReset?: () => void;
  extra?: ReactNode;
}

/**
 * FilterBar — thanh tìm kiếm + bộ lọc dùng chung cho các trang danh sách.
 */
export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  filters,
  onReset,
  extra,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
      {/* Search */}
      {onSearchChange && (
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Filters */}
      {filters?.map((filter) => (
        <div key={filter.label} className="min-w-[150px]">
          <Select
            label={filter.label}
            value={filter.value}
            options={filter.options}
            onChange={(e) => filter.onChange(e.target.value)}
            placeholder={`Chọn ${filter.label.toLowerCase()}`}
          />
        </div>
      ))}

      {/* Reset */}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Đặt lại
        </Button>
      )}

      {/* Extra actions */}
      {extra && <div className="ml-auto">{extra}</div>}
    </div>
  );
}
