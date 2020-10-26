import React, { useState } from "react";

import { Link } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import classes from "./Midnav.module.css";
const Midnav = ({ showSideBar, setShowSideBar }) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className={classes.Mid_nav}>
      <div className="container">
        <div className={classes.Mid_nav_container}>
          <div className={classes.Logo_list}>
            <div
              className={classes.Drawer_toggle}
              onClick={() => {
                setShowSideBar(!showSideBar);
              }}
            >
              <button className={classes.Nav_btn}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className={classes.Logo}>
              <Link to="/">
                <h1>E-Shop</h1>
              </Link>
            </div>
          </div>
          <SearchBox showSearch={showSearch} />
          <div className={classes.Cart_container}>
            <div className={classes.Wishing_list}>
              <button className={classes.Nav_btn}>
                <i className="far fa-heart"></i>
              </button>
            </div>
            <div className={classes.Search_icon_cont}>
              <button
                className={classes.Nav_btn}
                onClick={() => setShowSearch(!showSearch)}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className={classes.Cart}>
              <div className={classes.Cart_counter}>
                <p>0</p>
              </div>
              <div className={classes.Cart_icons}>
                <button className={classes.Nav_btn}>
                  <i className="fas fa-shopping-bag"></i>
                </button>
                <p className={classes.Cart_total_price}>
                  $<span>0</span>
                </p>
                <i
                  className={`fa fa-angle-down ${classes.Cart_angle_down}`}
                ></i>
              </div>
              <div className={classes.Cart_items}>
                <div className={classes.Visit_cart_btn}>
                  <a href="shoppingCart.html" className="btn">
                    View Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Midnav;
