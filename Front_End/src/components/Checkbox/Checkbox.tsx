import React, { ComponentProps, FC } from 'react';

interface CheckboxProps extends ComponentProps<'input'> {
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, ...inputProps }) => {
  return (
    <label>
      <span className='block'>{label}</span>
      <input
        {...inputProps}
        className="form-check-input"
        aria-describedby="checkboxhelp"
      />
    </label>
  );
}

export default Checkbox;

