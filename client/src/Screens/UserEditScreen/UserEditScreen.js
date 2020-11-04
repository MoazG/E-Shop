import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Components/Loader";

import { getUserDetails, updateUser } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import classes from "../LoginScreen/LoginScreen.module.css";
import Alert from "../../Components/UI/Alert/Alert";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="container">
      <Link to="/admin/userlist">Go Back</Link>
      <div className={classes.Form_container}>
        <h1 className={classes.Page_title}>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <form className={classes.Login_form} onSubmit={submitHandler}>
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
            <div
              className={classes.Form_group}
              style={{ marginBottom: "1rem" }}
            >
              <label htmlFor="is_admin">Is Admin</label>
              <input
                type="checkbox"
                name="isadmin"
                id="is_admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>

            <button className="btn" type="submit" variant="primary">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
