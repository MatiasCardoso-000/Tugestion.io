import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";

export const UserProfile = () => {
  const { user } = useAuth();
  const { expenses } = useExpenses();
  return (
    <div className="flex flex-col gap-4 ">
      {" "}
      <div className="p-4 bg-zinc-800 text-white">
        <h1 className="text-6xl font-bold mb-4">Perfil de Usuario</h1>
        <p className="text-3xl">Bienvenido {user?.username}</p>
      </div>
      <div className="flex flex-col gap-22 py-4 px-4">
        <div className="ring-2 ring-zinc-800 inset-shadow-2xs flex  flex-col w-1/3">
          <div className="w-full px-4 py-8 bg-[#f9fafb] text-zinc-900  flex flex-col gap-4">
            <h2 className="font-semibold text-4xl border-b  border-b-zinc-200 py-4">
              Detalles de la cuenta
            </h2>
            <div className="flex items-center gap-2 pt-2">
              <p className="text-xl">Nombre de usuario:</p>
              <span className="text-lg text-zinc-800 mt-1">
                {user?.username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xl">Correo Electrónico:</p>
              <span className="text-lg text-zinc-800">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xl">Miembro desde: </p>
              <span className="text-lg text-zinc-800 mt-1">
                {user?.created_at.split("T")[0].split("-").reverse().join("/")}
              </span>
            </div>
          </div>
          <div className="w-full  px-4 py-8 bg-[#f9fafb]  text-zinc-900 flex flex-col gap-4">
            <h2 className="text-4xl font-semibold mb-4 py-4">
              Total gastos del mes
            </h2>
            <span className="font-bold text-6xl">
              $
              {expenses
                .reduce((acc, expense) => {
                  acc += Number(expense.amount);
                  return acc;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="px-4 py-8 bg-[#f9fafb]  border  text-white">
            <h2 className="text-4xl font-semibold text-zinc-900">
              Total de Gastos Históricos
            </h2>
            <span className="text-zinc-900 font-bold text-6xl">
              $
              {expenses
                .reduce((acc, expense) => {
                  acc += Number(expense.amount);
                  return acc;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
