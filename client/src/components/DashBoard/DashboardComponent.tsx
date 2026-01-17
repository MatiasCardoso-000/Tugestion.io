import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { PlusIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";
import { SearchBar } from "../SearchBar/SearchBar";
import TransactionsList from "../TransactionsList/TransactionsList";
import TransactionsListSkeleton from "../TransactionsList/TransactionsListSkeleton";

export const DashboardComponent = () => {
  const { isLoading, transactions } = useTransactions();

  return (
    <div className="w-full flex flex-col justify-between items-center gap-2 px-2 py-8 bg-zinc-50">
      <div className=" w-full flex justify-center">
        <div className="w-full flex flex-col p-2 md:p-6">
          <h2 className="text-4xl font-bold text-zinc-900 mb-8 text-center md:text-left tracking-tighter">
            Dashboard
          </h2>
          <p className="text-zinc-500 text-xl text-center md:text-left">
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
            "bg-indigo-600 px-4 py-2 text-white flex items-center justify-evenly rounded-xl text-sm cursor-pointer hover:bg-indigo-700 transition-colors shadow-xl md:absolute right-10 bottom-10"
          }
        >
          <PlusIcon /> Nuevo Gasto
        </Button>
      </Link>

      {isLoading && <TransactionsListSkeleton />}
      {!isLoading && transactions.length > 0 && (
        <div className="w-full flex flex-col  items-center  justify-center md:px-4 gap-8 md:mt-8">
          <TransactionsList />
        </div>
      )}

      {!isLoading && transactions.length === 0 && (
        <h1 className="text-lg text-zinc-900 text-center mt-8">
          No hay gastos registrados
        </h1>
      )}
      <div className="w-full hidden  justify-end px-4 md:flex  md:mt-4">
        <Link to={"/dashboard/registrar-gasto"}>
          <Button
            buttonStyle={
              "bg-indigo-600 px-4 py-2 text-white flex items-center rounded-xl text-sm cursor-pointer hover:bg-indigo-700 transition-colors shadow-xl"
            }
          >
            <PlusIcon /> Nuevo Gasto
          </Button>
        </Link>
      </div>
    </div>
  );
};
