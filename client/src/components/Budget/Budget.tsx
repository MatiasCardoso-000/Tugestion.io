import React, { useState } from "react";
import Button from "../Button/Button";
import { Category } from "../../types/categories.types";
import { useCategories } from "../../hooks/useCategories";
import { useForm } from "react-hook-form";
import { useBudgets } from "../../hooks/useBudgets";
import { BudgetType } from "../../types/budget.types";

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [totalAmount, setTotalBudget] = useState(0);
  const { register,handleSubmit } = useForm<BudgetType>();

  const { createBudget } = useBudgets();

  const { categories } = useCategories();


  const onSubmit = async (data:BudgetType)=> {
    createBudget({
      budget_amount: Number(data.budget_amount),
      budget_period: data.budget_period,
      category_id: data.category_id,
    })
  } 


  return (
    <div className="budget-form-container w-full ring-2 ring-zinc-50 py-2 px-4">
      <div
        className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-6"
        role="alert"
      >
        <div className="flex items-center">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-blue-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2v-4h-2zm0-4h2v2h-2V7z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Presupuesto Total</p>
            <p className="text-2xl font-semibold">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Agregar presupuesto
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg shadow-md mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="budgetAmount" className="text-lg font-semibold">
              Monto del presupuesto: ${budgetAmount}
            </label>
            <input
              type="text"
              id="budgetAmount"
              placeholder="Ej: 1000"
               {...register(`budget_amount`, { required: true })}
              className="
                /* Estilos base del input */
                p-2 rounded-md border border-gray-300
                text-gray-900 bg-white
                
                /* Apariencia para remover la flecha del input */
                appearance-none
                
                /* Estilos para el focus */
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                
                /* Estilo del cursor */
                cursor-pointer
              "
            />
          </div>
          <div className="form-group flex flex-col gap-2 ">
            <label htmlFor="budgetMonth" className="text-lg font-semibold">
              Mes y Año:
            </label>
            <input
              type="date"
              id="budgetMonth"
               {...register(`budget_period`, { required: true })}
              className="
                /* Estilos base del input */
                p-2 rounded-md border border-gray-300
                text-gray-900 bg-white
                
                /* Apariencia para remover la flecha del input */
                appearance-none
                
                /* Estilos para el focus */
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                
                /* Estilo del cursor */
                cursor-pointer
              "
            />
          </div>
          <div className="form-group flex flex-col gap-2 ">
            <label htmlFor="budgetMonth" className="text-lg font-semibold">
              Categoria
            </label>
            <select
              {...register(`category_id`, { required: true })}
              defaultValue={""}
              className="
                /* Estilos base del input */
                p-2 rounded-md border border-gray-300
                text-gray-900 bg-white
                
                /* Apariencia para remover la flecha del input */
                appearance-none
                
                /* Estilos para el focus */
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                
                /* Estilo del cursor */
                cursor-pointer
              "
            >
              <option
                disabled
                defaultValue={""}
                className="disabled:hidden text-zinc-400"
              >
                Ej: Transporte
              </option>
              {categories.map((category: Category) => {
                return (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                    className="w-full"
                  >
                    {category.category_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button buttonStyle="px-6 py-2 bg-zinc-900 text-white font-semibold rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition duration-150 ease-in-out cursor-pointer">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Budget;
