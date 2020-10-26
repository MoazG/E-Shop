import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userActions";
import classes from "./Topnav.module.css";
const Topnav = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.Top_nav}>
      <div className="container">
        <ul className={classes.Top_nav_ul}>
          <li className="top_nav_li_left">
            <p>Telephone Enquiry: (012)800 456 789 – 987</p>
          </li>
          <li className={classes.Top_nav_li_right}>
            <div className={classes.Login_name}>
              {userInfo ? (
                `Welcome: ${userInfo.name}`
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </div>
            <div className={classes.My_account_setting}>
              <a href="./">
                My account <i className="fa fa-angle-down"></i>
              </a>
              <ul className={classes.My_account_modal}>
                <li>
                  <Link to="/profile" className={classes.My_account_btn}>
                    Account Setting
                    <i className="fas fa-cog"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={classes.My_account_btn}>
                    My Orders
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                  {/* <button className={classes.My_account_btn}>
                    My Orders
                    <i className="fa fa-shopping-cart"></i>
                  </button> */}
                </li>
                <li>
                  <button className={classes.My_account_btn}>
                    Wish List
                    <i className="far fa-heart"></i>
                  </button>
                </li>
                <li className={classes.Open_compare}>
                  <button className={classes.My_account_btn}>
                    Compare List
                    <i className="fas fa-sliders-h"></i>
                  </button>
                </li>
                {userInfo ? (
                  <li className={classes.Log_out_li}>
                    <button
                      className={classes.My_account_btn}
                      onClick={logoutHandler}
                    >
                      Logout
                      <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topnav;
