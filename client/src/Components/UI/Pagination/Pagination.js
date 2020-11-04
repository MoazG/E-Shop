import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Pagination.module.css";

const Pagination = ({ pages, page, route = "" }) => {
  return (
    pages > 1 && (
      <ul className={classes.Pagination_ul}>
        {[...Array(pages).keys()].map((x) => (
          <li className={classes.Pagination_li} key={x}>
            <NavLink
              className={classes.Pagination_link}
              activeClassName={classes.Active}
              key={x + 1}
              to={`/admin/${route}/page/${x + 1}`}
            >
              {x + 1}
            </NavLink>
          </li>
        ))}
      </ul>
    )
  );
};

export default Pagination;
