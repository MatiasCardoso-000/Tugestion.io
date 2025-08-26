import {  useState } from "react";
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
    <div className="relative">
      <Link to={"/dashboard"} className="flex gap-4 p-4">
        <LeftArrowIcon /> Volver al inicio
      </Link>

      <div className="w-full flex flex-col items-center  mt-10">
        <h1 className="w-full px-4 font-bold text-lg">
          Registrar nuevo movimiento
        </h1>
        <select
          onChange={(e) => handleTransaction(e.currentTarget.value)}
          className="px-8 py-1 ring-2 ring-zinc-800 rounded-xl text-lg cursor-pointer"
        >
            <option value="">--</option>

            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
        </select>

        {transaction === "gasto"  && <ExpenseForm transaction={transaction} setTransaction={setTransaction}/>}

        {transaction === "ingreso" && <IncomeForm transaction={transaction}  />}
      </div>
    </div>
  );
};

export default TransactionsForm;
