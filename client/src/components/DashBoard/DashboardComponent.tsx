import ExpensesList from "../ExpensesList/ExpensesList";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";
import { useExpenses } from "../../hooks/useExpenses";

export const DashboardComponent = () => {
  const { isLoading, expenses } = useExpenses();

  return (
    <div className="w-full flex flex-col justify-between items-center gap-8">
      <Link to={"/dashboard/registrar-gasto"} className="mb-1  w-1/12">
        <Button
          buttonStyle={
            "bg-white ring-2 ring-zinc-900  px-4 py-2 text-zinc-900  flex items-center justify-evenly rounded-2xl text-xl cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors shadow-md absolute right-10 bottom-10"
          }
        >
          <PlusIcon /> Nuevo Gasto
        </Button>
      </Link>
      <div className=" w-full flex justify-center">
        <div className="w-full flex flex-col p-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-left">
            Dashboard
          </h2>
          <p className="text-zinc-700 text-xl mb-4">
            Bienvenido a tu panel de gestión de gastos.
          </p>
        </div>
      </div>

      {isLoading && <p>Cargando...</p>}

      {!isLoading && expenses.length > 0 && (
        <div className="w-full flex flex-col items-center  justify-center gap-8">
          <ExpensesList />
        </div>
      )}

      {!isLoading && expenses.length === 0 && (
        <h1 className="text-lg text-zinc-400 text-center">
          No hay gastos registrados
        </h1>
      )}
    </div>
  );
};
