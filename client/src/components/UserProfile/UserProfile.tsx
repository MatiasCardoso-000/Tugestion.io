import {useAuth} from "../../hooks/useAuth";

export const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Perfil de usuario</h2>
        <p className="text-zinc-500">No hay información de usuario disponible.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-bold text-zinc-800 mb-4">Perfil de usuario</h2>
      <div className="mb-2">
        <span className="font-semibold text-zinc-700">Usuario: </span>
        <span className="text-zinc-600">{user.username || user.email}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-zinc-700">Email: </span>
        <span className="text-zinc-600">{user.email}</span>
      </div>
      {/* Agrega más campos si tu objeto user tiene más información */}
    </div>
  );
};


