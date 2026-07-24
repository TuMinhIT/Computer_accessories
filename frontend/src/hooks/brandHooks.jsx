import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrandService } from "@/services/BrandService";

export const BrandHooks = () => {
  const { getAllBrands, deleteBrand, updateBrand, createBrand } = BrandService();
  const queryClient = useQueryClient();

  const useBrands = () => {
    return useQuery({
      queryKey: ["Brands"],
      queryFn: () => getAllBrands(),
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
