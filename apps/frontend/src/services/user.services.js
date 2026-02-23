import { axiosInstance } from "../utils/axiosInstanceApi.js";

export const fetchUserProfile = async (data) => {
  const response = await axiosInstance.get(`/users/${data}`);
  return response.data.data;
};

