interface InputType {
  type: string;
  inputStyle: string;
  placeholder: string;
  register?: Record<string, any>;
  value?: string;
  required: boolean;
  id:string;
  autoComplete?:string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente de campo de entrada reutilizable
export const Input = ({
  type = "text",
  inputStyle,
  placeholder,
  register,
  required,
  id,
  autoComplete,
  onChange
}: InputType) => {
  return (
    <input
      className={inputStyle}
      type={type}
      placeholder={placeholder}
      {...register}
      required={required}
      id={id}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  );
};
