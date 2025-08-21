import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { SearchBar } from "../SearchBar/SearchBar";
import TransactionsList from "../TransactionsList/TransactionsList";

export const DashboardComponent = () => {
  const { isLoading, transactions } = useTransactions();

  return (
    <div className="w-full flex flex-col justify-between items-center gap-2 px-2 py-8 bg-slate-50">
      <div className=" w-full flex justify-center">
        <div className="w-full flex flex-col p-2 md:p-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center md:text-left">
            Dashboard
          </h2>
          <p className="text-slate-700 text-xl text-center md:text-left">
            Bienvenido a tu panel de gestión de gastos.
          </p>
        </div>
      </div>
      <SearchBar />

      <Link
        to={"/dashboard/registrar-gasto"}
        className="mt-4 md:hidden md:w-1/12"
      >
        <Button
          buttonStyle={
            "bg-blue-600 px-4 py-2 text-white flex items-center justify-evenly rounded-full text-sm cursor-pointer hover:bg-blue-700 transition-colors shadow-lg md:absolute right-10 bottom-10"
          }
        >
          <PlusIcon /> Nuevo Gasto
        </Button>
      </Link>

      {isLoading && <p>Cargando...</p>}

      {!isLoading && transactions.length > 0 && (
        <div className="w-full flex flex-col  items-center  justify-center md:px-4 gap-8 md:mt-8">
          <TransactionsList />
        </div>
      )}

      {!isLoading && transactions.length === 0 && (
        <h1 className="text-lg text-slate-900 text-center mt-8">
          No hay gastos registrados
        </h1>
      )}
      <div className="w-full hidden  justify-end px-4 md:flex  md:mt-4">
        <Link to={"/dashboard/registrar-gasto"}>
          <Button
            buttonStyle={
              "bg-blue-600 px-4 py-2 text-white flex items-center rounded-full text-sm cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
            }
          >
            <PlusIcon /> Nuevo Gasto
          </Button>
        </Link>
      </div>
    </div>
  );
};
