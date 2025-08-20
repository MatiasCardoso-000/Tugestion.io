import React, { useState } from "react";
import Button from "../Button/Button";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "../../types/categories.types";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import { Expenses } from "../../types/expenses.types";
import { Form } from "../Form/Form";
import { Link } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";
import { useTransactions } from "../../hooks/useExpenses";

const TransactionsForm = () => {
  const { handleSubmit, register } = useForm<any>();

  const { addExpense } = useTransactions();
  const { categories } = useCategories();
  const [showNewIncomeForm, setShowNewIncomeForm] = useState(false);
  const [showNewExpenseForm, setShowExpenseForm] = useState(false);

  const handleNewExpense = async (expense: Expenses[]) => {
    const expenseWithTransactionType = {
      ...expense,
      transaction_type: "gasto",
    };
    addExpense(expenseWithTransactionType);
  };

    const handleNewIncome = async (expense: Expenses[]) => {
    const expenseWithTransactionType = {
      ...expense,
      transaction_type: "ingreso",
    };
    console.log(expenseWithTransactionType);
    
    addExpense(expenseWithTransactionType);
  };

  return (
    <div className="relative">
      <Link to={"/dashboard"} className="flex gap-4 p-4">
        <LeftArrowIcon /> Volver al inicio
      </Link>

      <div className="w-full flex justify-evenly mt-10">
        <Button
          buttonStyle="w-full py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold  cursor-pointer shadow-md  hover:bg-zinc-800  hover:text-white transition-colors  mt-2 md:w-1/10"
          onClick={() => setShowExpenseForm(!showNewExpenseForm)}
        >
          Nuevo gasto
        </Button>
        <Button buttonStyle="w-full py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold  cursor-pointer shadow-md  hover:bg-zinc-800  hover:text-white transition-colors  mt-2 md:w-1/10" onClick={() => setShowNewIncomeForm(!showNewIncomeForm)}>
          Nuevo ingreso
        </Button>
      </div>
      <div className="w-full flex justify-between mt-10">
        {showNewExpenseForm && (
          <div className={`w-full`}>
            <Form
              formStyle={`bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto`}
              onSubmit={handleSubmit(handleNewExpense)}
            >
              <div className="w-full text-right ">
                <button
                  className="font-bold cursor-pointer"
                  onClick={() => setShowExpenseForm(false)}
                  type="button"
                >
                  X
                </button>
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
                Registrar gasto
              </Button>
            </Form>
          </div>
        )}
        {showNewIncomeForm && (
          <div className="w-full">
            <Form
              formStyle="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto "
              onSubmit={handleSubmit(handleNewIncome)}
            >
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                Registrar Ingreso
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

              <Button buttonStyle="w-full py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold text-lg cursor-pointer shadow-md  hover:bg-zinc-800  hover:text-white transition-colors  mt-2">
                Registrar ingreso
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsForm;
