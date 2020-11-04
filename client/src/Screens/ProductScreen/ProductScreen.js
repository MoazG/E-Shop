import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Rating from "../../Components/UI/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../../actions/productActions";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import classes from "./ProductScreen.module.css";
import Button from "../../Components/UI/Button/Button";

const ProductScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    success: successProductReview,
    error: errorProductReview,
    loading: loadingProductReview,
  } = useSelector((state) => state.productReviewCreate);
  useEffect(() => {
    if (successProductReview) {
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const loadingState = () => {
    return <Loader />;
  };
  const errorState = () => {
    return <Message variant={"danger"}>{error}</Message>;
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
    <React.Fragment>
      {loading ? (
        loadingState()
      ) : error ? (
        errorState()
      ) : (
        <div className="container">
          {/* <Button href="/">Go Back</Button> */}
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
                        key={i}
                        className={`${classes.Other_img_li} ${
                          product.image[0] === elm && classes.Active
                        }`}
                      >
                        <img
                          onClick={(e) => setMainImageHandler(e)}
                          src={elm}
                          alt={elm}
                          data-imageindex={i}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={classes.Product_info_text}>
              <h2>{product.name}</h2>
              {product.sale && (
                <div className={classes.Product_info_rating}>
                  <strong>Sale : </strong>
                  {product.discount} %
                </div>
              )}
              <div className={classes.Product_info_price}>
                <strong>Price : </strong>
                {product.sale ? (
                  <>
                    <span className={classes.Discount}>${product.price}</span>$
                    {((product.price * (100 - product.discount)) / 100).toFixed(
                      2
                    )}
                  </>
                ) : (
                  "$" + product.price
                )}
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
                {/* <button
                  onClick={addToCartHandler}
                  className={classes.Add_cart_btn}
                >
                  Add To Cart
                </button> */}
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
          <div className={classes.Review_cont}>
            <div className={classes.Reviews_list}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Review</Message>}
              {product.reviews.map((review) => (
                <div className={classes.Customer_review_cont} key={review._id}>
                  <Rating value={review.rating}></Rating>
                  <p>
                    By <strong>{review.name}</strong> on{" "}
                    {review.createdAt.substring(0, 10)}
                  </p>

                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <div className={classes.Review_create}>
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              <h2>Write a customer review</h2>
              {userInfo ? (
                <form onSubmit={submitHandler} className={classes.Form_review}>
                  <div className={classes.Form_group}>
                    <label htmlFor="R_dropdown">Rating</label>
                    <select
                      id="R_dropdown"
                      className={classes.Rating_dropdown}
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">4 - Excellent</option>
                    </select>
                  </div>
                  <div className={classes.Form_group}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="40"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    loading={loadingProductReview}
                  >
                    Submit Review
                  </Button>
                </form>
              ) : (
                <Message>
                  Please{" "}
                  <Link to={`/login?redirect=/product/${productId}`}>
                    Login
                  </Link>{" "}
                  to review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
