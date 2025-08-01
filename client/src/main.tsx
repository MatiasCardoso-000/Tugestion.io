import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext/AuthProvider";
import { AppRouter } from "./AppRouter.tsx";
import { CategoriesProvider } from "./context/CategoriesContext/CategoriesProvider.tsx";
import ExpensesProvider from "./context/ExpensesContext/ExpensesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ExpensesProvider>
        <CategoriesProvider>
          <AppRouter />
        </CategoriesProvider>
      </ExpensesProvider>
    </AuthProvider>
  </StrictMode>
);
