import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import classes from "../LoginScreen/LoginScreen.module.css";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <div className={`${classes.Form_container} container`}>
      <h1 className={classes.Page_title}>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader></Loader>}
      <form onSubmit={submitHandler} className={classes.Login_form}>
        <div className={classes.Form_group}>
          <label htmlFor="register_name">Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid Name</p>
          </div>
        </div>
        <div className={classes.Form_group}>
          <label htmlFor="regster_email">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid Email</p>
          </div>
        </div>

        <div className={classes.Form_group}>
          <label htmlFor="register_password">Password</label>
          <input
            type="password"
            name="user_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid Password</p>
          </div>
        </div>
        <div className={classes.Form_group}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Password doesn't match</p>
          </div>
        </div>
        <div className={classes.Invalid_info}>
          <p>Email or Password is incorrect</p>
        </div>
        <input type="submit" value="Create new Account" />
        <div className={classes.Form_option}>
          Have an account{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
