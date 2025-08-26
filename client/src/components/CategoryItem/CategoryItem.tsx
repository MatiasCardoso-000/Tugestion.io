import { useCategories } from "../../hooks/useCategories";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { CheckIcon, SquarePenIcon, TrashIcon } from "../Icons/Icons";

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
      className="text-gray-700 gap-4 ring-2 ring-blue-400 bg-blue-200 w-full h-[100px] p-2 rounded-md"
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
        <div className="flex flex-wrap gap-2  text-center  md:flex-row justify-center">
          <p className="w-full xl:text-xl ">
            {category.category_name.slice(0, 1).toLocaleUpperCase() +
              category.category_name.slice(1)}
          </p>
          {category.user_id && (
            <div className="flex items-center gap-2">
              <Button
                buttonStyle="p-2 hover:bg-zinc-200  cursor-pointer rounded-md"
                onClick={() => {
                  setEditingId(category.category_id);
                  setUpdateCategoryName(category.category_name);
                  setCreateNewCategory(false);
                }}
              >
                <SquarePenIcon styleType={""} />
              </Button>
              <Button
                buttonStyle="p-2 hover:bg-zinc-200  cursor-pointer rounded-md"
                onClick={() => deleteCategory(category.category_id)}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        </div>
      )}{" "}
    </li>
  );
};
