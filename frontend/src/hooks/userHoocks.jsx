import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/UserService";

export const UserHooks = () => {

  const queryClient = useQueryClient();

  const { getAllUsers, deleteUser } = UserService();

  const useUsers = () => {
    return useQuery({
      queryKey: ["users"],

      queryFn: () => getAllUsers(),

    });
  };


  const useDeleteUser = () => {
    return useMutation({
      mutationFn: (id) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };
  return {
    useDeleteUser,
    useUsers,
  };
};
