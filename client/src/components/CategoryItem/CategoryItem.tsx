import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import {
  CheckIcon,
  SquarePenIcon,
  TrashIcon,
} from "../Icons/Icons";

export const CategoryItem = ({ category }) => {
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
      className="flex bg-white ring-2 ring-zinc-900 text-zinc-900 items-center justify-between rounded-md gap-2  px-10 py-10 cursor-pointer hover:bg-zinc-100 transition-colors"
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
                onUpdateCategorySubmit(category.category_id, updateCategoryName);
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
        <p className="w-full text-center text-2xl font-semibold">
          {category.category_name.slice(0, 1).toLocaleUpperCase() +
            category.category_name.slice(1)}
        </p>
      )}{" "}
      {category.user_id && (
        <div className="flex items-center gap-2">
          <Button
            buttonStyle="p-1 hover:bg-zinc-200 transition-colors cursor-pointer "
            onClick={() => {
              setEditingId(category.category_id);
              setUpdateCategoryName(category.category_name);
              setCreateNewCategory(false);
            }}
          >
            <SquarePenIcon styleType={""} />
          </Button>
          <Button
            buttonStyle="p-2 hover:bg-zinc-200  cursor-pointer"
            onClick={() => deleteCategory(category.category_id)}
          >
            <TrashIcon />
          </Button>
        </div>
      )}
    </li>
  );
};
