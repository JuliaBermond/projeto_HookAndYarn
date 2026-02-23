import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../libs/queryClient";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchMyPosts,
  fetchPostById,
  fetchPostsByTag,
  fetchUserPosts,
} from "../services/_index.js";

//GET ALL POSTS
export const useAllPosts = (search) => {
  return useQuery({
    queryKey: ["posts", search],
    queryFn: () => fetchAllPosts(search),
    keepPreviousData: true,
  });
};

//GET POST BY ID
export const usePost = (id) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
};

//CREATE POST
export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,

    onSuccess: (newPost) => {
      // Atualiza cache do perfil
      queryClient.setQueryData(["me"], (oldUser) => {
        if (!oldUser) return oldUser;

        return {
          ...oldUser,
          posts: [newPost, ...(oldUser.posts ?? [])],
        };
      });

      // Atualiza lista geral
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

//DELETE POST
export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id) => deletePost(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousMe = queryClient.getQueryData(["me"]);
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["me"], (oldUser) => {
        if (!oldUser) return oldUser;

        return {
          ...oldUser,
          posts: oldUser.posts?.filter((post) => post._id !== id) ?? [],
        };
      });

      queryClient.setQueryData(["posts"], (old) =>
        old?.filter((post) => post._id !== id),
      );

      return { previousMe, previousPosts };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousMe) {
        queryClient.setQueryData(["me"], context.previousMe);
      }

      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["tag-posts"] });
    },
  });
};

// Posts do próprio usuário (paginação)
export const useSelfPosts = (page = 1, limit = 4) => {
  return useQuery({
    queryKey: ["posts", "my-posts", page],
    queryFn: () => fetchMyPosts(page, limit),
    keepPreviousData: true,
  });
};

// Posts de outro usuário (paginação)
export const useUserPosts = (username, page = 1, limit = 4) => {
  return useQuery({
    queryKey: ["posts", "user", username, page],
    queryFn: () => fetchUserPosts(username, page, limit),
    enabled: !!username,
    keepPreviousData: true,
  });
};

//posts por suas tags.
export const useTagPosts = (tag, search) => {
  return useQuery({
    queryKey: ["posts", "tag", tag, search],
    queryFn: () => fetchPostsByTag(tag, search),
    enabled: !!tag,
    keepPreviousData: true,
  });
};
