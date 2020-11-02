import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";
const Button = ({
  children,
  color,
  style,
  disabled,
  href,
  loading,
  cart,
  ...others
}) => {
  let btnColor = color ? color[0].toUpperCase() + color.substr(1) : "Default";
  if (href) {
    return (
      <Link
        to={href}
        className={`${classes.Btn} ${classes[btnColor]} ${
          disabled && classes.Disabled
        }`}
        style={style ? style : {}}
        {...others}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={`${classes.Btn}  ${classes[btnColor]} ${
          cart && classes.Cart_btn
        }
        ${disabled || loading ? classes.Disabled : ""}`}
        disabled={disabled || loading}
        style={style ? style : {}}
        {...others}
      >
        {loading && (
          <i className="fa fa-circle-o-notch fa-spin">
            <i className={`fas fa-spinner ${classes.Loading_spinner}`}></i>
          </i>
        )}
        {children}
      </button>
    );
  }
};

export default Button;
