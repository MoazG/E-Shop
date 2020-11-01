import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
const Modal = ({
  children,
  title,
  showModal,
  showHandler,
  confirmHandler,
  loading,
}) => {
  return (
    <>
      <Backdrop show={showModal} showHandler={showHandler} />
      <div
        className={`${classes.Modal} ${
          showModal ? classes.Show : classes.Hide
        }`}
      >
        <div className={classes.Modal_top}>
          <h4>{title}</h4>
          <button
            onClick={() => showHandler(!showModal)}
            className={classes.Circle_close_btn}
          >
            x
          </button>
        </div>
        <div className={classes.Modal_body}>{children}</div>
        <div className={classes.Modal_footer}>
          <Button
            loading={loading}
            onClick={() => confirmHandler()}
            color="primary"
          >
            Confirm
          </Button>
          <Button onClick={() => showHandler(!showModal)}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
