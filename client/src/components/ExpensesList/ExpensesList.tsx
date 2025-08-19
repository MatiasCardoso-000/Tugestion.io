import { useEffect } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { useFilter } from "../../hooks/useFilter";
import { useSearch } from "../../hooks/useSearch";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";

const ExpensesList = () => {
  const { expenses } = useExpenses();
  const { inputValue, resetSearch } = useSearch();
  const { filteredExpenses } = useFilter();
  const filterExpenses = filteredExpenses(expenses, inputValue);

  useEffect(() => {
    resetSearch();
  },[]);

  return (
    <div className="bg-white  rounded-sm inset-shadow-sm shadow-xl p-6 mt-6 w-full mx-auto">
      <h3 className="text-lg md:text-2xl text-center md:text-left font-semibold text-zinc-800 mb-4">
        Tus gastos recientes
      </h3>
      {filterExpenses.length > 0 ? (
        <ul className="divide-y divide-zinc-200">
          {filterExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </ul>
      ) : (
        <h1 className="text-lg text-zinc-900 text-center  py-8">
          El gasto que busca no existe
        </h1>
      )}
    </div>
  );
};

export default ExpensesList;
