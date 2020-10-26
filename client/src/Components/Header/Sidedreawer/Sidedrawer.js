import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userActions";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Sidedrawer.module.css";
const Sidedrawer = ({ showSideBar, setShowSideBar }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    setShowSideBar(false);
  };
  return (
    <>
      <Backdrop show={showSideBar} showHandler={setShowSideBar} />
      <div
        className={`${classes.Sidedrawer} ${
          showSideBar ? classes.Open : classes.Close
        }`}
      >
        <nav>
          <ul className={classes.Sidedrawer_ul}>
            <li
              className={`${classes.Sidedrawer_li} ${classes.Sidedrawer_login}`}
            >
              {userInfo ? (
                `Welcome : ${userInfo.name}`
              ) : (
                <Link
                  className={classes.Login_link}
                  onClick={() => setShowSideBar(false)}
                  to="/login"
                >
                  Sign in
                </Link>
              )}
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/profile"
              >
                My Account
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/profile"
              >
                Orders
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link className={classes.Sidedrawer_link} to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link className={classes.Sidedrawer_link} to="/orders">
                Comparing list
              </Link>
            </li>
            {userInfo ? (
              <li className={classes.Sidedrawer_li}>
                <button
                  className={classes.Sidedrawer_logout_btn}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            ) : null}
            <li
              className={`${classes.Sidedrawer_li} ${classes.Sidedrawer_label}`}
            >
              <label>Categories</label>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link className={classes.Sidedrawer_link} to="/orders">
                Mobiles
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link className={classes.Sidedrawer_link} to="/orders">
                Tablets
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidedrawer;
