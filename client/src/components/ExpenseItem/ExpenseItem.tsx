import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon, UserIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { useExpenses } from "../../hooks/useExpenses";

export const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();

  return (
    <li className="w-full flex flex-wrap md:flex-nowrap justify-between items-center py-2 md:py-8 lg:py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 md:gap-8 lg:gap-4 items-center justify-center">
        <div className="hidden md:flex justify-center w-1/12 ">
          <UserIcon />
        </div>
        <div className="w-full text-center md:text-left">
          <h3 className="text-zinc-800 text-xl font-bold">Descripción</h3>
          <span className="w-full  md:w-1/12 text-lg font-semibold  text-zinc-600 lg:text-xl ">
            {expense.description.slice(0, 1).toUpperCase() +
              expense.description.slice(1)}
          </span>
        </div>

        <div className="w-full text-center md:text-left">
          <h3 className="text-zinc-800 text-xl ">Fecha</h3>
          <span className="  text-zinc-600 text-sm lg:text-xl font-bold">
            {new Date(expense.expense_date).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row  items-center justify-end gap-4 mt-8 md:mt-0">
        <div className="md:w-1/4">
          <h3 className="text-zinc-800 text-xl text-center ">Monto</h3>
          <p className="w-full  text-center text-sm font-bold  text-zinc-600 lg:text-xl">
            ${expense.amount}
          </p>
        </div>
        <div className="flex">
          <Link
            to={`/dashboard/informacion-gasto/${expense.expense_id}`}
            className="p-2 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title="Ver detalle"
          >
            <EyeIcon />
          </Link>
          <Button
            buttonStyle="p-2 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => deleteExpense(expense.expense_id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </li>
  );
};
