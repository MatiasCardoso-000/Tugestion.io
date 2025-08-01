import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { Category } from "../../types/categories.types";
import { Input } from "../Input/Input";
import { CheckIcon, SquarePenIcon, TrashIcon } from "../Icons/Icons";

export const UserProfile = () => {
  const { handleSubmit, register } = useForm<Category>();

  const [createNewCategory, setCreateNewCategory] = useState(false);
  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    savedCategoryId,
    toUpdate,
    handleUpdate,
  } = useCategories();

  const onSubmit = async (data: {}, callback: Function) => {
    callback(data);
    console.log(data);
    
  };

  useEffect(() => {
    console.log(savedCategoryId);
  }, [savedCategoryId]);

  return (
    <div className="flex flex-col gap-y-60 relative">
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
            onSubmit={handleSubmit((data) => onSubmit(data, createCategory))}
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
        <h1 className="w-1/4 text-left text-6xl font-bold">Categorías</h1>
        <ul className="w-1/4 flex flex-col  gap-4  px-12 py-8 bg-white rounded-md shadow-2xl text-2xl ">
          {categories.map((category: Category) => {
            return (
              <li
                key={category.category_id}
                className="flex items-center justify-between "
              >
                {toUpdate && savedCategoryId.includes(category.category_id) ? (
                  <div className="w-full flex items-center gap-4">
                    <Input
                      type={"text"}
                      placeholder={"Nueva categoria"}
                      inputStyle={
                        "w-1/2 p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                      }
                      register={{
                        ...register("new_category", { required: true }),
                      }}
                    />
                    <Button onClick={handleSubmit(() => onSubmit(category.category_id,updateCategory))} buttonStyle="cursor-pointer">
                      <CheckIcon />
                    </Button>
                  </div>
                ) : (
                  category.category_name.slice(0, 1).toLocaleUpperCase() +
                  category.category_name.slice(1)
                )}{" "}
                <div className="flex items-center gap-4">
                  <Button
                    buttonStyle="p-2 hover:bg-zinc-200 transition-colors cursor-pointer "
                    onClick={() => handleUpdate(category.category_id)}
                  >
                    <SquarePenIcon />
                  </Button>
                  <Button
                    buttonStyle="p-2 hover:bg-zinc-200  cursor-pointer"
                    onClick={() => deleteCategory(category.category_id)}
                  >
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
