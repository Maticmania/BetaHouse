import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.token;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
