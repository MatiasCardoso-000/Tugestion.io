import { Link, useParams } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";
import { useExpenses } from "../../hooks/useExpenses";
import { useEffect } from "react";

export const ExpenseInfo = () => {
  const { getExpenseById, expense } = useExpenses();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getExpenseById(id);
    }
  }, [id, getExpenseById]);

  return (
    <div className="flex flex-col gap-y-4 relative">
      <Link to={"/dashboard"} className="flex gap-4 p-4">
        <LeftArrowIcon /> Volver al inicio
      </Link>
      <div>
        {expense && id === expense.expense_id ? (
          <>
            <h3 className="text-shadow-zinc-800">Descripción</h3>
            <p> {expense.description}</p>
            <h3 className="text-shadow-zinc-800">Monto</h3>
            <p>${expense.amount}</p>
            <h3 className="text-shadow-zinc-800">Fecha</h3>
            <p>
              {expense.expense_date &&
                expense.expense_date
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
            </p>
            <h3>Categoría</h3>
            {/* <p>{expense.category_name}</p> */}
          </>
        ) : (
          <p>Cargando información del gasto...</p>
        )}
      </div>
    </div>
  );
};
