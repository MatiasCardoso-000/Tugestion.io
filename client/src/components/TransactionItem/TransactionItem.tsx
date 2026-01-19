import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, TrashIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";

export const TransactionItem = ({ transaction }: { transaction: Transactions }) => {
  const { deleteExpense } = useTransactions();
  const { categories } = useCategories();

  const isExpense = transaction.transaction_type === "gasto";
  const amountColor = isExpense ? "text-red-600" : "text-emerald-600";
  const icon = isExpense ? (
    <div className="h-6 w-6 rounded-lg bg-red-100 flex items-center justify-center">
      <ArrowDownIcon />
    </div>
  ) : (
    <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center">
      <ArrowUpIcon />
    </div>
  );

  const categoryName =
    categories.find((c) => {
      return c.category_id === transaction.category_id;
    })?.category_name || "-";

  return (
    <tr className="hover:bg-zinc-50 transition-colors duration-200 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-zinc-800">
            {transaction.description ? transaction.description : "-"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${isExpense ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {transaction.transaction_type}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-zinc-600">{categoryName}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-zinc-600">
          {new Date(transaction.date).toLocaleDateString("es-ES", { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`font-semibold ${amountColor}`}>
          ${Number(transaction.amount).toLocaleString()}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link 
            to={`/dashboard/transaccion/${transaction.transaction_id}`}
            className="p-2 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            <EyeIcon />
          </Link>
          <button
            onClick={() => deleteExpense(transaction.transaction_id)}
            className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};
