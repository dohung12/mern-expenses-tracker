import React from 'react';

const Dropdown = ({ optionLists }) => {
  return (
    <select>
      {optionLists.map((option, index) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
