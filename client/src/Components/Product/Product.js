import classes from "./Product.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className={`${classes.Product} ${classes.Product_conatiner_inner}`}>
      <div className={classes.Product_img}>
        <Link to={`product/${product._id}`}>
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
          $
          {product.sale ? (
            <>
              <span className={classes.Discount}>{product.product_price}</span>`
              ${(product.product_price * (100 - product.discount)) / 100}`
            </>
          ) : (
            product.price
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
                <span>${product.discount}%</span>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* <div className={classes.Add_to_cart}>
        {product.countInStock === 0 ? (
          <button className={classes.Btn}>Sold Out</button>
        ) : (
          <button className={`${classes.Add_cart_btn} ${classes.Btn}`}>
            add to cart
          </button>
        )}
      </div> */}
      <div className={classes.Action_link}>
        <ul>
          <li className={classes.Add_cart}>
            <button>
              <i className="fas fa-shopping-cart"></i>
            </button>
            <div className={classes.Tooltip_text}>
              <p>Add to cart</p>
            </div>
          </li>
          <li className={classes.Add_wishlist}>
            <button>
              <i className="far fa-heart"></i>
            </button>
            <div className={classes.Tooltip_text}>
              <p>wishing list</p>
            </div>
          </li>
          <li className={classes.Add_compare}>
            <button>
              <i className="fas fa-sliders-h"></i>
            </button>
            <div className={classes.Tooltip_text}>
              <p>compare</p>
            </div>
          </li>
          <li className={classes.Quick_view}>
            <button>
              <i className="fas fa-search"></i>
            </button>
            <div className={classes.Tooltip_text}>
              <p>discover</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
