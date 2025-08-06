import ExpensesList from "../ExpensesList/ExpensesList";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";
import Aside from "../Aside/Aside";

export const DashboardComponent = () => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div className=" w-full flex justify-center">
        <div className="flex flex-col p-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-left">
            Dashboard
          </h2>
          <p className="text-zinc-700 text-xl mb-4">
            Bienvenido a tu panel de gestión de gastos.
          </p>
          <ExpensesList />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Link to={"/dashboard/registrar-gasto"} className="mb-1  w-1/12">
          <Button
            buttonStyle={
              "bg-white ring-2 ring-zinc-900  px-4 py-2 text-zinc-900  flex items-center justify-evenly rounded-2xl text-xl cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors shadow-md "
            }
          >
            <PlusIcon /> Nuevo Gasto
          </Button>
        </Link>
      </div>
    </div>
  );
};
