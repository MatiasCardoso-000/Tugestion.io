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
  const amountColor = isExpense ? "text-red-500" : "text-green-500";
  const icon = isExpense ? (
    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
      <ArrowDownIcon />
    </div>
  ) : (
    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
      <ArrowUpIcon />
    </div>
  );

  const categoryName =
    categories.find((c) => c.category_id === transaction.category_id)
      ?.category_name || "-";

  return (
    <div className="bg-white flex flex-col justify-between gap-4 h-[30vh] rounded-2xl shadow-lg border border-zinc-100 p-4 mb-4">
        <div className="flex flex-col items-center gap-2">
         <div>
           {icon}
         </div>
          <div className=" w-full ">
            <p className="text-center text-sm font-semibold text-zinc-900">
              {transaction.description ? transaction.description : "-"}
            </p>
            <p className="text-sm text-zinc-500 text-center">{categoryName}</p>
          </div>
        </div>
      <div className="flex items-center justify-center mb-4">
        <div className="text-right">
          <p className={`text-lg font-semibold ${amountColor}`}>
            {transaction.amount}
          </p>
          <p className="text-sm text-zinc-500">
            {new Date(transaction.date).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Link to={`/dashboard/transaccion/${transaction.transaction_id}`}>
          <button className="text-zinc-400 hover:text-indigo-600 align-middle transition-colors">
            <EyeIcon />
          </button>
        </Link>
        <button
          onClick={() => deleteExpense(transaction.transaction_id)}
          className="text-zinc-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
