// Componente para el formulario de Login
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { User } from "../../types/user.types";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { KeyIcon, UserIcon } from "../Icons/Icons";

export const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { signIn, isAuthenticated, errors: LoginErrors } = useAuth();

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
    <div className="h-screen w-full items-center bg-white">
      <div className="flex w-full h-full">
        <div className="absolute top-10 right-20">
          <Link to={"/"} className="text-6xl font-extrabold text-zinc-800">
            TuGestión.io
          </Link>
        </div>
        <div className="flex flex-col items-center w-full h-full gap-7">
          {LoginErrors.map((error, i) => {
            return (
              <div
                className="bg-red-500 p-3 rounded-md text-white w-1/4 text-center text-sm "
                key={i}
              >
                {error}
              </div>
            );
          })}

          <Form
            formStyle={
               " max-w-lg w-2/9 h-2/5 mt-28 px-4 py-6 rounded-[6%] inset-shadow-sm shadow-xl bg-white  flex flex-col justify-between gap-2"
            }
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full text-center ">
              <h3 className="font-bold text-lg">TuGestión.io</h3>
              <p>Inicia sesión</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Correo Electrónico
                </label>
                <div className="w-full relative flex items-center bg-zinc-50 border border-zinc-300 rounded-md">
                  <div className="text-zinc-400 px-2">
                    <UserIcon />
                  </div>

                  <Input
                    inputStyle={
                      "w-full p-2 text-zinc-900 placeholder-zinc-400 focus:outline-zinc-400 "
                    }
                    type="email"
                    id="email"
                    placeholder="Correo Electrónico"
                    register={{ ...register("email", { required: true }) }}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="bg-red-400 text-white p-2 rounded-md">
                    El correo electrónico es requerido
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-semibold">
                  Contraseña
                </label>

                <div className="w-full relative flex items-center bg-zinc-50 border border-zinc-300 rounded-md">
                  <div className="text-zinc-400 px-2">
                    <KeyIcon />
                  </div>
                  <Input
                    inputStyle={
                      "w-full p-2  bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-zinc-400 "
                    }
                    type="password"
                    placeholder="Contraseña"
                    register={{ ...register("password", { required: true }) }}
                    required
                    id="password"
                  />
                </div>
                {errors.password && (
                  <div className="bg-red-400 text-white p-2 rounded-md">
                    La contraseña es requerida
                  </div>
                )}
              </div>
            </div>
              <Button buttonStyle="w-full py-2  bg-white text-zinc-900 ring-2 ring-zinc-900 rounded-lg font-semibold text-lg cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white  transition-colors">
                Iniciar sesión
              </Button>

            <div className="text-center">
              <Link
                to="/register"
                className="text-zinc-700 hover:text-zinc-900"
              >
                ¿No tienes una cuenta?{" "}
                <span className="text-blue-400 font-bold">Regístrate</span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
