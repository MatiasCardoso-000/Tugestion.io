import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Category } from "../../types/categories.types";
import { useCategories } from "../../hooks/useCategories";
import { useForm } from "react-hook-form";
import { useBudgets } from "../../hooks/useBudgets";
import { BudgetType } from "../../types/budget.types";
import { TrashIcon } from "../Icons/Icons";

const Budget = () => {
  const { register, handleSubmit } = useForm<BudgetType>();

  const { createBudget, deleteBudget, budgets, getBudgets, errors } =
    useBudgets();

  const { categories } = useCategories();

  const onSubmit = async (data: BudgetType) => {
    const month = new Date(data.budget_period).getMonth() + 1;
    const year = new Date(data.budget_period).getFullYear();

    createBudget({
      amount: Number(data.budget_amount),
      month: month,
      year: year,
      category_id: data.category_id,
    });
  };

  useEffect(() => {
    getBudgets();
  }, []);

  const total = budgets.reduce((acc, budget) => {
    return acc + Number(budget.amount);
  }, 0);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-600 mb-1">Presupuesto Total</p>
            <p className="text-3xl font-bold text-zinc-900">${total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Agregar presupuesto</h2>
            <p className="text-zinc-500 text-sm">Define un límite para tus gastos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="budgetAmount" className="text-sm font-semibold text-zinc-700">
                Monto del presupuesto
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">$</span>
                <input
                  type="number"
                  id="budgetAmount"
                  placeholder="Ej: 1000"
                  {...register(`budget_amount`, { required: true })}
                  className="w-full pl-8 pr-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budgetMonth" className="text-sm font-semibold text-zinc-700">
                Mes y Año
              </label>
              <input
                type="date"
                id="budgetMonth"
                {...register(`budget_period`, { required: false })}
                className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budgetCategory" className="text-sm font-semibold text-zinc-700">
                Categoría
              </label>
              <select
                {...register(`category_id`, { required: true })}
                defaultValue={""}
                className="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer appearance-none"
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
          </div>

          <div className="text-right">
            <Button buttonStyle="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
              Agregar Presupuesto
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-zinc-900">Presupuestos por categoría</h3>
            <p className="text-zinc-500 text-sm">Tus límites establecidos</p>
          </div>
        </div>

        {budgets.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {
              const categoryName = categories.find(
                (c) => c.category_id === budget.category_id
              )?.category_name;

              return (
                <li
                  key={budget.budget_id}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-zinc-900 text-lg mb-1">{categoryName}</p>
                      <p className="text-2xl font-bold text-indigo-600">${budget.amount.toLocaleString()}</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        Período: {budget.month}/{budget.year}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBudget(budget.budget_id)}
                    className="self-end p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-zinc-600 text-lg font-medium mb-1">
              No hay presupuestos configurados
            </p>
            <p className="text-zinc-400 text-sm">
              Agrega tu primer presupuesto para empezar a controlar tus gastos
            </p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-6">
            {errors.map((e, index) => (
              <div key={index} className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl font-medium">
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
