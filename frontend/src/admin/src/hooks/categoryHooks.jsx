import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryAPI } from "../api/CategoryAPI";

export const categoryHooks = () => {
  const { getAllCategories, deleteCategory, updateCategory, createCategory } =
    CategoryAPI();
  const queryClient = useQueryClient();

  const useCategories = () => {
    return useQuery({
      queryKey: ["Categories"],
      queryFn: () => getAllCategories(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateCategory = () => {
    return useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries(["Categories"]);
      },
    });
  };

  const useUpdateCategory = () => {
    return useMutation({
      mutationFn: updateCategory,
      onSuccess: () => {
        queryClient.invalidateQueries(["Categories"]);
      },
    });
  };

  const useDeleteCategory = () => {
    return useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries(["Categories"]);
      },
    });
  };

  return {
    useCategories,
    useUpdateCategory,
    useDeleteCategory,
    useCreateCategory,
  };
};
