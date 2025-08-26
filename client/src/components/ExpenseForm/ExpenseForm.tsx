import { useForm } from "react-hook-form";
import { Category } from "../../types/categories.types";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useTransactions } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { Transactions } from "../../types/transcations.types";
import { useState } from "react";


export const ExpenseForm = ({transaction,setTransaction}) => {
  const [openForm, setOpenForm] = useState(true)
    const { handleSubmit, register,reset } = useForm<any>();
  
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
      <div className={`w-full`}>
            <Form
              formStyle={`bg-white rounded-xl shadow-2xl max-w-xl w-full p-8 flex flex-col gap-6 mt-8 mx-auto ${openForm ? "block" : "hidden"}`}
              onSubmit={handleSubmit(handleNewExpense)}
            >
              <div className="w-full text-right font-bold cursor-pointer" onClick={showForm}>
                X
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                Registrar gasto
              </h2>
              <div>
                <label
                  className="block text-zinc-700 font-semibold mb-1"
                  htmlFor="amount"
                >
                  Monto
                </label>
                <Input
                  register={{ ...register("amount", { required: true }) }}
                  type="text"
                  inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                  placeholder="Ej: 1000"
                  required
                  id="amount"
                />
              </div>
              <div>
                <label
                  className="block text-zinc-700 font-semibold mb-1"
                  htmlFor="description"
                >
                  Descripción
                </label>
                <Input
                  type="text"
                  register={{ ...register("description", { required: true }) }}
                  inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                  placeholder="Ej: Supermercado, alquiler, etc."
                  required
                  id="description"
                />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">
                  Categoria
                </label>

                <select
                  {...register(`category_id`, { required: true })}
                  defaultValue={""}
                  className="border rounded-md p-3 w-full bg-zinc-50 text-shadow-zinc-900 focus:outline-none"
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
            
              <Button buttonStyle="w-full py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold text-lg cursor-pointer shadow-md  hover:bg-zinc-800  hover:text-white transition-colors  mt-2">
                Registrar 
              </Button>
            </Form>
          </div>
  )
}