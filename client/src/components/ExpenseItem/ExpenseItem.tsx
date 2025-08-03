import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon, UserIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { useExpenses } from "../../hooks/useExpenses";

export const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();

  return (
    <li className="flex justify-between items-center py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div className="flex gap-8 items-center">
        <UserIcon/>
        <div>
          <h3 className="text-zinc-400 text-xl">Descripción</h3>
          <span className="font-semibold text-zinc-800 text-xl">
            {expense.description}
          </span>
        </div>

        <div>
          <h3 className="text-zinc-400 text-xl">Fecha</h3>
          <span className="block  text-zinc-400 text-xl">
            {expense.expense_date.split("T")[0].split("-").reverse().join("/")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-zinc-400 text-xl">Monto</h3>
          <span className="font-bold text-zinc-00 text-xl">
            ${expense.amount}
          </span>
        </div>
        <Link
          to={"/expense/:id"}
          className="p-2 rounded hover:bg-zinc-200 transition-colors"
          title="Ver detalle"
        >
          <EyeIcon />
        </Link>
        <Button
          buttonStyle="p-2 rounded hover:bg-red-100 transition-colors cursor-pointer"
          onClick={() => deleteExpense(expense.expense_id)}
        >
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
};
