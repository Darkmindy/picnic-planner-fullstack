import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<ButtonProps> = ({ label, ...rest }) => {
  return <button {...rest}>{label}</button>;
};

export default Button;
