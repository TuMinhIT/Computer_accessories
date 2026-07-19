import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrandAPI } from "../api/BrandAPI";

export const BrandHooks = () => {
  const { getAllBrand, deleteBrand, updateBrand, createBrand } = BrandAPI();
  const queryClient = useQueryClient();

  const useBrands = () => {
    return useQuery({
      queryKey: ["Brands"],
      queryFn: () => getAllBrand(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateBrand = () => {
    return useMutation({
      mutationFn: createBrand,
      onSuccess: () => {
        queryClient.invalidateQueries(["Brands"]);
      },
    });
  };

  const useUpdateBrand = () => {
    return useMutation({
      mutationFn: updateBrand,
      onSuccess: () => {
        queryClient.invalidateQueries(["Brands"]);
      },
    });
  };

  const useDeleteBrand = () => {
    return useMutation({
      mutationFn: deleteBrand,
      onSuccess: () => {
        queryClient.invalidateQueries(["Brands"]);
      },
    });
  };

  return {
    useBrands,
    useUpdateBrand,
    useDeleteBrand,
    useCreateBrand,
  };
};
