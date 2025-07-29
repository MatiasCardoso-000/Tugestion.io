import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        <span className="font-semibold text-zinc-800">{expense.name}</span>
        <span className="block text-xs text-zinc-400">{expense.date}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-zinc-900">${expense.amount}</span>
        <Link to={'/expense/:id'}
          className="p-2 rounded hover:bg-zinc-200 transition-colors"
          title="Ver detalle"
        >
          <FaEye className="text-zinc-600" />
        </Link>
        <button
          className="p-2 rounded hover:bg-red-100 transition-colors"
          title="Eliminar"
        >
          <FaTrash className="text-red-500" />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
