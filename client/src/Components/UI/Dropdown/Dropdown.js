import React, { useState } from "react";
import classes from "./Dropdown.module.css";
import { CSSTransition } from "react-transition-group";
const Dropdown = ({ children, header, toggle, data, handleFilters }) => {
  const [listOpen, setListOpen] = useState(false);
  return (
    <div className={classes.Dd_wrapper}>
      <button
        className={classes.Dd_header}
        onClick={() => setListOpen(!listOpen)}
      >
        <p className={classes.Dd_header_title}>{header}</p>
        <span>
          {listOpen ? (
            <i className="fas fa-minus"></i>
          ) : (
            <i className="fas fa-plus"></i>
          )}
        </span>
      </button>
      <div className={`${classes.Dd_list} `}>
        <CSSTransition
          in={listOpen}
          timeout={300}
          classNames="dropdownItems"
          mountOnEnter
          unmountOnExit
        >
          <ul>{children}</ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Dropdown;
