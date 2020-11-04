import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import classes from "../LoginScreen/LoginScreen.module.css";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { registerValidate } from "./validateRegister";
import Button from "../../Components/UI/Button/Button";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    info: false,
  });

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
    let valid = registerValidate(
      name,
      email,
      password,
      confirmPassword,
      isInvalid,
      setIsInvalid
    );
    valid && dispatch(register(name, email, password));
  };
  const changeStatus = (input) => {
    setIsInvalid({ ...isInvalid, [input]: false });
  };

  return (
    <>
      <div className="bread_crumbs_section">
        <div className="container">
          <Link to="/">Home</Link> / Sign up
        </div>
      </div>
      <div className={`${classes.Form_container} container`}>
        {/* <h1 className={classes.Page_title}>Sign Up</h1> */}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <form
          noValidate
          onSubmit={submitHandler}
          className={classes.Login_form}
        >
          <div className={classes.Form_group}>
            <label htmlFor="register_name">Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                changeStatus("name");
              }}
              className={isInvalid.name ? classes.Is_invalid : null}
            />
            <div
              className={`${classes.Invalid_feedback} ${
                isInvalid.name ? classes.Active : null
              }`}
            >
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
              onChange={(e) => {
                setEmail(e.target.value);
                changeStatus("email");
              }}
              className={isInvalid.email ? classes.Is_invalid : null}
            />
            <div
              className={`${classes.Invalid_feedback} ${
                isInvalid.email ? classes.Active : null
              }`}
            >
              <p>Please entaer a valid email</p>
            </div>
          </div>

          <div className={classes.Form_group}>
            <label htmlFor="register_password">Password</label>
            <input
              type="password"
              name="user_password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                changeStatus("password");
              }}
              className={isInvalid.password ? classes.Is_invalid : null}
            />
            <div
              className={`${classes.Invalid_feedback} ${
                isInvalid.password ? classes.Active : null
              }`}
            >
              <p>Please entaer a valid Password</p>
            </div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                changeStatus("confirmPassword");
              }}
              className={isInvalid.confirmPassword ? classes.Is_invalid : null}
            />
            <div
              className={`${classes.Invalid_feedback} ${
                isInvalid.confirmPassword ? classes.Active : null
              }`}
            >
              <p>Password doesn't match</p>
            </div>
          </div>
          <div className={classes.Invalid_info}>
            <p>Email or Password is incorrect</p>
          </div>
          <Button color="primary" style={{ width: "100%" }}>
            Create new Account
          </Button>
          <div className={classes.Form_option}>
            Already Have an account ?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              style={{ color: "#0063D1" }}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
