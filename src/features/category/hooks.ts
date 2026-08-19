import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "./api";
import type { CreateCategoryDto, UpdateCategoryDto } from "./types";

const QUERY_KEY = "categories";

export function useCategories(filter?: Record<string, unknown>) {
  return useQuery({
    queryKey: [QUERY_KEY, filter],
    queryFn: () => categoryApi.getAll(filter).then((res) => res.data),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}
