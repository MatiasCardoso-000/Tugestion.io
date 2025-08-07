import Button from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export const SearchBar = () => {
  return (
    <Form formStyle="w-full flex flex-col justify-center items-center gap-4 text-center" onSubmit={() => {}}>
      <Input
        type="text"
        placeholder="Buscar gasto"
        inputStyle="w-1/4 p-3 border border-zinc-300 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-zinc-400"
        required
        id="search"
        autoComplete="off"
      />
      <Button buttonStyle="w-1/11 py-3 bg-white ring-2 ring-zinc-900 text-zinc-900 rounded-lg font-bold text-lg cursor-pointer shadow-md hover:bg-zinc-800 hover:text-white transition-colors mt-2">Buscar</Button>
    </Form>
  );
};
