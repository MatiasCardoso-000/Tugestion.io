import { useEffect } from "react";
import { useTransactions } from "../../hooks/useExpenses";
import TransactionsListSkeleton from "./TransactionsListSkeleton";
import { useFilter } from "../../hooks/useFilter";
import { useSearch } from "../../hooks/useSearch";
import { TransactionItem } from "../TransactionItem/TransactionItem";
import { TransactionCard } from "../TransactionCard/TransactionCard";

const TransactionsList = () => {
  const { transactions, isLoading } = useTransactions();
  const { inputValue, resetSearch } = useSearch();
  const { filteredExpenses } = useFilter();
  const filterExpenses = filteredExpenses(transactions, inputValue);

  useEffect(() => {
    resetSearch();
  }, []);



  return (
    <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 px-6 py-8 mt-6 w-full mx-auto">
      <h3 className="text-3xl font-bold tracking-tight text-zinc-900 mb-6 pb-3 border-b border-zinc-200">
        Detalles
      </h3>
      <div>
        {filterExpenses.length > 0 ? (
          <>
            {/* Mobile view */}
            <div className="md:hidden">
              {filterExpenses.map((transaction) => (
                <TransactionCard key={transaction.transaction_id} transaction={transaction} />
              ))}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white border-b border-zinc-200">
                  <tr className="px-6 py-4 text-left font-semibold">
                    <th className="px-6 py-4 text-left font-semibold">
                      Descripción
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                    <th className="px-6 py-4 text-left font-semibold">Categoria</th>
                    <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                    <th className="px-6 py-4 text-left font-semibold">Monto</th>
                    <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                {filterExpenses.map((transaction) => (
                  <tbody className="divide-y divide-zinc-100" key={transaction.transaction_id}>
                    <TransactionItem transaction={transaction} />
                  </tbody>
                ))}
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-lg text-zinc-900 text-center  py-8">
            El gasto que busca no existe
          </h1>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
