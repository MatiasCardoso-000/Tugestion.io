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
        <span className="font-semibold text-zinc-800 text-xl">{expense.name}</span>
        <span className="block  text-zinc-400 text-xl">{expense.date}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-zinc-900 text-xl">${expense.amount}</span>
        <Link
          to={"/expense/:id"}
          className="p-2 rounded hover:bg-zinc-200 transition-colors"
          title="Ver detalle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye-icon lucide-eye"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
        <button
          className="p-2 rounded hover:bg-red-100 transition-colors cursor-pointer"
          title="Eliminar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash-icon lucide-trash text-red-500 "
          >
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
