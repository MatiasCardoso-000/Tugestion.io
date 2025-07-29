import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRoutes {
  children: React.ReactNode;
  redirectTo: string;
}

export const PrivateRoutes = ({ children, redirectTo }: PrivateRoutes) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <h1>Cargando porfavor espere...</h1>;

  if (!isAuthenticated && !isLoading)
    return <Navigate to={redirectTo} replace />;

  return children ? <> {children}</> : <Outlet />;
};
