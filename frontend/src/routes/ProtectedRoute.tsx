import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner label="Checking session…" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
