import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Layout from "./components/Layout/Layout";

import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import { Home } from "./pages/Home";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { UserProfile } from "./components/UserProfile/UserProfile";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes redirectTo={"/login"} />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/perfil" element={<UserProfile />} />
           
              <Route path="/dashboard/categorias" element={<CategoriesList />} />
              <Route path="/dashboard/registrar-gasto" element={<ExpenseForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
