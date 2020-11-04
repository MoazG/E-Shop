import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserDetails,
  updateUserProfile,
} from "../../../actions/userActions";
import Loader from "../../../Components/Loader";
import Button from "../../../Components/UI/Button/Button";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const { loading: updateLoading } = useSelector(
    (state) => state.userUpdateProfile
  );

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, dispatch]);
  /*eslint-enable*/
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
      dispatch(getUserDetails("profile"));
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className={classes.User_profile}>
          <h2>My Information</h2>
          <form className={classes.User_profile_form} onSubmit={submitHandler}>
            <div className={classes.Form_group}>
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
              <input
                type="password"
                name="user_password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Password</p>
              </div>
            </div>
            <div className={classes.Form_group}>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Password doesn't match</p>
              </div>
            </div>
            <Button
              color="primary"
              style={{ width: "100%" }}
              loading={updateLoading}
            >
              Update
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserInfo;
