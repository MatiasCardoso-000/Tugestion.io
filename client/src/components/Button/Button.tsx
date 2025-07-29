// Componente de botón reutilizable
import React from "react";

export const Button = ({ children, buttonStyle}) => {
  return <button className={buttonStyle} >{children}</button>;
};

export default Button;
