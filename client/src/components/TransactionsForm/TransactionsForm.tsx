import { useState } from "react";
import { Link } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";
import { ExpenseForm } from "../ExpenseForm/ExpenseForm";
import { IncomeForm } from "../IncomeForm/IncomeForm";

const TransactionsForm = () => {
  const [transaction, setTransaction] = useState<string>("");

  const handleTransaction = (transaction: string) => {
    setTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to={"/dashboard"}
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-indigo-600 transition-colors font-medium mb-8"
        >
          <LeftArrowIcon /> Volver al inicio
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-800 mb-2">
              Registrar Movimiento
            </h1>
            <p className="text-zinc-500">Selecciona el tipo de movimiento que deseas registrar</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-sm">
              <label className="block text-zinc-700 font-semibold mb-2 text-center">
                Tipo de movimiento
              </label>
              <select
                onChange={(e) => handleTransaction(e.currentTarget.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none text-center font-medium text-zinc-700"
              >
                <option value="">Seleccionar...</option>
                <option value="gasto">💸 Gasto</option>
                <option value="ingreso">💰 Ingreso</option>
              </select>
            </div>

            {transaction === "gasto" && <ExpenseForm transaction={transaction} setTransaction={setTransaction} />}

            {transaction === "ingreso" && <IncomeForm transaction={transaction} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsForm;
