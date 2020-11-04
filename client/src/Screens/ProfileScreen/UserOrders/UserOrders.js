import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listMyOrders } from "../../../actions/orderActions";
import Loader from "../../../Components/Loader";

import classes from "./UserOrders.module.css";

const UserOrders = () => {
  const dispatch = useDispatch();

  const orderMyList = useSelector((state) => state.orderMyList);

  const { loading, error, orders } = orderMyList;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className={classes.Order_container}>
          <h2>My Orders</h2>
          <table className={classes.Order_list_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>DELIVERED</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className={classes.Order_id}>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className={classes.Btn}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserOrders;
