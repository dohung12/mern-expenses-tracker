import React from 'react';

const Dropdown = ({ optionLists, name, labelText, handleChange, value }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <select onChange={handleChange} value={value} name={name}>
        {optionLists.map((option, index) => {
          return (
            <option value={option.title} key={index}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
