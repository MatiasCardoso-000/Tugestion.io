import React, { useState } from "react";
import Button from "../Button/Button";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "../../types/categories.types";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import { useExpenses } from "../../hooks/useExpenses";
import { Expenses } from "../../types/expenses.types";
import { Form } from "../Form/Form";
import { Link } from "react-router-dom";
import { LeftArrowIcon } from "../Icons/Icons";

const ExpenseForm = () => {
  const { handleSubmit, register } = useForm<any>();

  const { addExpense } = useExpenses();
  const { categories, createCategory } = useCategories();

  const handleNewCategory = async (data: Category) => {
    createCategory(data);
  };

  const handleNewExpense = async (expense: Expenses[]) => {
    addExpense(expense);
  };

  return (
    <div className="relative">
      <Link to={"/dashboard"} className="flex gap-4 p-4">
        <LeftArrowIcon /> Volver al inicio
      </Link>
      <Form
        formStyle="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto "
        onSubmit={handleSubmit(handleNewExpense)}
      >
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          Registrar gasto
        </h2>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Monto
          </label>
          <Input
            register={{ ...register("amount", { required: true }) }}
            type="text"
            inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            placeholder="Ej: 1000"
            required
          />
        </div>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Descripción
          </label>
          <Input
            type="text"
            register={{ ...register("description", { required: true }) }}
            inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            placeholder="Ej: Supermercado, alquiler, etc."
            required
          />
        </div>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Categoria
          </label>
          <select className="border rounded-md p-3 w-full bg-zinc-50 text-shadow-zinc-900 focus:outline-none">
            <option disabled selected className="disabled:hidden text-zinc-400">
              Ej: Transporte
            </option>
            {categories.map((category: Category) => {
              return (
                <option
                  key={category.category_id}
                  value={category.category_id}
                  className="w-full"
                  {...register(`category_id`, { required: true })}
                >
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </div>
        <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md  hover:bg-zinc-800  transition-colors  mt-2">
          Registrar gasto
        </Button>
      </Form>
      {/* {createNewCategory && (
        <form
          className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto absolute right-20 top-36"
          onSubmit={handleSubmit(handleNewCategory)}
        >
          <div>
            <label className="block text-zinc-700 font-semibold mb-1">
              Nueva categoría
            </label>
            <Input
              type="text"
              inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              placeholder="Ej: Ropa"
              register={{ ...register("category_name", { required: true }) }}
              required
            />
          </div>
          <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
            Agregar categoría
          </Button>
        </form>
      )} */}
    </div>
  );
};

export default ExpenseForm;
