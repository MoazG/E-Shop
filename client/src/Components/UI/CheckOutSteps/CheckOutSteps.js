import React from "react";
import classes from "./CheckOutSteps.module.css";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={classes.Checkout_steps}>
      <div className={step1 ? classes.Active : ""}>Sign-in</div>
      <div className={step2 ? classes.Active : ""}>Shipping</div>
      <div className={step3 ? classes.Active : ""}>Payment</div>
      <div className={step4 ? classes.Active : ""}>Place Order</div>
    </div>
  );
};

export default CheckOutSteps;
