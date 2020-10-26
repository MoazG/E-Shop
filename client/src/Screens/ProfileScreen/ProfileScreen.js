import React, { useState, useEffect } from "react";
import classes from "./ProfileScreen.module.css";

import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../actions/orderActions";

import { getUserDetails, updateUserProfile } from "../../actions/userActions";
/*eslint-disable*/
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { Link } from "react-router-dom";

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
        <h2>User Profile</h2>
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
          <input type="submit" value="Update" />
        </form>
      </div>
      <div className={classes.Order_list_cont}>
        <h2>My Orders</h2>
        <table className={classes.Order_list_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileScreen;
