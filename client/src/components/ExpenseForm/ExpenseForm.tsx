import React, { useState } from "react";
import Button from "../Button/Button";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "../../types/categories.types";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [createNewCategory, setCreateNewCategory] = useState(false);
  const { handleSubmit, register } = useForm<Category>();
  const { categories, createCategory } = useCategories();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Aquí puedes manejar el registro del gasto
  //   // Por ejemplo, llamar a un context o API
  //   setAmount("");
  //   setDescription("");
  // };

  const onSubmit = async (data: Category) => {
    createCategory(data);
  };

  return (
    <div className="relative">
      <Button
        buttonStyle="w-1/11 py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2 absolute right-20"
        onClick={() => {
          setCreateNewCategory(!createNewCategory);
        }}
      >
        Crear Categoria
      </Button>

      <form className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto ">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          Registrar gasto
        </h2>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Monto
          </label>
          <input
            type="number"
            className="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            placeholder="Ej: 1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Descripción
          </label>
          <input
            type="text"
            className="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
            placeholder="Ej: Supermercado, alquiler, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">
            Categoria
          </label>
          <select className="border rounded-md p-3 w-full bg-zinc-50 text-shadow-zinc-900 focus:outline-none  ">
            <option
              value=""
              disabled
              selected
              className="disabled:hidden text-zinc-400"
            >
              Ej: Transporte
            </option>
            {categories.map((category: Category) => {
              return (
                <option key={category.category_id} className="w-full ">
                    {category.category_name} 
                </option>
              );
            })}
          </select>
        </div>
        <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
          Registrar gasto
        </Button>
      </form>
      {createNewCategory && (
        <form
          className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto absolute right-20 top-20"
          onSubmit={handleSubmit(onSubmit)}
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
            />
          </div>
          <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
            Agregar categoría
          </Button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
