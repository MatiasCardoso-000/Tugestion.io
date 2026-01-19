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
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-start flex-col px-6 py-8 relative">
      <div className="w-full max-w-7xl mx-auto">
        <Link
          to={"/dashboard"}
          className="inline-flex text-base items-center gap-2 text-zinc-600 hover:text-indigo-600 transition-colors mb-6 font-medium"
        >
          <LeftArrowIcon /> Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Gestión de Categorías</h1>
        <Button
          buttonStyle="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold cursor-pointer shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
          onClick={() => {
            setCreateNewCategory(!createNewCategory);
            setEditingId("");
          }}
        >
          + Nueva Categoría
        </Button>

      </div>

      {createNewCategory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Form
            formStyle="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-6 mx-4"
            onSubmit={handleSubmit(onCreateCategorySubmit)}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">Nueva Categoría</h2>
              <p className="text-zinc-500 text-sm">Crea una categoría personalizada para organizar tus gastos</p>
            </div>
            <div>
              <label
                className="block text-zinc-700 font-semibold mb-2"
                htmlFor="category_name"
              >
                Nombre de la categoría
              </label>
              <Input
                type="text"
                inputStyle="w-full p-3 border border-zinc-300 rounded-xl bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Ej: Ropa, Mascotas, Suscripciones..."
                register={{ ...register("category_name", { required: true }) }}
                required
                id="category_name"
                autoComplete="off"
              />
            </div>
            <div className="flex gap-3">
              <Button
                buttonStyle="flex-1 py-3 bg-zinc-200 text-zinc-700 rounded-xl text-base font-semibold cursor-pointer hover:bg-zinc-300 transition-colors"
                onClick={() => setCreateNewCategory(false)}
              >
                Cancelar
              </Button>
              <Button buttonStyle="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-base font-semibold cursor-pointer shadow-md hover:bg-indigo-700 transition-colors">
                Crear
              </Button>
            </div>
          </Form>
        </div>
      )}
      <section className="w-full max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-zinc-800">Categorías del Sistema</h2>
          <span className="px-2.5 py-1 bg-zinc-200 text-zinc-600 text-xs font-medium rounded-full">
            {categories.filter(c => c.user_id === null).length}
          </span>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories.map((category: Category) => {
            return (
              category.user_id === null && (
                <CategoryItem category={category} key={category.category_id} />
              )
            );
          })}
        </ul>
      </section>
      <section className="w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-zinc-800">Mis Categorías</h2>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
            {categories.filter(c => c.user_id !== null).length}
          </span>
        </div>
        {categories.filter(c => c.user_id !== null).length === 0 ? (
          <div className="bg-white border-2 border-dashed border-zinc-300 rounded-xl p-12 text-center">
            <p className="text-zinc-500 text-lg mb-2">No tienes categorías personalizadas</p>
            <p className="text-zinc-400 text-sm">Crea una nueva categoría para organizar mejor tus gastos</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories.map((category: Category) => {
              return (
                category.user_id && (
                  <CategoryItem category={category} key={category.category_id} />
                )
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};
