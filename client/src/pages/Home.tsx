import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col gap-4  text-center justify-center items-center">
      <h1 className="text-6xl font-bold text-shadow-zinc-900 mb-8">
        TuGestión.io
      </h1>
      <Link
        to={"/login"}
        className="w-48 inline-block text-center px-8 py-2 bg-white text-zinc-900 ring-2 ring-zinc-900 rounded-lg font-bold text-base cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white transition-colors"
      >
        Iniciar sesión
      </Link>
      <Link
        to={"/register"}
        className="w-48 inline-block text-center px-8 py-2 bg-white text-zinc-900 ring-2 ring-zinc-900 rounded-lg font-bold text-base cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white transition-colors"
      >
        Registrase
      </Link>
    </div>
  );
};
