
// Componente de campo de entrada reutilizable
export const Input = ({ type = "text",inputStyle, placeholder,register}) => {
  return (
    <input
      className={inputStyle}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
};

