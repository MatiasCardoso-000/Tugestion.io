import { useSearch } from "../../hooks/useSearch";
import { Form } from "../Form/Form";

export const SearchBar = () => {
  const { inputValue, getInputValue } = useSearch();


  return (
    <Form
      formStyle="w-full flex flex-col justify-center items-center gap-4 text-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Buscar gasto"
        className="w-2/3  md:w-1/2  lg:w-1/2 xl:w-1/4 p-1 md:p-3 border border-zinc-200 rounded-md bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required
        id="search"
        autoComplete="off"
        onChange={getInputValue}
        value={inputValue}
      />
    </Form>
  );
};
