import React, { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el registro del gasto
    // Por ejemplo, llamar a un context o API
    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto"
    >
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">Registrar gasto</h2>
      <div>
        <label className="block text-zinc-700 font-semibold mb-1">Monto</label>
        <input
          type="number"
          className="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
          placeholder="Ej: 1000"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-zinc-700 font-semibold mb-1">Descripción</label>
        <input
          type="text"
          className="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
          placeholder="Ej: Supermercado, alquiler, etc."
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2"
      >
        Registrar gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
