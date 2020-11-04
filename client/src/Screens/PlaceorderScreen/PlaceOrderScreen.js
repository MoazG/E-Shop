import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CheckOutSteps from "../../Components/UI/CheckOutSteps/CheckOutSteps";
import { createOrder } from "../../actions/orderActions";

import classes from "./PlaceOrderScreen.module.css";
import Alert from "../../Components/UI/Alert/Alert";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) =>
        acc + ((item.price * (100 - item.discount)) / 100) * item.qty,
      0
    )
  );

  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100 ? 0 : cart.itemsPrice * 0.1
  );
  cart.taxPrice = addDecimals(Number((0.14 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  //eslint-disable-next-line
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    let cartItems = cart.cartItems.map((product) => {
      return { ...product, image: product.image[0] };
    });

    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="container">
      <CheckOutSteps step1 step2 step3 step4 />
      <div className={classes.Placeorder_cont}>
        <div className={classes.Payment_info}>
          <h2>Order Information</h2>
          <div className={classes.Shipping_address}>
            <p>
              <strong>Shipping Address: </strong>
              {shippingAddress.address},{shippingAddress.city},
              {shippingAddress.country},{shippingAddress.postalCode}
            </p>
          </div>
          <div className={classes.Payment_method}>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>
          <div className={classes.List_order_items}>
            {cart.cartItems.length === 0 ? (
              <Alert severity="warning">Your cart is empty </Alert>
            ) : (
              <div className={classes.Cart_table_cont}>
                <h4>Order products</h4>
                <table className={classes.Cart_table}>
                  <thead>
                    <tr>
                      <th className={classes.Product_thumb}>Image</th>
                      <th className={classes.Product_name}>Product</th>
                      <th className={classes.Product_price}>Price</th>
                      <th className={classes.Product_qty}>Qty</th>
                      <th className={classes.Product_total}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartItems.map((product, i) => (
                      <tr key={i}>
                        <td className={classes.Table_product_thumb}>
                          <img src={product.image[0]} alt={product.name} />
                        </td>
                        <td className={classes.Table_product_name}>
                          <Link to={`/product/${product.product}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td className={classes.Table_product_price}>
                          <p>
                            ${" "}
                            {(
                              (product.price * (100 - product.discount)) /
                              100
                            ).toFixed(2)}
                          </p>
                        </td>
                        <td className={classes.Table_product_qty}>
                          <p>{product.qty}</p>
                        </td>
                        <td className={classes.Table_product_total}>
                          $
                          {(
                            (product.qty *
                              (product.price * (100 - product.discount))) /
                            100
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className={classes.Order_summary}>
          <h2>Order Summary</h2>
          <div>
            <strong>Items price: </strong>
            <p>{cart.itemsPrice}</p>
          </div>
          <div>
            <strong>Shipping price: </strong>
            <p>
              {+cart.shippingPrice === 0 ? (
                <span style={{ color: "green" }}>Free</span>
              ) : (
                cart.shippingPrice
              )}
            </p>
          </div>
          <div>
            <strong>Tax: </strong>
            <p>{cart.taxPrice}</p>
          </div>
          <div>
            <strong>Total price: </strong>
            <p>{cart.totalPrice}</p>
          </div>
          <button
            className={classes.Btn}
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
