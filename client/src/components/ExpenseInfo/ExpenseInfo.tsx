import { Link, useParams } from "react-router-dom";
import { LeftArrowIcon, SquarePenIcon } from "../Icons/Icons";
import { useExpenses } from "../../hooks/useExpenses";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";

export const ExpenseInfo = () => {
  const { getExpenseById, expense, isLoading, errors } = useExpenses();
  const { categories } = useCategories();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getExpenseById(id);
    }
  }, [id]);

  const categoryName = categories.filter((category) => {
    if (String(category.category_id) === String(expense?.category_id)) {
      return category.category_name;
    }
    return null;
  });

  return (
    <div className="w-full text-zinc-900 px-4 py-2 mx-auto mt-10">
      <Link
        to={"/dashboard"}
        className="inline-flex text-lg items-center gap-2 text-zinc-900 hover:underline transition-colors mb-4"
      >
        <LeftArrowIcon />
        <span>Volver al inicio</span>
      </Link>
      <div className="bg-zinc-800 w-full p-6 rounded-lg">
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

        {expense && !isLoading && String(id) === String(expense.id) ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-semibold text-zinc-300 mb-4">
                  Descripción
                </h3>
                <p className="text-zinc-400 text-2xl">{expense.description}</p>
              </div>
              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-300 ">Monto</h3>
                <p className="text-green-400 text-2xl font-bold ">
                  ${expense.amount}
                </p>
              </div>

              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-300">Fecha</h3>
                <p className="text-zinc-400 text-2xl">
                  {expense.expense_date &&
                    new Date(expense.expense_date).toLocaleDateString("es-ES")}
                </p>
              </div>
              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-300">
                  Categoría
                </h3>
                <p className="text-zinc-400 text-2xl">
                  {categoryName.map((category) => category.category_name)}
                </p>
              </div>
              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
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
