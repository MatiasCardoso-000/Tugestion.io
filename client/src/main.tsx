import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext/AuthProvider";
import { AppRouter } from "./AppRouter.tsx";
import { CategoriesProvider } from "./context/CategoriesContext/CategoriesProvider.tsx";

import { SearchProvider } from "./context/SearchContext/SearchProvider.tsx";
import { BudgetProvider } from "./context/BudgetContext/BudgetProvider.tsx";
import TransactionsProvider from "./context/TransactionsContext/TransactionsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <BudgetProvider>
          <TransactionsProvider>
            <CategoriesProvider>
              <AppRouter />
            </CategoriesProvider>
          </TransactionsProvider>
        </BudgetProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
