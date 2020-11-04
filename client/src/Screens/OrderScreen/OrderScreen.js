import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import Loader from "../../Components/Loader";
import classes from "../PlaceorderScreen/PlaceOrderScreen.module.css";
import { CART_RESET_ITEMS } from "../../constants/cartConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) =>
          acc + ((item.price * (100 - item.discount)) / 100) * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: "ORDER_CREATE_RESET" });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: CART_RESET_ITEMS });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    //eslint-disable-next-line
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <div className={classes.Placeorder_cont} style={{ paddingTop: "2rem" }}>
        <div className={classes.Payment_info}>
          <h2>Order Information</h2>
          <div className={classes.Shipping_address}>
            <p>
              <strong>Order id: </strong>
              {order._id}
            </p>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>
          <div className={classes.Payment_method}>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">
                <strong>Paid on</strong> {order.paidAt}
              </Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>
          <div className={classes.List_order_items}>
            {order.orderItems.length === 0 ? (
              <Message>Your cart is empty </Message>
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
                    {order.orderItems.map((product, i) => (
                      <tr key={i}>
                        <td className={classes.Table_product_thumb}>
                          <img
                            src={
                              typeof product.image === "string"
                                ? product.image
                                : product.image[0]
                            }
                            alt={product.name}
                          />
                        </td>
                        <td className={classes.Table_product_name}>
                          <Link to={`/product/${product.product}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td className={classes.Table_product_price}>
                          <p>
                            $ {(product.price * (100 - product.discount)) / 100}
                          </p>
                        </td>
                        <td className={classes.Table_product_qty}>
                          <p>{product.qty}</p>
                        </td>
                        <td className={classes.Table_product_total}>
                          ${" "}
                          {(product.qty *
                            (product.price * (100 - product.discount))) /
                            100}
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
            <p>{order.itemsPrice}</p>
          </div>
          <div>
            <strong>Shipping price: </strong>
            <p>
              {+order.shippingPrice === 0 ? (
                <span style={{ color: "green" }}>Free</span>
              ) : (
                order.shippingPrice
              )}
            </p>
          </div>
          <div>
            <strong>Tax: </strong>
            <p>{order.taxPrice}</p>
          </div>
          <div>
            <strong>Total price: </strong>
            <p>{order.totalPrice}</p>
          </div>

          {!order.isPaid && (
            <>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </>
          )}

          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button className={classes.Btn} onClick={deliverHandler}>
              Mark As Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
