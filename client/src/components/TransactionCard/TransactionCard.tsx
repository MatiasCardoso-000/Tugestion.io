import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, TrashIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";

export const TransactionCard = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  const { deleteExpense } = useTransactions();
  const { categories } = useCategories();

  const isExpense = transaction.transaction_type === "gasto";
  const amountColor = isExpense ? "text-red-600" : "text-emerald-600";
  const icon = isExpense ? (
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
      <ArrowDownIcon />
    </div>
  ) : (
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
      <ArrowUpIcon />
    </div>
  );

  const categoryName =
    categories.find((c) => c.category_id === transaction.category_id)
      ?.category_name || "-";

  return (
    <div className="bg-gradient-to-br from-white to-zinc-50 rounded-2xl shadow-md border border-zinc-200 p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <div className="flex-1">
            <p className="text-base font-semibold text-zinc-900 leading-tight">
              {transaction.description ? transaction.description : "-"}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{categoryName}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-zinc-100">
        <div>
          <p className={`text-xl font-bold ${amountColor}`}>
            ${Number(transaction.amount).toLocaleString()}
          </p>
          <p className="text-xs text-zinc-500">
            {new Date(transaction.date).toLocaleDateString("es-ES", { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            to={`/dashboard/transaccion/${transaction.transaction_id}`}
            className="p-2.5 rounded-xl text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            <EyeIcon />
          </Link>
          <button
            onClick={() => deleteExpense(transaction.transaction_id)}
            className="p-2.5 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
