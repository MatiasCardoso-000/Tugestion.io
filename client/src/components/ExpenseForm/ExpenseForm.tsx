import { useForm } from "react-hook-form";
import { Category } from "../../types/categories.types";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";
import { useState } from "react";


export const ExpenseForm = ({ transaction, setTransaction }: { transaction: string, setTransaction: (value: string) => void }) => {
  const [openForm, setOpenForm] = useState(true)
  const { handleSubmit, register, reset } = useForm<any>();

  const { addExpense } = useTransactions();
  const { categories } = useCategories();


  const handleNewExpense = async (expense: Transactions[]) => {
    const expenseWithTransactionType = {
      ...expense,
      transaction_type: transaction
    };
    addExpense(expenseWithTransactionType);
  };

  const showForm = () => {
    setOpenForm(false)
    setTransaction("")
    reset()
    console.log(transaction);

  }

  return (
    <div className={`w-full max-w-lg mx-auto mt-6 ${openForm ? "block" : "hidden"}`}>
      <Form
        formStyle="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg border border-red-200 p-8 flex flex-col gap-5 relative"
        onSubmit={handleSubmit(handleNewExpense)}
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-red-100 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
          onClick={showForm}
        >
          ✕
        </button>

        <div className="text-center pb-4 border-b border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">💸</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-800">
            Registrar Gasto
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Registra un nuevo gasto en tu cuenta</p>
        </div>

        <div>
          <label
            className="block text-zinc-700 font-semibold mb-2"
            htmlFor="amount"
          >
            Monto
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">$</span>
            <Input
              register={{ ...register("amount", { required: true }) }}
              type="number"
              inputStyle="w-full pl-8 pr-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="0.00"
              required
              id="amount"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-zinc-700 font-semibold mb-2"
            htmlFor="description"
          >
            Descripción
          </label>
          <Input
            type="text"
            register={{ ...register("description", { required: true }) }}
            inputStyle="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Ej: Supermercado, alquiler, etc."
            required
            id="description"
          />
        </div>

        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Categoría
          </label>
          <select
            {...register(`category_id`, { required: true })}
            defaultValue={""}
            className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-pointer appearance-none"
          >
            <option
              disabled
              value=""
              className="text-zinc-400"
            >
              Seleccionar categoría...
            </option>
            {categories.map((category: Category) => {
              return (
                <option
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </div>

        <Button buttonStyle="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-lg cursor-pointer shadow-md hover:bg-red-700 hover:shadow-lg transition-all mt-2">
          ✓ Registrar Gasto
        </Button>
      </Form>
    </div>
  )
}