
import React, { ComponentProps, FC } from 'react'
interface CheckboxProps extends ComponentProps<'input'> {
    label: string;
  }



const Checkbox: FC<CheckboxProps> = ({ type, label, name }) => {
    return (
      <label>
        <span className='block'>{label}</span>
        <input name={name}
          type={type}
          className="form-check-input"
          id="Checkbox"
          aria-describedby="checkboxhelp" />
      </label>
    )
  }
  
export default Checkbox
