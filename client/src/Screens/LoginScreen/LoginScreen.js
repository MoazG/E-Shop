import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import classes from "./LoginScreen.module.css";
// import FormContainer from "../Components/FormContainer";
import Loader from "../../Components/Loader";
import { validateForm } from "./loginValidity";
import Button from "../../Components/UI/Button/Button";
import Alert from "../../Components/UI/Alert/Alert";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false,
    info: false,
  });
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (error) {
      setIsInvalid({ ...setIsInvalid, info: true });
    }
  }, [history, redirect, userInfo, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    let valid = validateForm(email, password, isInvalid, setIsInvalid);

    valid && dispatch(login(email, password));
  };
  const changeStatus = (input) => {
    setIsInvalid({ ...isInvalid, [input]: false });
  };

  return (
    <>
      <div className="bread_crumbs_section">
        <div className="container">
          <Link to="/">Home</Link> / Sign in
        </div>
      </div>
      {isInvalid.info && (
        <Alert severity="error">Invalid Email or Password</Alert>
      )}
      <div className={`${classes.Form_container} container`}>
        {/* <h1 className={classes.Page_title}>Sign in</h1> */}
        {loading && <Loader></Loader>}
        <form
          className={classes.Login_form}
          onSubmit={submitHandler}
          noValidate
        >
          <div className={classes.Form_group}>
            <label htmlFor="">Email</label>
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
            <label htmlFor="login_password">Password</label>
            <input
              type="password"
              name="user_password"
              placeholder="Enter your pasword"
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
              <p>Please entaer a valid password</p>
            </div>
          </div>
          {/* <div
            className={`${classes.Invalid_info} ${
              isInvalid.info ? classes.Info_active : null
            }`}
          >
            <p>Invalid Email or Password</p>
          </div> */}
          <Button color="primary" style={{ width: "100%" }}>
            Sign in
          </Button>
          <div className={classes.Form_option}>
            New Customer ?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ color: "#0063D1" }}
            >
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
