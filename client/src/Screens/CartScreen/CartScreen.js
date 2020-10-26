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
  console.log(cartItems);
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
                {/* <Link className={`${classes.Btn} ${classes.Continue_shopping}`}>
                  Continue Shopping
                </Link> */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    // <Row>
    //   <Col md={8}>
    //     <h1>Shopping Cart</h1>
    //     {cartItems.length === 0 ? (
    //       <Message>
    //         Your Cart is empty <Link to="/">Continue Shopping</Link>
    //       </Message>
    //     ) : (
    //       <ListGroup variant="flush">
    //         {cartItems.map((elm) => (
    //           <ListGroupItem key={elm.product}>
    //             <Row>
    //               <Col md={2}>
    //                 <Image src={elm.image} alt={elm.name} fluid rounded />
    //               </Col>
    //               <Col md={3}>
    //                 <Link to={`/product/${elm.product}`}>{elm.name}</Link>
    //               </Col>
    //               <Col md={2}>${elm.price}</Col>
    //               <Col md={2}>
    //                 <Control
    //                   as="select"
    //                   value={elm.qty}
    //                   onChange={(e) =>
    //                     dispatch(addToCart(elm.product, +e.target.value))
    //                   }
    //                 >
    //                   {[...Array(elm.countInStock).keys()].map((elm) => (
    //                     <option key={elm + 1} value={elm + 1}>
    //                       {elm + 1}
    //                     </option>
    //                   ))}
    //                 </Control>
    //               </Col>
    //               <Col md={2}>
    //                 <Button
    //                   type="button"
    //                   variant="light"
    //                   onClick={() => removeFromCartHandler(elm.product)}
    //                 >
    //                   <i classNameName="fas fa-trash"></i>
    //                 </Button>
    //               </Col>
    //             </Row>
    //           </ListGroupItem>
    //         ))}
    //       </ListGroup>
    //     )}
    //   </Col>
    //   <Col md={4}>
    //     <Card>
    //       <ListGroup variant="flush">
    //         <ListGroupItem>
    //           <h2>
    //             Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
    //             items
    //           </h2>
    //           $
    //           {cartItems
    //             .reduce((acc, item) => acc + item.qty * item.price, 0)
    //             .toFixed(2)}
    //         </ListGroupItem>
    //         <ListGroupItem>
    //           <Button
    //             type="button"
    //             classNameName="btn-block"
    //             disabled={cartItems.length === 0}
    //             onClick={checkOutHandler}
    //           >
    //             Checkout
    //           </Button>
    //         </ListGroupItem>
    //       </ListGroup>
    //     </Card>
    //   </Col>
    // </Row>
  );
};

export default CartScreen;
