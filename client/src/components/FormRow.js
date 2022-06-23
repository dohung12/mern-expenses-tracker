import React from 'react';

const FormRow = ({
  name,
  labelText,
  type,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
