import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon, UserIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { useExpenses } from "../../hooks/useExpenses";

export const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();

  return (
    <li className="w-full flex justify-between items-center py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div className="w-full flex gap-8 items-center">
        <div>
          <UserIcon />
        </div>
        <div className="w-full">
          <h3 className="text-zinc-400 text-xl">Descripción</h3>
          <span className="w-full text-zinc-800 text-xl">
            {expense.description}
          </span>
        </div>

        <div className="w-full">
          <h3 className="text-zinc-400 text-xl">Fecha</h3>
          <span className="block  text-zinc-400 text-xl">
            {new Date(expense.expense_date).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-4">
        <div className="w-1/4 ">
          <h3 className="text-zinc-400 text-xl">Monto</h3>
          <span className="font-bold text-zinc-00 text-xl">
            ${expense.amount}
          </span>
        </div>
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
    </li>
  );
};
