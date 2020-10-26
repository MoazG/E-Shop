import React from "react";
import { useState } from "react";

import classes from "../LoginScreen/LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";

import CheckOutSteps from "../../Components/UI/CheckOutSteps/CheckOutSteps";
import { saveShippingAddress } from "../../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <div className={`${classes.Form_container} container`}>
      <CheckOutSteps step1 step2 />

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
          <label htmlFor="register_password">Country</label>
          <input
            type="text"
            placeholder="Enter Your country"
            name="user_country"
            id="register_password"
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
        <input type="submit" value="Continue" />
      </form>
      {/* <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postalCode">
          <FormLabel>postalCode</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>*/}
    </div>
  );
};

export default ShippingScreen;
