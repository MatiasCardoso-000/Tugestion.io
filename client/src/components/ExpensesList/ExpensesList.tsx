import { useExpenses } from "../../hooks/useExpenses";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";

const ExpensesList = () => {
  const { expenses } = useExpenses();
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-[70vw] mx-auto">
      <h3 className="text-2xl font-bold text-zinc-800 mb-4">
        Tus gastos recientes
      </h3>
      <ul className="divide-y divide-zinc-200">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.expense_id} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
