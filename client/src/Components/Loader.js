import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ style = {} }) => {
  return (
    <div className={classes.Loader_container} style={style}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};

export default Loader;
