import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { CheckIcon, SquarePenIcon, TrashIcon } from "../Icons/Icons";
import { CategoryIcon } from "../CategoryIcon/CategoryIcon";

import { Category } from "../../types/categories.types";

export const CategoryItem = ({ category }: { category: Category }) => {
  const {
    editingId,
    updateCategoryName,
    updateCategory,
    deleteCategory,
    setEditingId,
    setUpdateCategoryName,
    setCreateNewCategory,
  } = useCategories();

  const onUpdateCategorySubmit = async (
    category_id: string,
    newCategoryName: string
  ) => {
    await updateCategory(category_id, newCategoryName);
    setEditingId("");
    setUpdateCategoryName("");
  };

  return (
    <li
      key={category.category_id}
      className="group relative bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex items-center justify-center"
    >
      {editingId === category.category_id ? (
        <div className="w-full flex items-center gap-4">
          <Form
            onSubmit={() =>
              onUpdateCategorySubmit(category.category_id, updateCategoryName)
            }
            formStyle="flex gap-4"
          >
            <input
              type={"text"}
              placeholder={"Nueva categoria"}
              className={
                "w-full p-1 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
              }
              onChange={(e) => setUpdateCategoryName(e.target.value)}
              value={updateCategoryName}
              required
            />
            <Button
              onClick={() => {
                onUpdateCategorySubmit(
                  category.category_id,
                  updateCategoryName
                );
                setEditingId("");
                setUpdateCategoryName("");
              }}
              buttonStyle="cursor-pointer"
            >
              <CheckIcon />
            </Button>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <CategoryIcon categoryName={category.category_name} />
          {category.user_id && (
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                buttonStyle="p-1.5 bg-zinc-100 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer rounded-lg transition-colors"
                onClick={() => {
                  setEditingId(category.category_id);
                  setUpdateCategoryName(category.category_name);
                  setCreateNewCategory(false);
                }}
              >
                <SquarePenIcon styleType={"w-4 h-4"} />
              </Button>
              <Button
                buttonStyle="p-1.5 bg-zinc-100 hover:bg-red-100 hover:text-red-600 cursor-pointer rounded-lg transition-colors"
                onClick={() => deleteCategory(category.category_id)}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};
