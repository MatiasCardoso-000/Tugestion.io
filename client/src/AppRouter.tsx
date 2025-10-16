import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Layout from "./components/Layout/Layout";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Home } from "./pages/Home";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { UserProfile } from "./components/UserProfile/UserProfile";
import Budget from "./components/Budget/Budget";
import { TransactionInfo } from "./components/TransactionInfo/TransactionInfo";
import TransactionsForm from "./components/TransactionsForm/TransactionsForm";
import { DashboardComponent } from "./components/DashBoard/DashboardComponent";
import { PublicRoutes } from "./components/PublicRoutes/PublicRoutes";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes redirectTo="/dashboard" />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes redirectTo={"/login"} />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<DashboardComponent />} />
              <Route path="/dashboard/perfil" element={<UserProfile />} />
              <Route
                path="/dashboard/transaccion/:transaction_id"
                element={<TransactionInfo />}
              />

              <Route
                path="/dashboard/categorias"
                element={<CategoriesList />}
              />
              <Route
                path="/dashboard/registrar-gasto"
                element={<TransactionsForm />}
              />
              <Route path="/dashboard/presupuesto" element={<Budget />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
