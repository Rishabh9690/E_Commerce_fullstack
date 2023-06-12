import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return token && userId ? <Outlet /> : <Navigate to="/" strict />;
};
export default PrivateRoutes;
