import React from "react";
import classes from "./CartScreen.module.css";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartActions";
// import Message from "../../Components/Message";

const CartScreen = ({ location, match, history }) => {
  const productId = match.params.id;

  const qty = location.search ? +location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div className={`container ${classes.Cart_section}`}>
      <h2>Shopping Cart</h2>
      <div className={classes.Cart_table_cont}>
        <table className={classes.Cart_table}>
          <thead>
            <tr>
              <th className={classes.Product_remove}>Remove</th>
              <th className={classes.Product_thumb}>Image</th>
              <th className={classes.Product_name}>Product</th>
              <th className={classes.Product_price}>Price</th>
              <th className={classes.Product_qty}>Quantity</th>
              {/* <th className={classes.Product_total_price}>Total</th> */}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product, i) => (
              <tr key={i}>
                <td className={classes.Table_product_remove}>
                  <button
                    onClick={() => removeFromCartHandler(product.product)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
                <td className={classes.Table_product_thumb}>
                  <img src={product.image[0]} alt={product.name} />
                </td>
                <td className={classes.Table_product_name}>
                  <Link to={`/product/${product.product}`}>{product.name}</Link>
                </td>
                <td className={classes.Table_product_price}>
                  <p>$ {product.price}</p>
                </td>
                <td className={classes.Table_product_qty}>
                  <select
                    className={classes.Qty_dropdown}
                    value={product.qty}
                    onChange={(e) =>
                      dispatch(addToCart(product.product, +e.target.value))
                    }
                  >
                    {[...Array(product.countInStock).keys()].map((elm) => (
                      <option key={elm + 1} value={elm + 1}>
                        {elm + 1}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className={classes.Cart_total}>
                <p>Cart Total</p>
              </td>
              <td colSpan="1" className={classes.Cart_total}>
                <p className={classes.Cart_total_price}>
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </p>
              </td>
              <td colSpan="3" className={classes.Cart_options}>
                <button
                  onClick={checkOutHandler}
                  className={`${classes.Btn} ${classes.Update_cart}`}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CartScreen;
