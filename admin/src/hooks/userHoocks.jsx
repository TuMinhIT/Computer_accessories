import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "../api/UserAPI";

export const UserHooks = () => {
  const queryClient = useQueryClient();
  const {
    getAllUsers,
    deleteUser,
    updateInfo,
    updateUser,
    blockUser,
    createUser,
    adminLogin,
    adminProfile,
    resendActivation,
  } = UserAPI();
  const useUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
    });
  };

  const useCreateUser = () => {
    return useMutation({
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const useLogin = () => {
    return useMutation({
      mutationFn: adminLogin,
      onSuccess: () => {},
    });
  };

  const useProfile = () => {
    return useMutation({
      mutationFn: adminProfile,
    });
  };

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const useBlockUser = () => {
    return useMutation({
      mutationFn: blockUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const useSendActivation = () => {
    return useMutation({
      mutationFn: resendActivation,
    });
  };
  return {
    useLogin,
    useProfile,
    useDeleteUser,
    useUsers,
    useCreateUser,
    useUpdateUser,
    useBlockUser,
    useSendActivation,
  };
};
