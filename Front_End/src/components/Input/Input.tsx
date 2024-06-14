import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;  // Label è opzionale ora
}

const Input: FC<InputProps> = ({ type, label = "", name, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
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
