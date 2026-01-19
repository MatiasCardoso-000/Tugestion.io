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
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Historial de Movimientos
          </h3>
          <p className="text-zinc-500 text-sm">Todas tus transacciones en un solo lugar</p>
        </div>
      </div>
      <div>
        {filterExpenses.length > 0 ? (
          <>
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {filterExpenses.map((transaction) => (
                <TransactionCard key={transaction.transaction_id} transaction={transaction} />
              ))}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-zinc-50 to-zinc-100 border-b-2 border-zinc-200">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filterExpenses.map((transaction) => (
                    <TransactionItem key={transaction.transaction_id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-zinc-600 text-lg font-medium mb-1">
              No se encontraron movimientos
            </p>
            <p className="text-zinc-400 text-sm">
              No hay transacciones que coincidan con tu búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
