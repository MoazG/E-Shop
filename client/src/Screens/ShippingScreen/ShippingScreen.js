import React, { useEffect } from "react";
import { useState } from "react";

import classes from "../LoginScreen/LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";

import CheckOutSteps from "../../Components/UI/CheckOutSteps/CheckOutSteps";
import { saveShippingAddress } from "../../actions/cartActions";
import Button from "../../Components/UI/Button/Button";
import Alert from "../../Components/UI/Alert/Alert";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setAlert(false), 7000);
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!country || !city || !address || !postalCode) {
      setAlert(true);
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <div className={`${classes.Form_container} container`}>
      <CheckOutSteps step1 step2 />
      {alert && <Alert severity="warning">All fields are required</Alert>}
      <form onSubmit={submitHandler} className={classes.Login_form}>
        <div className={classes.Form_group}>
          <label htmlFor="user-address">Address</label>
          <input
            type="text"
            id="user-address"
            name="user Address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid address</p>
          </div>
        </div>
        <div className={classes.Form_group}>
          <label htmlFor="user_city">City</label>
          <input
            type="text"
            name="user_city"
            id="user_city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid Email</p>
          </div>
        </div>

        <div className={classes.Form_group}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            placeholder="Enter Your country"
            name="user_country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Please entaer a valid Password</p>
          </div>
        </div>
        <div className={classes.Form_group}>
          <label htmlFor="user_postal-code">Postal Code</label>
          <input
            type="text"
            name="user_postal-code"
            id="user_postal-code"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <div className={classes.Invalid_feedback}>
            <p>Password doesn't match</p>
          </div>
        </div>
        <div className={classes.Invalid_info}>
          <p>Email or Password is incorrect</p>
        </div>
        <Button color="primary" style={{ width: "100%" }}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default ShippingScreen;
