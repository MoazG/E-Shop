import React from "react";
import classes from "./Backdrop.module.css";
const Backdrop = ({ show, showHandler }) =>
  show ? (
    <div className={classes.Backdrop} onClick={() => showHandler(!show)}></div>
  ) : null;

export default Backdrop;
