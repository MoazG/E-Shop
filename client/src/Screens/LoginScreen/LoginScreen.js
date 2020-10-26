import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import classes from "./LoginScreen.module.css";
// import FormContainer from "../Components/FormContainer";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={`${classes.Form_container} container`}>
      <h1 className={classes.Page_title}>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <form className={classes.Login_form} onSubmit={submitHandler}>
        <div className={classes.Form_group}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid email</p>
          </div>
        </div>
        <div className={classes.Form_group}>
          <label htmlFor="login_password">Password</label>
          <input
            type="password"
            name="user_password"
            placeholder="Enter your pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid password</p>
          </div>
        </div>
        <div className={classes.Invalid_info}>
          <p>Email or Password is incorrect</p>
        </div>
        <input type="submit" value="Sign in" />
        <div className={classes.Form_option}>
          New Customer{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
