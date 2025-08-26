import { useAuth } from "../../hooks/useAuth";
import Budget from "../Budget/Budget";

export const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4 ">
      {" "}
      <div className="w-full p-4 bg-zinc-800 text-white">
        <h1 className="xl:text-6xl font-bold mb-4">Perfil de Usuario</h1>
        <p className="xl:text-3xl">Bienvenido {user?.username}</p>
      </div>
      <div className="flex flex-col w-full  px-2">
        <div className="flex flex-col  py-4 px-4">
          <div className=" flex justify-center w-full">
              <div className="w-full px-4 py-8  text-zinc-900  flex flex-col gap-4">
                <h2 className="font-semibold xl:text-4xl border-b  border-b-zinc-200 py-4">
                  Detalles de la cuenta
                </h2>
                <div className="flex items-center gap-2 pt-2">
                  <p className="xl:text-xl font-semibold">Nombre de usuario:</p>
                  <span className="xl:text-lg text-zinc-800 mt-1">
                    {user?.username}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="xl:text-xl font-semibold">Correo Electrónico:</p>
                  <span className="xl:text-lg text-zinc-800">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold">Miembro desde: </p>
                  <span className="text-lg text-zinc-800 mt-1">
                    {new Date(user?.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>
            </div>
            {/* <div>
              {" "}
              <div className="px-4 py-8 text-zinc-900 flex flex-col ">
                <h2 className="text-4xl font-semibold">Total gastos del mes</h2>
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
              <div className="px-4 py-8 text-white">
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
            </div> */}
          </div>
        </div>
        <h3 className="font-bold text-2xl text-center py-4">
          Control de gastos
        </h3>
        <div className="w-full flex justify-center">
          <Budget />
       
        </div>
      </div>
    </div>
  );
};
