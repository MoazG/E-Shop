import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import classes from "./Midnav.module.css";

const Midnav = ({ showSideBar, setShowSideBar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
                <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
              </div>
              <div className={classes.Cart_icons}>
                <button
                  className={classes.Nav_btn}
                  style={{ marginRight: "3px" }}
                >
                  <i className="fas fa-shopping-bag"></i>
                </button>

                <i
                  className={`fa fa-angle-down ${classes.Cart_angle_down}`}
                ></i>
              </div>
              <div className={classes.Cart_items}>
                {cartItems.map((product, i) => (
                  <div className={classes.Cart_product} key={i}>
                    <div className={classes.Cart_item_img}>
                      <img src={product.image[0]} alt="" />
                    </div>
                    <div className={classes.Cart_product_info}>
                      <h2>
                        {product.name.length > 20
                          ? product.name.substring(0, 20) + "..."
                          : product.name}
                      </h2>
                      <p>
                        <strong className={classes.Cart_product_qty}>
                          {product.qty}
                        </strong>
                        x{" "}
                        <span className={classes.Cart_product_price}>
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
                <div className={classes.Cart_actions}>
                  <div className={classes.Cart_total}>
                    <p>Total :</p>
                    <p className={classes.Cart_total_price}>
                      ${" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className={classes.Cart_btn_cont}>
                    <Link to="/cart" className={classes.Cart_btn}>
                      View cart
                    </Link>
                    <Link to="/shipping" className={classes.Cart_btn}>
                      Checkout
                    </Link>
                  </div>
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
