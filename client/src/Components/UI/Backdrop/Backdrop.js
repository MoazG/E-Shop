import React from "react";
import classes from "./Backdrop.module.css";
const Backdrop = ({ show, showHandler, zIndex }) => {
  return show ? (
    <div
      className={classes.Backdrop}
      onClick={() => showHandler(!show)}
      style={zIndex && { zIndex }}
    ></div>
  ) : null;
};

export default Backdrop;
