import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../services/_index.js";

//GET USER
export const useUserProfile = (username) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetchUserProfile(username),
    enabled: !!username
  });
};
