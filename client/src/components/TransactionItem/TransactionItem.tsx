import { Link } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  TrashIcon,
  UserIcon,
} from "../Icons/Icons";
import Button from "../Button/Button";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";

export const TransactionItem = ({ transaction }) => {
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

  return (
    <li className="w-full flex flex-wrap md:flex-nowrap  items-start py-3 md:py-8 lg:py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 md:gap-8 lg:gap-4 items-center justify-center">
        <div>{icon}</div>
        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center  gap-4 md:gap-8 lg:gap-4">
          <div className="w-full xl:w-1/3 flex flex-col  items-center md:items-start text-center md:text-left">
            <h3 className="text-zinc-800 text-sm   font-semibold xl:text-lg">
              Descripción
            </h3>
            <p className={`w-full  text-sm  lg:text-[14px] text-zinc-900`}>
              {transaction.description
                ? transaction.description.slice(0, 1).toUpperCase() +
                  transaction.description.slice(1)
                : null}
            </p>
          </div>
          <div className="w-full  xl:w-1/3 flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <h3 className="text-zinc-800  text-sm font-semibold xl:text-lg">
              Categoria
            </h3>
            <p className={`w-full  text-sm  lg:text-[14px]   text-zinc-900`}>
              {categories?.map((category) => {
                if (
                  category &&
                  category.category_id === transaction.category_id
                ) {
                  return category.category_name;
                }
                return null;
              })}
            </p>
          </div>
        </div>

        <div className="w-full text-center md:text-center">
          <h3 className="text-zinc-800 text-sm  font-semibold xl:text-xl">
            Fecha
          </h3>
          <span className={`w-full  text-sm  lg:text-[14px] text-zinc-900`}>
            {new Date(transaction.date).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col md:flex-row  items-center justify-end gap-4 mt-8 md:mt-0">
        <div className="w-full flex flex-col items-center md:w-1/4">
          <h3 className="w-full text-zinc-800 text-sm  text-center   font-semibold  lg:text-right xl:text-xl ">
            Monto
          </h3>
          <p
            className={`w-full  text-sm  text-center lg:text-right lg:text-[14px] ${amountColor}`}
          >
            ${transaction.amount}
          </p>
        </div>
        <div className="flex">
          <Link
            to={`/dashboard/informacion-gasto/${transaction.id}`}
            className="p-2 ml-2 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title="Ver detalle"
          >
            <EyeIcon />
          </Link>
          <Button
            buttonStyle="p-2 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => deleteExpense(transaction.expense_id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </li>
  );
};
