import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon, UserIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { useExpenses } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";

export const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();
  const { categories } = useCategories();

  return (
    <li className="w-full flex flex-wrap md:flex-nowrap  items-start py-3 md:py-8 lg:py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 md:gap-8 lg:gap-4 items-center justify-center">
        <div className="hidden md:flex justify-center">
          <UserIcon />
        </div>
 
        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center  gap-4 md:gap-8 lg:gap-4">
          <div className="w-full xl:w-1/3 flex flex-col  items-center md:items-start text-center md:text-left">
            <h3 className="text-zinc-800 text-sm   font-semibold xl:text-lg">
              Descripción
            </h3>
            <p className={`w-full  text-sm  lg:text-[14px] text-zinc-900`} >
              {expense.description.slice(0, 1).toUpperCase() +
                expense.description.slice(1)}
            </p>
          </div>
          <div  className="w-full  xl:w-1/3 flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <h3 className="text-zinc-800  text-sm font-semibold xl:text-lg">Categoria</h3>
            <p className={`w-full  text-sm  lg:text-[14px]   text-zinc-900`}  >
              {categories.map((category) => {
                if (category.category_id === expense.category_id) {
                  return category.category_name;
                }
              })}
            </p>
          </div>
        </div>

        <div className="w-full text-center md:text-center">
          <h3 className="text-zinc-800 text-sm  font-semibold xl:text-xl">Fecha</h3>
          <span className={`w-full  text-sm  lg:text-[14px] text-zinc-900`}>
            {new Date(expense.date).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col md:flex-row  items-center justify-end gap-4 mt-8 md:mt-0">
        <div className="w-full flex flex-col items-center md:w-1/4">
          <h3 className="w-full text-zinc-800 text-sm  text-center   font-semibold  lg:text-right xl:text-xl ">Monto</h3>
          <p className={`w-full  text-sm  text-center lg:text-right lg:text-[14px] text-zinc-900`} >
            ${expense.amount}
          </p>
        </div>
        <div className="flex">
          <Link
            to={`/dashboard/informacion-gasto/${expense.id}`}
            className="p-2 ml-2 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
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
