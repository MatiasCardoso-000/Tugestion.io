interface FormType {
  formStyle: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form = ({ formStyle, onSubmit, children }: FormType) => {
  return (
    <form className={formStyle} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
