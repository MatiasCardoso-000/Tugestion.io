import { useForm } from "react-hook-form";

import { useSearch } from "../../hooks/useSearch";
import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export const SearchBar = () => {
  const { inputValue, getInputValue } = useSearch();


  return (
    <Form
      formStyle="w-full flex flex-col justify-center items-center gap-4 text-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        type="text"
        placeholder="Buscar gasto"
        inputStyle="w-2/3  md:w-1/2  lg:w-1/2 xl:w-1/4 p-3 border border-zinc-600 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-600 focus:outline-zinc-400"
        required
        id="search"
        autoComplete="off"
        onChange={getInputValue}
        value={inputValue}
      />
      {/* <Button buttonStyle="w-full md:w-1/11 py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white transition-colors mt-2">
        Buscar
      </Button> */}
    </Form>
  );
};
