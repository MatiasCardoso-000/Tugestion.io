import { Link, useParams } from "react-router-dom";
import { LeftArrowIcon, SquarePenIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";

export const TransactionInfo = () => {
  const { getExpenseById, transaction, isLoading, errors } = useTransactions();
  const { categories } = useCategories();
  const { transaction_id } = useParams();

  const isExpense = transaction?.transaction_type === "gasto";
  const amountColor = isExpense ? "text-red-400" : "text-green-400";

    const categoryName = categories
    .find((c) => {
      return (
         c.category_id === transaction?.category_id
      );
    })?.category_name || "-"


  useEffect(() => {
    if (transaction_id) {
      getExpenseById(transaction_id);
    }
  }, [transaction_id]);

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

        {transaction && !isLoading && String(transaction_id) === String(transaction.transaction_id) ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-semibold text-zinc-300 mb-4">
                  Descripción
                </h3>
                <p className="text-zinc-400 text-2xl">
                  {transaction.description}
                </p>
              </div>
              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-300 ">Monto</h3>
                <p className={`${amountColor} text-2xl font-bold`}>
                  ${transaction.amount}
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
                  {transaction.date &&
                    new Date(transaction.date).toLocaleDateString(
                      "es-ES"
                    )}
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
                  {categoryName}
                </p>
              </div>
              <Button>
                <SquarePenIcon styleType={"text-zinc-400"} />
              </Button>
            </div>
          </div>
        ) : !isLoading && !transaction && errors.length === 0 ? (
          <p className="text-zinc-500 text-lg text-center">
            No se pudo cargar la información del gasto o el gasto no existe.
          </p>
        ) : null}
      </div>
    </div>
  );
};
