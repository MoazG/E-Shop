import React, { useEffect } from "react";
import classes from "./ProfileScreen.module.css";

import { useSelector } from "react-redux";

/* eslint-disable*/
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import UserInfo from "./UserInfo/UserInfo";
import UserOrders from "./UserOrders/UserOrders";
import UserSavedItems from "./UserSavedItems/UserSavedItems";
/* eslint-enable*/

const ProfileScreen = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      <div className={classes.Bread_crumbs_section}>
        <div className="container">
          <Link to="/">Home</Link> / Profile
        </div>
      </div>
      <div className={`${classes.Profile_screen_cont} container`}>
        <div className={classes.User_profile_Links}>
          <ul className={classes.User_profile_ul}>
            <li>
              <NavLink activeClassName={classes.Active} to="/profile/myinfo">
                {" "}
                <span className={classes.Link_icons}>
                  <i className="fas fa-user"></i>
                </span>{" "}
                My Info
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.Active} to="/profile/orders">
                <span className={classes.Link_icons}>
                  <i className="fa fa-shopping-cart"></i>
                </span>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.Active} to="/profile/saved">
                <span className={classes.Link_icons}>
                  <i className="far fa-heart"></i>
                </span>
                Saved
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.User_profile_component}>
          <Switch>
            <Route path="/profile/myinfo" component={UserInfo} />
            <Route path="/profile/orders" component={UserOrders} />
            <Route path="/profile/saved" component={UserSavedItems} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
