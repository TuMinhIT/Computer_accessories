import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "../api/UserAPI";

export const UserHooks = () => {
  const { getAllUsers, deleteUser, updateInfo, createUser, adminLogin } =
    UserAPI();
  const queryClient = useQueryClient();

  const useLogin = () => {
    return useMutation({
      mutationFn: adminLogin,
      onSuccess: () => {
        // queryClient.invalidateQueries(["Categories"]);
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
    useLogin,
  };
};
