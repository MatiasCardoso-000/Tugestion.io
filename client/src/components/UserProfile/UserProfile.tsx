import { useAuth } from "../../hooks/useAuth";
import Budget from "../Budget/Budget";
import { UserIcon, MailIcon } from "../Icons/Icons";

export const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <UserIcon />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Perfil de Usuario</h1>
              <p className="text-indigo-100 text-lg md:text-2xl">Bienvenido, {user?.username}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 px-8 py-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Detalles de la cuenta
              </h2>
              <p className="text-zinc-500 text-sm">Información personal de tu cuenta</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <UserIcon />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-500 mb-1">Nombre de usuario</p>
                <p className="text-xl font-semibold text-zinc-900">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <MailIcon />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-500 mb-1">Correo Electrónico</p>
                <p className="text-lg font-medium text-zinc-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-500 mb-1">Miembro desde</p>
                <p className="text-lg font-medium text-zinc-900">
                  {new Date(user?.created_at).toLocaleDateString("es-ES", { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">Control de gastos</h3>
              <p className="text-zinc-500 text-sm">Gestiona tus presupuestos mensuales</p>
            </div>
          </div>
          <Budget />
        </div>
      </div>
    </div>
  );
};
