import React, { useState, useEffect } from "react";
import classes from "./ProfileScreen.module.css";

import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../actions/orderActions";

import { getUserDetails, updateUserProfile } from "../../actions/userActions";
/*eslint-disable*/
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { NavLink, Route, Switch } from "react-router-dom";

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrder, error: errorOrder, orders } = orderMyList;
  /* eslint-enable*/
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, user, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <div className={`${classes.Profile_screen_cont} container`}>
      <div className={classes.User_profile_cont}>
        <NavLink to="/profile/myinfo">My Info</NavLink>
        <NavLink to="/profile/orders">Orders</NavLink>
        <NavLink to="/saved">Saved Items</NavLink>
      </div>
      <div className={classes.Order_list_cont}>
        <Switch>
          <Route path="/profile/myinfo" />
          <Route path="/profile/orders" />
          <Route path="/saved" />
        </Switch>
      </div>
    </div>
  );
};

export default ProfileScreen;
