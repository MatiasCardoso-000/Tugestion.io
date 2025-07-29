// Componente para el formulario de Login
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { User } from "../../types/user.types";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const {
    signIn,
    isAuthenticated,
    errors: LoginErrors,
  } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    signIn(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen w-full flex items-center bg-zinc-100">
      <div className="flex w-full h-full">
        <div className="absolute top-10 right-20">
          <h1 className="text-6xl font-extrabold text-zinc-800">
            TuGestión.io
          </h1>
        </div>
        <div className="flex items-center justify-start w-1/2 h-full pl-60">
          <Form
            formStyle={
              "p-12 rounded-xl shadow-2xl bg-white max-w-lg w-full min-h-[500px] flex flex-col justify-center"
            }
            titleStyle={"text-3xl font-bold text-zinc-900 mb-8 text-left"}
            title={"Inicia sesión"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              inputStyle={
                "w-full p-3 mb-6 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              type="email"
              placeholder="email"
              register={{ ...register("email", { required: true }) }}
            />
            {
              errors.email && <div>El email es requerido</div>
            }
            <Input
              inputStyle={
                "w-full p-3 mb-8 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              type="password"
              placeholder="Contraseña"
              register={{ ...register("password", { required: true }) }}
            />
              {
              errors.password && <div>El password es requerido</div>
            }
            <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors">
              Iniciar sesión
            </Button>
            <div className="mt-4 text-center">
              <Link
                to="/register"
                className="text-zinc-700 hover:text-zinc-900 underline"
              >
                ¿No tienes una cuenta? Regístrate
              </Link>
            </div>
          </Form>
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
};
