import { axiosInstance } from "../utils/axiosInstanceApi";

export const signUpUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const logIn = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data.data;
};

export const logOut = async () => {
  await axiosInstance.post("/auth/logout");
};

export const fetchMe = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data.data;
};
