import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PublicRoutesType {
  children?: React.ReactNode;
  redirectTo: string;
}

export const PublicRoutes = ({ children, redirectTo }: PublicRoutesType) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated && !isLoading)
    return <Navigate to={redirectTo} replace />;

  return children ? <> {children}</> : <Outlet />;

};
