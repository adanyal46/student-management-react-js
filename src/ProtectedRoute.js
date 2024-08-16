// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "./stores/authStore"; // Import Zustand store

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isTokenExpired } = useAuthStore(); // Access Zustand state

  if (!isAuthenticated || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
