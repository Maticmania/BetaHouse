import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth"; 
const PublicRoutes = () => {
  const { auth } = useAuth();
  const isLoggedIn = auth.token;

  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
