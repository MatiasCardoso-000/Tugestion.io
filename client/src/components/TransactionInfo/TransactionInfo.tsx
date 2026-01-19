import { Link, useParams } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";

export const TransactionInfo = () => {
  const { getExpenseById, transaction, isLoading, errors } = useTransactions();
  const { categories } = useCategories();
  const { transaction_id } = useParams();

  const isExpense = transaction?.transaction_type === "gasto";
  const amountColor = isExpense ? "text-red-600" : "text-emerald-600";

    const categoryName = categories
    .find((c) => {
      return (
         c.category_id === transaction?.category_id
      );
    })?.category_name || "-"


  useEffect(() => {
    if (transaction_id) {
      getExpenseById(transaction_id);
    }
  }, [transaction_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to={"/dashboard"}
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-indigo-600 transition-colors font-medium mb-8"
        >
          <LeftArrowIcon /> Volver al inicio
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 px-8 py-10">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                <p className="text-zinc-500 text-lg font-medium">
                  Cargando información...
                </p>
              </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {errors.map((err, index) => (
                <p key={index} className="font-medium">{err}</p>
              ))}
            </div>
          )}

          {transaction && !isLoading && String(transaction_id) === String(transaction.transaction_id) ? (
            <div className="space-y-8">
              <div className="text-center pb-8 border-b border-zinc-200">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${isExpense ? 'bg-red-100' : 'bg-emerald-100'}`}>
                  <span className="text-4xl">{isExpense ? '💸' : '💰'}</span>
                </div>
                <h1 className="text-3xl font-bold text-zinc-800 mb-2">
                  {transaction.description}
                </h1>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${isExpense ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {isExpense ? 'Gasto' : 'Ingreso'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Monto</span>
                  </div>
                  <p className={`text-3xl font-bold ${amountColor}`}>
                    ${transaction.amount}
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Fecha</span>
                  </div>
                  <p className="text-xl font-semibold text-zinc-800">
                    {transaction.date &&
                      new Date(transaction.date).toLocaleDateString(
                        "es-ES",
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Categoría</span>
                  </div>
                  <p className="text-xl font-semibold text-zinc-800">
                    {categoryName}
                  </p>
                </div>
              </div>
            </div>
          ) : !isLoading && !transaction && errors.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
                <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-zinc-600 text-lg font-medium">
                No se pudo cargar la información del movimiento
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                El movimiento no existe o ha sido eliminado
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
