// src/components/PrivateRoutes.js
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.token;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
