import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToSaved,
  removeFromCart,
} from "../../actions/cartActions";
import Button from "../UI/Button/Button";

import classes from "./Product.module.css";

const Product = ({ product, width, clickHandler, refer }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userDetails;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartProducts = {};

  cartItems.forEach((item) => {
    cartProducts[`${item.product}`] = item.qty;
  });

  const addToFavorite = (id) => {
    !userInfo ? history.push("/login") : dispatch(addToSaved(id));
  };
  const handleIncQty = (id, prevQty) => {
    if (prevQty === product.countInStock) return;
    dispatch({ type: "CART_ADD_ITEM_RESET" });
    dispatch(addToCart(id, ++prevQty));
  };
  const handleDecQty = (id, prevQty) => {
    if (prevQty === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart(id, --prevQty));
    }
  };
  return (
    <>
      <div
        ref={refer && refer}
        className={`${classes.Product} ${classes.Product_conatiner_inner} ${
          width && classes[width]
        }`}
      >
        <div className={classes.Product_img}>
          <Link to={`/product/${product._id}`}>
            <img src={product.image[0]} alt={product.name} />
          </Link>
        </div>
        <div className={classes.Product_info}>
          <p className={classes.Product_name}>
            {product.name.length > 20
              ? product.name.substring(0, 20) + "..."
              : product.name}
          </p>
          <h3 className={classes.Product_price}>
            {product.sale ? (
              <>
                <span className={classes.Discount}>${product.price}</span>$
                {((product.price * (100 - product.discount)) / 100).toFixed(2)}
              </>
            ) : (
              "$" + product.price
            )}
          </h3>
        </div>
        <div className={classes.Product_label}>
          <ul>
            {product.countInStock === 0 && (
              <li className={classes.Sold_out}>
                <span>SoldOut</span>
              </li>
            )}
            {product.new && (
              <li>
                <span>New</span>
              </li>
            )}
            {product.sale && (
              <>
                <li>
                  <span>sale</span>
                </li>
                <li>
                  <span>{product.discount}%</span>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={classes.Add_to_cart}>
          {product.countInStock === 0 ? (
            <button className={classes.Btn}>Sold Out</button>
          ) : cartProducts[product._id] ? (
            <div className={classes.Cart_options}>
              <div className={classes.Item_btn}>
                <Button
                  color="primary"
                  style={{ borderRadius: "0 0 0 4px" }}
                  onClick={() =>
                    handleDecQty(product._id, cartProducts[product._id])
                  }
                >
                  -
                </Button>
              </div>
              <div className={classes.Item_qty}>
                {cartProducts[product._id]}
              </div>
              <div className={classes.Item_btn}>
                <Button
                  disabled={cartProducts[product._id] === product.countInStock}
                  color="primary"
                  style={{ borderRadius: "0 0 4px 0" }}
                  onClick={() =>
                    handleIncQty(product._id, cartProducts[product._id])
                  }
                >
                  +
                </Button>
              </div>
            </div>
          ) : (
            <Button
              cart={true}
              color="primary"
              onClick={() => dispatch(addToCart(product._id, 1))}
            >
              Add to cart
            </Button>
          )}
        </div>
        <div className={classes.Action_link}>
          <ul>
            <li className={classes.Add_wishlist}>
              <button
                onClick={() => {
                  addToFavorite(product._id);
                }}
              >
                <i className="far fa-heart"></i>
              </button>
              <div className={classes.Tooltip_text}>
                <span>wishing list</span>
              </div>
            </li>
            {/* <li className={classes.Add_compare}>
            <button>
              <i className="fas fa-sliders-h"></i>
            </button>
            <div className={classes.Tooltip_text}>
              <span>compare</span>
            </div>
          </li> */}
            <li className={classes.Quick_view}>
              <button onClick={() => clickHandler(product._id)}>
                <i className="fas fa-search"></i>
              </button>
              <div className={classes.Tooltip_text}>
                <span>discover</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Product;
