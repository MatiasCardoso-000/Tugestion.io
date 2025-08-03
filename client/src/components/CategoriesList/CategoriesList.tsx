import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "../../types/categories.types";
import { Input } from "../Input/Input";
import {
  CheckIcon,
  LeftArrowIcon,
  SquarePenIcon,
  TrashIcon,
} from "../Icons/Icons";
import { Link } from "react-router-dom";
import { Form } from "../Form/Form";

export const CategoriesList = () => {
  const { handleSubmit, register, reset } = useForm<Category>();

  const [createNewCategory, setCreateNewCategory] = useState(false);
  const {
    categories,
    editingId,
    newCategoryName,
    createCategory,
    updateCategory,
    deleteCategory,
    setEditingId,
    setNewCategoryName,
  } = useCategories();

  const onCreateCategorySubmit = async (data: Category) => {
    await createCategory(data);
    setCreateNewCategory(false);
    reset();
  };

  const onUpdateCategorySubmit = async (
    category_id: string,
    newCategoryName: string
  ) => {
    await updateCategory(category_id, newCategoryName);
    setEditingId("");
    setNewCategoryName("");
  };

  return (
    <div className="flex flex-col gap-y-4 relative">
      <Link to={"/dashboard"} className="flex gap-4 p-4">
        <LeftArrowIcon /> Volver al inicio
      </Link>
      <div>
        <Button
          buttonStyle="w-1/11 py-3 bg-zinc-900  text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800  transition-colors mt-2 absolute right-20 top-8"
          onClick={() => {
            setCreateNewCategory(!createNewCategory);
            setEditingId("");
          }}
        >
          Crear Categoria
        </Button>

        {createNewCategory && (
          <Form
            formStyle="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto absolute right-20 top-20"
            onSubmit={handleSubmit(onCreateCategorySubmit)}
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
                required
              />
            </div>
            <Button buttonStyle="w-full py-3 bg-zinc-900 text-zinc-100 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 transition-colors mt-2">
              Agregar categoría
            </Button>
          </Form>
        )}
      </div>
      <section className="w-full flex flex-col  justify-center gap-6 px-8 py-8">
        <h1 className="w-1/4 text-left text-6xl ">Categorías</h1>
        <ul className="w-1/3 flex flex-col  gap-4  px-10 py-8 bg-white rounded-md shadow-2xl text-2xl ">
          {categories.map((category: Category) => {
            return (
              <li
                key={category.category_id}
                className="flex items-center justify-between gap-2"
              >
                {editingId === category.category_id ? (
                  <div className="w-full flex items-center gap-4">
                    <Form
                      onSubmit={() =>
                        onUpdateCategorySubmit(
                          category.category_id,
                          newCategoryName
                        )
                      }
                      formStyle="flex gap-4"
                    >
                      <input
                        type={"text"}
                        placeholder={"Nueva categoria"}
                        className={
                          "w-full p-1 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                        }
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        value={newCategoryName}
                        required
                      />
                      <Button
                        onClick={() => {
                          onUpdateCategorySubmit(
                            category.category_id,
                            newCategoryName
                          );
                          setEditingId("");
                          setNewCategoryName("");
                        }}
                        buttonStyle="cursor-pointer"
                      >
                        <CheckIcon />
                      </Button>
                    </Form>
                  </div>
                ) : (
                  category.category_name.slice(0, 1).toLocaleUpperCase() +
                  category.category_name.slice(1)
                )}{" "}
                <div className="flex items-center gap-2">
                  <Button
                    buttonStyle="p-1 hover:bg-zinc-200 transition-colors cursor-pointer "
                    onClick={() => {
                      setEditingId(category.category_id);
                      setNewCategoryName(category.category_name);
                      setCreateNewCategory(false);
                    }}
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
