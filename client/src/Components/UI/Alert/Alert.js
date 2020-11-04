import React from "react";

import classes from "./Alert.module.css";

const alertType = {
  error: {
    icon: "fas fa-exclamation-circle",
    iconcolor: "#f44336",
    bgcolor: "#fdecea",
    color: "#611a15",
  },
  success: {
    icon: "far fa-check-circle",
    iconcolor: "#4caf50",
    bgcolor: "#edf7ed",
    color: "#1e4620",
  },
  warning: {
    icon: "fas fa-exclamation-triangle",
    iconcolor: "#ff9800",
    bgcolor: "#fff4e5",
    color: "#663c00",
  },
};

const Alert = ({ severity, children }) => {
  const containerStyle = {
    backgroundColor: alertType[severity].bgcolor,
    color: alertType[severity].color,
  };
  return (
    <div
      style={containerStyle}
      className={`container  ${classes.Alert_container}`}
    >
      <div
        style={{ color: alertType[severity].icncolor }}
        className={classes.Alert_icon_cont}
      >
        <i className={alertType[severity].icon}></i>
      </div>
      <div className={classes.Alert_container_message}>{children}</div>
    </div>
  );
};

Alert.defaultProps = {
  severity: "warning",
  children: "this is warning message",
};
export default Alert;
