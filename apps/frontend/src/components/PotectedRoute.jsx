import { Navigate } from "react-router-dom";
import { useSelfProfile } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useSelfProfile();

  if (isLoading) return <p></p>;

  if (isError || !data) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};



export default ProtectedRoute;
