// Componente para el formulario de Registro

import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useAuth} from "../../hooks/useAuth";
import { User } from "../../types/user.types";
import { useEffect } from "react";

export const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signUp,isAuthenticated,registerSuccesfully, errors: RegisterErrors } = useAuth();

  const navigate = useNavigate()

  const onSubmit = async (data:User) => {
     signUp(data);
  };
  
  useEffect(()=> {
   if(isAuthenticated){
    navigate('/dashboard')
   }
  },[isAuthenticated])


  return (
    <div className="h-screen w-full flex items-center bg-zinc-100">
      <div className="flex w-full h-full">
        <div className="absolute top-10 right-20">
          <h1 className="text-6xl font-extrabold text-zinc-800">
            TuGestión.io
          </h1>
        </div>
        <div className="flex items-center justify-start w-1/2 pl-60 h-full gap-7">
          { RegisterErrors.map((error,i) => {
            return <div className="bg-red-500 p-3 rounded-md text-white w-1/2 text-xl" key={i}>{error}</div>;
          })}
          <Form
            formStyle={
              "p-12 rounded-xl shadow-2xl bg-white max-w-lg w-full min-h-[500px] flex flex-col justify-center"
            }
            titleStyle={"text-3xl font-bold text-zinc-900 mb-8 text-left"}
            title={"Regístrate"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              inputStyle={
                "w-full p-3 mb-6 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              type="email"
              placeholder="Email"
              register={{ ...register("email", { required: true }) }}
            />
            {errors.email && <div>El email es requerido</div>}
            <Input
              inputStyle={
                "w-full p-3 mb-6 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              type="text"
              placeholder="Usuario"
              register={{ ...register("username", { required: true }) }}
            />
            {errors.username && <div>El nombre de usuario es requerido</div>}
            <Input
              inputStyle={
                "w-full p-3 mb-8 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              type="password"
              placeholder="Contraseña"
              register={{ ...register("password", { required: true }) }}
            />
            {errors.password && <div>El password es requerido</div>}
            <Button
              buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors"
            >
              Registrarse
            </Button>
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-zinc-700 hover:text-zinc-900 underline"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </div>
          </Form>
         
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
};

