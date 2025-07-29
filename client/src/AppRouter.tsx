import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes redirectTo={"/login"} />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/profile" element={<UserProfile />} />
              <Route path="/dashboard/registrar-gasto" element={<ExpenseForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
