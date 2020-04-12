import React, { useRef } from "react";

import "./CheckBox.css";

const CheckBox = ({ message, isChecked }) => {
  const checkboxRef = useRef();

  const handleChecked = (e) => {
    const value = e.target.checked;
    // setChecked(value);
    isChecked(value)
  };

  return (
    <div className="checkbox">
      <span className="checkbox__text" >{message||"Soy Donador"}</span>
      <input
        ref={checkboxRef}
        onChange={handleChecked}
        // checked={checked}
        className="checkbox__input"
        type="checkbox"
        id="switch"
      />
      <label className="checkbox__label" htmlFor="switch" />
    </div>
  );
};

export default CheckBox;
