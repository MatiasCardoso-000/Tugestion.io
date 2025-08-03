// Componente de botón reutilizable
import React, { MouseEventHandler } from "react";

interface ButtonType {
  children: React.ReactNode;
  buttonStyle?: string;
  onClick?: MouseEventHandler;
}

export const Button = ({ children, buttonStyle,onClick }: ButtonType) => {
  return (
    <button className={buttonStyle} onClick={onClick} type="submit">
      {children}
    </button>
  );
};

export default Button;
