import React from "react";
import { Link } from "react-router-dom";
import classes from "./CheckOutSteps.module.css";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={classes.Checkout_steps}>
      <div className={step1 ? classes.Active : classes.Disabled}>
        <Link
          to="/login"
          onClick={(e) => {
            !step1 && e.preventDefault();
          }}
        >
          Sign-in
        </Link>
      </div>
      <div className={step2 ? classes.Active : classes.Disabled}>
        <Link
          to="/shipping"
          onClick={(e) => {
            !step2 && e.preventDefault();
          }}
        >
          Shipping
        </Link>
      </div>
      <div className={step3 ? classes.Active : classes.Disabled}>
        <Link
          to="/payment"
          onClick={(e) => {
            !step3 && e.preventDefault();
          }}
        >
          Payment
        </Link>
      </div>
      <div className={step4 ? classes.Active : classes.Disabled}>
        <Link
          to="/placeorder"
          onClick={(e) => {
            !step4 && e.preventDefault();
          }}
        >
          Place Order
        </Link>
      </div>
    </div>
  );
};

export default CheckOutSteps;
