import React from "react";
import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon } from "../Icons/Icons";
import Button from "../Button/Button";

interface ExpenseItemProps {
  expense: {
    id: number;
    name: string;
    amount: number;
    date: string;
  };
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li className="flex justify-between items-center py-3 px-2 hover:bg-zinc-50 rounded transition-colors">
      <div>
        <span className="font-semibold text-zinc-800 text-xl">
          {expense.name}
        </span>
        <span className="block  text-zinc-400 text-xl">{expense.date}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-zinc-900 text-xl">
          ${expense.amount}
        </span>
        <Link
          to={"/expense/:id"}
          className="p-2 rounded hover:bg-zinc-200 transition-colors"
          title="Ver detalle"
        >
          <EyeIcon />
        </Link>
        <Button
          buttonStyle="p-2 rounded hover:bg-red-100 transition-colors cursor-pointer"
     
        >
          <TrashIcon/>
        </Button>
      </div>
    </li>
  );
};

export default ExpenseItem;
