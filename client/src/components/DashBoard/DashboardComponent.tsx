import ExpensesList from "../ExpensesList/ExpensesList";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";

export const DashboardComponent = () => {
  return (
    <div className="pt-24 flex flex-col  min-h-screen bg-zinc-100">
      <Button
        buttonStyle={
          "bg-zinc-900 p-2 text-zinc-50 w-1/12 flex items-center justify-evenly rounded-2xl text-xl cursor-pointer hover:bg-zinc-800 absolute right-20"
        }
      >
        <PlusIcon />
        <Link to={"/dashboard/registrar-gasto"} className="mb-1">
          {" "}
          Nuevo Gasto
        </Link>
      </Button>
      <div className="p-12   w-fullflex flex-col justify-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-left">
          Dashboard
        </h2>
        <p className="text-zinc-700 text-xl mb-4">
          Bienvenido a tu panel de gestión de gastos.
        </p>
      </div>
      <ExpensesList />
    </div>
  );
};
