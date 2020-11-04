import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Alert from "./Components/UI/Alert/Alert";
import classes from "./Layout.module.css";
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const {
    success: successSaveItem,
    error: failSaveItem,
    favorites,
  } = useSelector((state) => state.addFavoriteItem);

  const { success: sucessAddToCart, productName } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (successSaveItem || failSaveItem) {
      setTimeout(() => dispatch({ type: "SAVED_ITEM_ADD_RESET" }), 3000);
    }
    if (sucessAddToCart) {
      setTimeout(() => dispatch({ type: "CART_ADD_ITEM_RESET" }), 3000);
    }
  });
  return (
    <>
      {failSaveItem && (
        <div className={classes.Alert_cont}>
          <Alert severity="warning">{failSaveItem}</Alert>
        </div>
      )}
      {sucessAddToCart && (
        <div className={classes.Alert_cont}>
          <Alert severity="success">{productName} Added To Your Cart</Alert>
        </div>
      )}
      {successSaveItem && (
        <div className={classes.Alert_cont}>
          <Alert severity="success">{favorites} added to your wishlist</Alert>
        </div>
      )}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
