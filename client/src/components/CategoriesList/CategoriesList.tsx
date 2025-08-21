import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { Category } from "../../types/categories.types";
import { Input } from "../Input/Input";
import { LeftArrowIcon } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { Form } from "../Form/Form";
import { CategoryItem } from "../CategoryItem/CategoryItem";

export const CategoriesList = () => {
  const { handleSubmit, register, reset } = useForm<Category>();

  const {
    categories,
    createCategory,
    setEditingId,
    setCreateNewCategory,
    createNewCategory,
  } = useCategories();

  const onCreateCategorySubmit = async (data: Category) => {
    await createCategory(data);
    setCreateNewCategory(false);
    reset();
  };

  return (
    <div className="w-full flex items-center  flex-col px-4 relative ">
      <div className="w-full text-left">
        <Link
          to={"/dashboard"}
          className="inline-flex text-lg items-center gap-2 text-zinc-900 hover:underline transition-colors mb-4"
        >
          <LeftArrowIcon /> Volver al inicio
        </Link>
      </div>

      <div className="w-full flex justify-end md:justify-end">
        <div>
          <Button
            buttonStyle="w-full   px-2 py-3 mt-6 bg-blue-600  text-white rounded-lg  text-lg cursor-pointer shadow-md hover:bg-blue-700   transition-colors md:mt-0"
            onClick={() => {
              setCreateNewCategory(!createNewCategory);
              setEditingId("");
            }}
          >
            Crear Categoria
          </Button>
        </div>

        {createNewCategory && (
          <Form
            formStyle="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 mt-8 mx-auto absolute left-0 md:right-20 top-20"
            onSubmit={handleSubmit(onCreateCategorySubmit)}
          >
            <div>
              <label
                className="block text-zinc-700 font-semibold mb-1"
                htmlFor="category_name"
              >
                Nueva categoría
              </label>
              <Input
                type="text"
                inputStyle="w-full p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-zinc-400 focus:border-zinc-500"
                placeholder="Ej: Ropa"
                register={{ ...register("category_name", { required: true }) }}
                required
                id="category_name"
                autoComplete="off"
              />
            </div>
            <Button buttonStyle="w-full py-3 bg-blue-600  text-white rounded-lg  text-lg cursor-pointer shadow-md hover:bg-blue-700 hover:text-white transition-colors mt-2">
              Agregar categoría
            </Button>
          </Form>
        )}
      </div>
      <section className="w-full flex flex-col items-center  justify-center  px-8 py-8">
        <h1 className="w-full text-center font-semibold md:text-left md:text-3xl ">
          Categorías
        </h1>
        <ul className="w-full md:grid md:grid-cols-3 xl:grid-cols-4 py-2 ">
          {categories.map((category: Category) => {
            return (
              category.user_id === null && (
                <CategoryItem category={category} key={category.category_id} />
              )
            );
          })}
        </ul>
      </section>
      <section className="w-full flex flex-col   px-8 py-8">
        <h1 className="text-center font-semibold md:text-left md:text-3xl ">
          Categorías del usuario
        </h1>
        <ul className="w-full md:grid md:grid-cols-4  gap-4  py-8 bg-white  ">
          {categories.map((category: Category) => {
            return (
              category.user_id && (
                <CategoryItem category={category} key={category.category_id} />
              )
            );
          })}
        </ul>
      </section>
    </div>
  );
};
