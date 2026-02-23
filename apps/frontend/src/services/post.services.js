import { axiosInstance } from "../utils/axiosInstanceApi";

export const createPost = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("body", data.body);

  data.tags.forEach((tag) => {
    formData.append("tags", tag);
  });

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await axiosInstance.post(`/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const fetchAllPosts = async (search) => {
  const response = await axiosInstance.get("/posts", {
    params: { search },
  });

  return response.data.data;
};

export const fetchMyPosts = async (page = 1, limit = 4) => {
  const response = await axiosInstance.get("/posts/my-posts", {
    params: { page, limit },
  });
  return response.data.data;
};

export const fetchUserPosts = async (username, page = 1, limit = 4) => {
  const response = await axiosInstance.get(
    `/posts/user/${username}/posts?page=${page}&limit=${limit}`,
  );
  return response.data.data;
};

export const fetchPostById = async (id) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data.data;
};

export const fetchPostsByTag = async (tag, search) => {
  const response = await axiosInstance.get(`/posts/tags/${tag}`, {
    params: { search },
  });

  return response.data.data;
};

export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`/posts/my-posts/${id}`);
  return response.data.data;
};
