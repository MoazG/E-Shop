import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import Button from "../../Components/UI/Button/Button";
import CheckOutSteps from "../../Components/UI/CheckOutSteps/CheckOutSteps";

import classes from "../LoginScreen/LoginScreen.module.css";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <div className={`${classes.Form_container} container`}>
      <CheckOutSteps step1 step2 step3 />
      <form className={classes.Login_form} onSubmit={submitHandler}>
        <div className={classes.Form_group}>
          <p>Select Payment Method</p>
          <input
            className={classes.Payment_radio}
            type="radio"
            id="payment_method"
            value="PayPal"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="payment_method">Paypal</label>
        </div>
        <Button color="primary" style={{ width: "100%" }}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PaymentScreen;
