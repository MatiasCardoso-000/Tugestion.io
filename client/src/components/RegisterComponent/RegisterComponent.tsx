// Componente para el formulario de Registro
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user.types";
import { useEffect, useState } from "react";
import { BarChart3, Key, Mail, User as UserIconLucide, ArrowLeft, EyeClosed, Eye } from "lucide-react";

export const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit = async (data: User) => {
    signUp(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors font-medium">
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-zinc-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-200">
            <BarChart3 size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Crear cuenta</h1>
          <p className="text-zinc-500">Únete a TuGestión.io gratis</p>
        </div>

        {RegisterErrors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {RegisterErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <Form
          formStyle="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-zinc-700 ml-1">
                Nombre de usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIconLucide size={18} />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="TuUsuario"
                  inputStyle="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
                  register={{ ...register("username", { required: true }) }}
                  required
                />
              </div>
              {errors.username && (
                <span className="text-xs text-red-500 ml-1">El nombre de usuario es requerido</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700 ml-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  inputStyle="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
                  register={{ ...register("email", { required: true }) }}
                  required
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 ml-1">El correo es requerido</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-zinc-700 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Key size={18} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  inputStyle="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
                  register={{ ...register("password", { required: true }) }}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400">
                  {
                    showPassword ? <button type="button" className="text-zinc-400 cursor-pointer" onClick={() => setShowPassword(false)}><Eye /></button> : <button type="button" className="text-zinc-400 cursor-pointer" onClick={() => setShowPassword(true)}><EyeClosed /></button>
                  }
                </div>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500 ml-1">La contraseña es requerida</span>
              )}
            </div>
          </div>

          <Button buttonStyle="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
            Registrarse
          </Button>

          <p className="text-center text-zinc-600 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
