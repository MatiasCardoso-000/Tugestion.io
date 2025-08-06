import { Link, useParams } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";
import { useExpenses } from "../../hooks/useExpenses";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";

export const ExpenseInfo = () => {
  const { getExpenseById, expense, isLoading, errors } = useExpenses();
  const { categories } = useCategories();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getExpenseById(id);
    }
  }, [id]);

  useEffect(() => {
    if (expense) {
      console.log("Gasto encontrado:", expense);
    }
  }, [expense]);

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <Link
        to={"/dashboard"}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
      >
        <LeftArrowIcon />
        <span>Volver al inicio</span>
      </Link>
      <div className="bg-zinc-800 p-6 rounded-lg">
        {isLoading && (
          <p className="text-zinc-400 text-center text-lg">
            Cargando información del gasto...
          </p>
        )}

        {errors.length > 0 && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {expense && !isLoading && String(id) === String(expense.expense_id) ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">
                Descripción
              </h3>
              <p className="text-zinc-400">{expense.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">Monto</h3>
              <p className="text-green-400 text-xl font-bold">
                ${expense.amount}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">Fecha</h3>
              <p className="text-zinc-400">
                {expense.expense_date &&
                  new Date(expense.expense_date).toLocaleDateString("es-ES")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-300">
                Categoría
              </h3>
              <p className="text-zinc-400">{expense.category_name}</p>
            </div>
          </div>
        ) : !isLoading && !expense && errors.length === 0 ? (
          <p className="text-zinc-500 text-lg text-center">
            No se pudo cargar la información del gasto o el gasto no existe.
          </p>
        ) : null}
      </div>
    </div>
  );
};
