import { useForm } from "react-hook-form";
import { Transactions } from "../../types/transcations.types";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useTransactions } from "../../hooks/useExpenses";

export const IncomeForm = ({ transaction }: { transaction: string }) => {
  const { handleSubmit, register } = useForm<any>();

  const { addExpense } = useTransactions();

  const handleNewIncome = async (expense: Transactions[]) => {
    const expenseWithTransactionType = {
      ...expense,
      transaction_type: transaction,
    };
    addExpense(expenseWithTransactionType);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <Form
        formStyle="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg border border-emerald-200 p-8 flex flex-col gap-5"
        onSubmit={handleSubmit(handleNewIncome)}
      >
        <div className="text-center pb-4 border-b border-emerald-200">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">💰</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-800">
            Registrar Ingreso
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Añade un nuevo ingreso a tu cuenta</p>
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
              inputStyle="w-full pl-8 pr-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
            inputStyle="w-full px-4 py-3 border border-zinc-300 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="Ej: Salario, freelance, venta..."
            required
            id="description"
          />
        </div>

        <Button buttonStyle="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-lg cursor-pointer shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all mt-2">
          ✓ Registrar Ingreso
        </Button>
      </Form>
    </div>
  );
};
