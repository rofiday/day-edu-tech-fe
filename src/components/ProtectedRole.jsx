import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const ProtectedRole = () => {
  const { roleName } = useAuthStore();
  const roles = ["Student", "Admin", "Mentor"];
  if (roleName) {
    if (!roles.includes(roleName)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return <Outlet />;
};

export default ProtectedRole;
