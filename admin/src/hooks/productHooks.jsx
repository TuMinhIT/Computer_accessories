import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductAPI } from "../api/ProductAPI";

export const productHooks = () => {
  const { getProducts, createProduct, updateProduct, deleteProduct } =
    ProductAPI();
  const queryClient = useQueryClient();

  const useProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => getProducts(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateProduct = () => {
    return useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: updateProduct,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  return { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct };
};
