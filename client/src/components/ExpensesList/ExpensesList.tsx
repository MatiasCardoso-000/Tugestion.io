import ExpenseItem from "../ExpenseItem/ExpenseItem";

// Ejemplo de datos de gastos
const expenses = [
  { id: 1, name: "Supermercado", amount: 1200, date: "2025-07-27" },
  { id: 2, name: "Transporte", amount: 350, date: "2025-07-26" },
  { id: 3, name: "Internet", amount: 800, date: "2025-07-25" },
];

const ExpensesList = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-[70vw] mx-auto">
      <h3 className="text-2xl font-bold text-zinc-800 mb-4">Tus gastos recientes</h3>
      <ul className="divide-y divide-zinc-200">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
