import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../libs/queryClient";
import { fetchMe, logIn, logOut, signUpUser } from "../services/_index.js";

export const useSignUpUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user) => signUpUser(user),
    onSuccess: () => {
      navigate("/auth/login");
    },
  });
};

export const useLogIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/app");
    },
  });
};

export const useLogOut = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.clear();
      navigate('/auth/login');
    },
  });
};

export const useSelfProfile = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
