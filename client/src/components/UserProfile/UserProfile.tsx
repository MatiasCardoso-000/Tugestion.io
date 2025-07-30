import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { Category } from "../../types/categories.types";
import { Input } from "../Input/Input";
import { TrashIcon } from "../Icons/Icons";

export const UserProfile = () => {
  const { user } = useAuth();
  const { handleSubmit, register } = useForm<Category>();

  const [createNewCategory, setCreateNewCategory] = useState(false);
  const { categories, createCategory ,deleteCategory} = useCategories();

  const onSubmit = async (data: Category) => {
    createCategory(data);
  };

  return (
    <div className="flex flex-col gap-y-60 relative">
      <div className="max-w-md mx-auto text-center absolute left-2 top-6">
        <h2 className="text-2xl font-bold text-zinc-800 mb-4">
          Perfil de {user?.username || user?.email}
        </h2>
      </div>

      <div>
        <Button
          buttonStyle="w-1/11 py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2 absolute right-20 top-8"
          onClick={() => {
            setCreateNewCategory(!createNewCategory);
          }}
        >
          Crear Categoria
        </Button>

        {createNewCategory && (
          <form
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto absolute right-20 top-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block text-zinc-700 font-semibold mb-1">
                Nueva categoría
              </label>
              <Input
                type="text"
                inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                placeholder="Ej: Ropa"
                register={{ ...register("category_name", { required: true }) }}
              />
            </div>
            <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
              Agregar categoría
            </Button>
          </form>
        )}
      </div>
      <section className="flex flex-col items-center  justify-center gap-8  ">
        <h1 className="w-1/4 text-left text-6xl font-bold"> Categorías</h1>
        <ul className="w-1/4 px-12 py-8 bg-white rounded-md shadow-2xl text-2xl ">
          {categories.map((category: Category) => {
            return (
              <li
                key={category.category_id}
                className="flex items-center justify-between"
              >
                {category.category_name.slice(0,1).toLocaleUpperCase() +  category.category_name.slice(1)}{" "}
                <div className="flex items-center gap-4">
                  <Button buttonStyle="w-full p-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
                    Editar categoría
                  </Button>
                  <Button buttonStyle="p-2 rounded hover:bg-red-100 transition-colors cursor-pointer" onClick={()=> deleteCategory(category.category_id)}>
                    <TrashIcon />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
