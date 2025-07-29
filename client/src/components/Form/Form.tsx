
export const Form = ({ formStyle,titleStyle,title, onSubmit, children }) => {

  return (
    <form className={formStyle} onSubmit={onSubmit}>
      <h2 className={titleStyle}>{title}</h2>
      {children}
    </form>
  );
};

