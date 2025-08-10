// Componente para el formulario de Registro

import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user.types";
import { useEffect } from "react";
import { KeyIcon, UserIcon } from "../Icons/Icons";

export const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    signUp(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full h-full flex flex-col items-center">
        <div className="mt-4 md:mt-0 md:absolute top-10 right-20">
          <Link to={"/"}className=" text-2xl  md:text-6xl font-extrabold text-zinc-800">
            TuGestión.io
          </Link>
        </div>
        <div className="w-full h-screen  flex flex-col items-center justify-center md:justify-start  gap-7">
          {RegisterErrors.map((error, i) => {
            return (
              <div
                className="bg-red-500 p-3 rounded-md text-white w-1/2 text-xl"
                key={i}
              >
                {error}
              </div>
            );
          })}
          <Form
            formStyle={
              "h-full  w-full md:w-1/2  xl:w-1/3 md:h-2/5 mt-28 px-4 py-6 rounded-[6%] bg-white  flex flex-col md:justify-between gap-8 "
            }
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="hidden w-full text-center md:block">
              <h3 className="font-bold text-lg">TuGestión.io</h3>
              <p>Registrarse</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Nombre de usuario
                </label>
                <div className="w-full relative flex items-center bg-zinc-50 border border-zinc-300 rounded-md">
                  <div className="text-zinc-400 px-2">
                    <UserIcon />
                  </div>

                  <Input
                    inputStyle={
                      "w-full p-2 text-zinc-900 placeholder-zinc-400 focus:outline-zinc-400 "
                    }
                    type="username"
                    id="username"
                    placeholder="Nombre de usuario"
                    register={{ ...register("username", { required: true }) }}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="bg-red-400 text-white p-2 rounded-md">
                    El Nombre de usuario es requerido
                  </div>
                )}
              </div>
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
            <Button buttonStyle="w-full py-2  bg-white text-zinc-900 rounded-lg ring-2 ring-zinc-900 font-semibold text-lg cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white transition-colors">
              Registrarse
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-zinc-700 hover:text-zinc-900"
              >
                ¿No tienes una cuenta?{" "}
                <span className="text-blue-400 font-bold">Inicia sesión</span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
