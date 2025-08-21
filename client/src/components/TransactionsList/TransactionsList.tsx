import { useEffect } from "react";
import { useTransactions } from "../../hooks/useExpenses";
import { useFilter } from "../../hooks/useFilter";
import { useSearch } from "../../hooks/useSearch";
import { TransactionItem } from "../TransactionItem/TransactionItem";
import { TransactionCard } from "../TransactionCard/TransactionCard";

const TransactionsList = () => {
  const { transactions } = useTransactions();
  const { inputValue, resetSearch } = useSearch();
  const { filteredExpenses } = useFilter();
  const filterExpenses = filteredExpenses(transactions, inputValue);

  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-2xl px-6 py-8 mt-6 w-full mx-auto">
      <h3 className="text-3xl font-light text-slate-800 mb-6 pb-3 border-b-2 border-slate-200">
        Detalles
      </h3>
      <div>
        {filterExpenses.length > 0 ? (
          <>
            {/* Mobile view */}
            <div className="md:hidden">
              {filterExpenses.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                  <tbody className="divide-y divide-slate-100" key={transaction.id}>
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
