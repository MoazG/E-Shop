import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../../actions/productActions";

import Rating from "../UI/Rating/Rating";
import Loader from "../Loader";
import Button from "../UI/Button/Button";

import classes from "./QuickViewProduct.module.css";
import Alert from "../UI/Alert/Alert";

const QuickViewProduct = ({ productId, showQuickView, setShowQuickView }) => {
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const loadingState = () => {
    return <Loader />;
  };
  const errorState = () => {
    return <Alert severity="error">{error}</Alert>;
  };
  let imageContRef = useRef(null);
  let mainImageRef = useRef(null);
  let activeImage = 0;
  const nextImageHandler = () => {
    imageContRef.current.children[activeImage].classList.remove(
      `${classes.Active}`
    );
    activeImage = (activeImage + 1) % product.image.length;
    mainImageRef.current.setAttribute("src", `${product.image[activeImage]}`);
    imageContRef.current.children[activeImage].classList.add(
      `${classes.Active}`
    );
  };
  const prevImageHandler = () => {
    imageContRef.current.children[activeImage].classList.remove(
      `${classes.Active}`
    );
    activeImage =
      (activeImage + product.image.length - 1) % product.image.length;
    mainImageRef.current.setAttribute("src", `${product.image[activeImage]}`);
    imageContRef.current.children[activeImage].classList.add(
      `${classes.Active}`
    );
  };
  const setMainImageHandler = (e) => {
    let currentImageIndex = e.target.dataset.imageindex;

    imageContRef.current.children[activeImage].classList.remove(
      `${classes.Active}`
    );
    activeImage = +currentImageIndex;
    mainImageRef.current.setAttribute("src", `${product.image[activeImage]}`);
    imageContRef.current.children[activeImage].classList.add(
      `${classes.Active}`
    );
  };
  return (
    <div className={classes.QuicK_view_modal}>
      {loading ? (
        loadingState()
      ) : error ? (
        errorState()
      ) : (
        <>
          <div className={classes.Product_info_title}>
            <h2>{product.name}</h2>
            <button
              onClick={() => setShowQuickView(false)}
              className={classes.Close_btn}
            >
              x
            </button>
          </div>
          <div className={` ${classes.Product_info_cont}`}>
            <div className={classes.Product_info_img}>
              <div className={classes.Main_img}>
                <img
                  src={product.image && product.image[0]}
                  alt={product.name}
                  ref={mainImageRef}
                />

                <button
                  className={classes.Next_img_btn}
                  onClick={nextImageHandler}
                >
                  <i className="fa fa-angle-right"></i>
                </button>

                <button
                  className={classes.Prev_img_btn}
                  onClick={prevImageHandler}
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </div>
              <div className={classes.Other_img}>
                <ul ref={imageContRef}>
                  {product.image &&
                    product.image.map((elm, i) => (
                      <li
                        onClick={(e) => setMainImageHandler(e)}
                        key={i}
                        className={`${classes.Other_img_li} ${
                          product.image[0] === elm && classes.Active
                        }`}
                      >
                        <img src={elm} alt={elm} data-imageindex={i} />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={classes.Product_info_text}>
              <h2>{product.name}</h2>
              <div className={classes.Product_info_price}>
                <strong>Price : </strong> $50,00
              </div>
              <div className={classes.Product_info_rating}>
                <Rating
                  color={"#f8e825"}
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className={classes.Product_info_desc}>
                <strong>Description: </strong> {product.description}
              </div>
            </div>
            <div className={classes.Product_info_action}>
              <div className={classes.Status}>
                <p>Status</p>
                {product.countInStock > 0 ? (
                  <span style={{ color: "green" }}>In Stock</span>
                ) : (
                  <span style={{ color: "red" }}>Out OF Stock</span>
                )}
              </div>
              <div className={classes.Qty}>
                <p>QTY</p>
                <select
                  className={classes.Qty_dropdown}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((elm) => (
                    <option key={elm + 1} value={elm + 1}>
                      {elm + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.Add_cart}>
                <Button
                  color="primary"
                  onClick={addToCartHandler}
                  style={{ width: "100%" }}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    //   <Backdrop show={showQuickView} showHandler={setShowQuickView} />
  );
};

export default QuickViewProduct;
