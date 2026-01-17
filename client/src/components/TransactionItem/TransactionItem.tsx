import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, TrashIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";

export const TransactionItem = ({ transaction }: { transaction: Transactions }) => {
  const { deleteExpense } = useTransactions();
  const { categories } = useCategories();

  const isExpense = transaction.transaction_type === "gasto";
  const amountColor = isExpense ? "text-red-500" : "text-green-500";
  const icon = isExpense ? (
    <button className="h-5 w-5 text-red-500">
      <ArrowDownIcon />
    </button>
  ) : (
    <button className="h-5 w-5 text-green-500">
      <ArrowUpIcon />
    </button>
  );

  const categoryName =
    categories.find((c) => {
      return c.category_id === transaction.category_id;
    })?.category_name || "-";

  return (
    <tr className=" hover:bg-zinc-50 transition-colors duration-200 cursor-pointer border-b border-zinc-100 last:border-0">
      <td className="px-6 py-4 text-zinc-600 w-1/4">
        {transaction.description ? transaction.description : "-"}
      </td>
      <td className="px-6 py-4 flex items-center justify-between w-1/2">
        <span className={`${amountColor} font-semibold`}>
          {transaction.transaction_type}
        </span>
        <span>{icon}</span>
      </td>
      <td className="px-6 py-4 text-zinc-600 text-center">{categoryName}</td>
      <td className="px-6 py-4 text-zinc-600">
        {new Date(transaction.date).toLocaleDateString("es-ES")}
      </td>
      <td className="px-6 py-4 text-zinc-600">{transaction.amount}</td>
      <td className="px-6 py-4 font-semibold text-zinc-900 flex items-center gap-6 justify-left lg:h-[12vh] xl:h-0">
          <Link to={`/dashboard/transaccion/${transaction.transaction_id}`}>
            <EyeIcon />
          </Link>

        <button onClick={() => deleteExpense(transaction.transaction_id)}>
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
};
