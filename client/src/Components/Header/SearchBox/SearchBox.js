import React from "react";
import classes from "./SearchBox.module.css";
const SearchBox = ({ showSearch }) => {
  return (
    <div
      className={`${classes.Search_box_cont} ${showSearch && classes.Active}`}
    >
      <form className={classes.Search_box_form}>
        <input
          type="search"
          placeholder="What are you looking for?"
          className={classes.Search_input}
        />
        <input type="button" value="Search" className={classes.Search_button} />
      </form>
      <div className={`${classes.Search_results} ${classes.Hide}`}>
        <ul></ul>
      </div>
      <span className="Autocomplete_overlay"></span>
    </div>
  );
};

export default SearchBox;
