"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useCategories } from "@/features/category/hooks";
import { useCreateBudgetTemplate, useUpdateBudgetTemplate, useBudgetTemplate } from "./hooks";
import type {
  BudgetTemplateDetailDto,
  CreateBudgetTemplateDto,
  UpdateBudgetTemplateDto,
} from "./types";

interface BudgetTemplateFormProps {
  mode: "create" | "edit";
  id?: string;
}

interface FormValues {
  name: string;
  month: string;
  warningPercentage: string;
  details: BudgetTemplateDetailDto[];
}

const emptyDetail = (): BudgetTemplateDetailDto => ({
  categoryId: "",
  amount: 0,
});

const initialValues: FormValues = {
  name: "",
  month: "",
  warningPercentage: "",
  details: [emptyDetail()],
};

export default function BudgetTemplateForm({ mode, id }: BudgetTemplateFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const {
    data: template,
    isLoading: templateLoading,
    isError: templateError,
  } = useBudgetTemplate(id ?? "");
  const createMutation = useCreateBudgetTemplate();
  const updateMutation = useUpdateBudgetTemplate();
  const mutation = isEdit ? updateMutation : createMutation;
  const expenseCategories =
    categories?.content.filter((category) => category.type === "EXPENSE") ?? [];

  useEffect(() => {
    if (isEdit && template) {
      setValues({
        name: template.name,
        month: String(template.month),
        warningPercentage: String(template.warningPercentage),
        details:
          template.details.length > 0
            ? template.details.map((detail) => ({
                categoryId: detail.categoryId,
                amount: detail.amount,
              }))
            : [emptyDetail()],
      });
    }
  }, [isEdit, template]);

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/admin/budget-templates");
    }
  }, [mutation.isSuccess, router]);

  if (isEdit && templateLoading) {
    return <FormState message="Đang tải mẫu ngân sách..." />;
  }

  if (isEdit && templateError) {
    return <FormState message="Không thể tải mẫu ngân sách." isError />;
  }

  const updateDetail = (index: number, field: keyof BudgetTemplateDetailDto, value: string) => {
    setValues((current) => ({
      ...current,
      details: current.details.map((detail, detailIndex) =>
        detailIndex === index
          ? { ...detail, [field]: field === "amount" ? Number(value) : value }
          : detail
      ),
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const month = Number(values.month);
    const warningPercentage = Number(values.warningPercentage);

    if (!values.name.trim()) nextErrors.name = "Name is required";
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      nextErrors.month = "Month must be between 1 and 12";
    }
    if (
      !Number.isInteger(warningPercentage) ||
      warningPercentage < 50 ||
      warningPercentage > 100 ||
      warningPercentage % 5 !== 0
    ) {
      nextErrors.warningPercentage = "Warning percentage must be 50-100 in steps of 5";
    }
    if (values.details.length === 0) {
      nextErrors.details = "At least one detail is required";
    }
    values.details.forEach((detail, index) => {
      if (!detail.categoryId) nextErrors[`details.${index}.categoryId`] = "Category is required";
      if (!Number.isFinite(detail.amount) || detail.amount <= 0) {
        nextErrors[`details.${index}.amount`] = "Amount must be positive";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const data = {
      name: values.name.trim(),
      month: Number(values.month),
      warningPercentage: Number(values.warningPercentage),
      details: values.details,
    };

    if (isEdit) {
      updateMutation.mutate({
        id: id ?? "",
        data: data as UpdateBudgetTemplateDto,
      });
    } else {
      createMutation.mutate(data as CreateBudgetTemplateDto);
    }
  };

  const addDetail = () => {
    setValues((current) => ({ ...current, details: [...current.details, emptyDetail()] }));
  };

  const removeDetail = (index: number) => {
    setValues((current) => ({
      ...current,
      details: current.details.filter((_, detailIndex) => detailIndex !== index),
    }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card title="Basic information" description="Set the template rules used by users.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <Input
              label="Name"
              value={values.name}
              onChange={(event) => setValues({ ...values, name: event.target.value })}
              error={errors.name}
              placeholder="e.g. Essential expenses"
            />
          </div>
          <Input
            label="Month"
            type="number"
            min={1}
            max={12}
            value={values.month}
            onChange={(event) => setValues({ ...values, month: event.target.value })}
            error={errors.month}
          />
          <Input
            label="Warning percentage"
            type="number"
            min={50}
            max={100}
            step={5}
            value={values.warningPercentage}
            onChange={(event) => setValues({ ...values, warningPercentage: event.target.value })}
            error={errors.warningPercentage}
          />
        </div>
      </Card>

      <Card
        title="Category allocations"
        description="Add at least one expense category and its planned amount."
        action={
          <Button type="button" variant="outline" size="sm" onClick={addDetail}>
            <Plus className="h-4 w-4" />
            Add detail
          </Button>
        }
      >
        <div className="space-y-4">
          {values.details.map((detail, index) => (
            <div
              key={`${index}-${detail.categoryId}`}
              className="grid grid-cols-1 items-start gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-[minmax(0,1fr)_180px_auto]"
            >
              <Select
                label={`Category ${index + 1}`}
                options={expenseCategories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                placeholder={
                  categoriesLoading ? "Loading categories..." : "Select expense category"
                }
                value={detail.categoryId}
                onChange={(event) => updateDetail(index, "categoryId", event.target.value)}
                error={errors[`details.${index}.categoryId`]}
                disabled={categoriesLoading}
              />
              <Input
                label="Amount"
                type="number"
                min={0}
                step="0.01"
                value={detail.amount || ""}
                onChange={(event) => updateDetail(index, "amount", event.target.value)}
                error={errors[`details.${index}.amount`]}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDetail(index)}
                aria-label={`Remove category ${index + 1}`}
                title="Remove detail"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          {errors.details && <p className="text-sm text-red-600">{errors.details}</p>}
        </div>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/budget-templates")}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={mutation.isPending}>
          <Save className="h-4 w-4" />
          {isEdit ? "Save changes" : "Create template"}
        </Button>
      </div>
    </form>
  );
}

function FormState({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <Card>
      <div
        className={`flex min-h-48 items-center justify-center text-sm ${isError ? "text-red-600" : "text-gray-500"}`}
      >
        {message}
      </div>
    </Card>
  );
}
