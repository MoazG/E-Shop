import React, { useState } from "react";
import classes from "./CheckBox.module.css";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (catId) => {
    const currentCatId = checked.indexOf(catId);
    let newCheckedCatId = [...checked];
    if (currentCatId === -1) {
      newCheckedCatId.push(catId);
    } else {
      newCheckedCatId.splice(currentCatId, 1);
    }
    handleFilters(newCheckedCatId);
    setChecked(newCheckedCatId);
  };

  return categories.map((category) => (
    <li key={category._id} className={classes.List_li}>
      <input
        type="checkbox"
        id={`check-${category.name}`}
        value={checked._id === -1}
        className="form-check-input"
        onChange={() => {
          handleToggle(category._id);
        }}
      />
      <label
        className={classes.Form_check_label}
        htmlFor={`check-${category.name}`}
      >
        {category.name}
      </label>
    </li>
  ));
};

export default CheckBox;
