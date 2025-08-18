import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "../api/UserAPI";

export const UserHooks = () => {
  const {
    getAllUsers,
    deleteUser,
    updateInfo,
    createUser,
    adminLogin,
    adminProfile,
  } = UserAPI();

  const useLogin = () => {
    return useMutation({
      mutationFn: adminLogin,
      onSuccess: () => {
        // queryClient.invalidateQueries(["Categories"]);
      },
    });
  };

  const useProfile = () => {
    return useMutation({
      mutationFn: adminProfile,
    });
  };

  // const useUpdateCategory = () => {
  //   return useMutation({
  //     mutationFn: updateCategory,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["Categories"]);
  //     },
  //   });
  // };

  // const useDeleteCategory = () => {
  //   return useMutation({
  //     mutationFn: deleteCategory,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["Categories"]);
  //     },
  //   });
  // };

  return {
    useLogin,
    useProfile,
  };
};
