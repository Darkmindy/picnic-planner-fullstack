import { ComponentProps, FC } from 'react';
import "./Checkbox.css";

interface CheckboxProps extends ComponentProps<'input'> {
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, ...inputProps }) => {
  return (
    <label>
      <input
        type="checkbox"
        {...inputProps}
        className="form-check-input"
        aria-describedby="checkboxhelp"
      />
      <span className='block'>{label}</span>
    </label>
  );
}

export default Checkbox;

