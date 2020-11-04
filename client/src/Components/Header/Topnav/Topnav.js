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
            <div
              className={`${classes.Login_name} ${classes.My_account_setting}`}
            >
              {userInfo ? (
                `Welcome: ${userInfo.name}`
              ) : (
                <Link to="/login">Hello, Log in</Link>
              )}
              <i className="fa fa-angle-down"></i>
              <ul className={classes.My_account_modal}>
                {!userInfo && (
                  <li className={classes.MY_account_login}>
                    <Link className={classes.MY_account_login_btn} to="/login">
                      Log In
                    </Link>
                    <p>Don't have an account ?</p>
                    <Link to="/register">Sign Up</Link>
                  </li>
                )}
                <li>
                  <Link to="/profile/myinfo" className={classes.My_account_btn}>
                    Account Setting
                    <i className="fas fa-cog"></i>
                  </Link>
                </li>
                {userInfo && userInfo.isAdmin ? (
                  <li className={classes.Admin_modal_cont}>
                    <button className={classes.My_account_btn}>
                      Admin
                      <i
                        style={{ fontSize: "1.2rem" }}
                        className="fa fa-angle-right"
                      ></i>
                    </button>
                    <ul className={classes.Admin_modal_ul}>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className={classes.My_account_btn}
                        >
                          Users
                          <i className="fas fa-users"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className={classes.My_account_btn}
                        >
                          Products
                          <i className="fas fa-store"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className={classes.My_account_btn}
                        >
                          Orders
                          <i className="fas fa-shipping-fast"></i>
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : null}
                <li>
                  <Link to="/profile/orders" className={classes.My_account_btn}>
                    My Orders
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/profile/saved" className={classes.My_account_btn}>
                    Wish List
                    <i className="far fa-heart"></i>
                  </Link>
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

          {/* <li className={classes.Top_nav_li_right}>
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Topnav;
