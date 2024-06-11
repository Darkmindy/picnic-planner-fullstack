import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ type, label, name, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        type={type}
        className="form-control"
        id={name}
        name={name}
        aria-describedby={`${name}Help`}
      />
    </div>
  );
};

export default Input;
