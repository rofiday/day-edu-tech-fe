/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, roleName } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRole.length > 0 && !allowedRole.includes(roleName)) {
    return (
      <Navigate to={roleName === "Admin" ? "/admin/dashboard" : "/dashboard"} />
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
