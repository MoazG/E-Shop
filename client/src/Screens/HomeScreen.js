import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Product from "../Components/Product/Product";

// import { listProducts,  } from "../actions/productActions";
import {
  listFilteredProducts,
  listTopProducts,
} from "../actions/productActions";

import Loader from "../Components/Loader";

import classes from "./HomeScreen.module.css";
import QuickViewProduct from "../Components/QuickViewProduct/QuickViewProduct";
import Backdrop from "../Components/UI/Backdrop/Backdrop";
import { Link } from "react-router-dom";
import Carousel from "../Components/UI/Carousel/Carousel";
import Alert from "../Components/UI/Alert/Alert";

const HomeScreen = ({ match }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTopProducts({ sortBy: "rating", limit: "4" }));
    dispatch({ type: "PRODUCT_FILTERS_RESET" });
    dispatch(listFilteredProducts({ sortBy: "sale", limit: "4" }));
  }, [dispatch]);
  const {
    // loading: filterLoading,
    products: filteredProducts,
    // error: filterError,
  } = useSelector((state) => state.filteredProducts);
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  const quicklViewHandler = (id) => {
    return (
      <>
        <CSSTransition
          in={showQuickView}
          timeout={300}
          classNames="quickViewModal"
          mountOnEnter
          unmountOnExit
        >
          <QuickViewProduct
            productId={id}
            showQuickView={showQuickView}
            setShowQuickView={setShowQuickView}
          />
        </CSSTransition>
        <Backdrop
          show={showQuickView}
          showHandler={setShowQuickView}
          zIndex={899}
        />
      </>
    );
  };

  const onClickQuickViewHandler = (id) => {
    setShowQuickView(true);
    setProductId(id);
  };

  const loadingState = () => {
    return <Loader />;
  };
  const errorState = () => {
    return <Alert severity="error">{error}</Alert>;
  };
  return (
    <>
      <div className={classes.Slider_cont}>
        <Carousel></Carousel>
      </div>

      <div className={`${classes.Shipping_container} container`}>
        <div className={classes.Area}>
          <i className="fas fa-shipping-fast"></i>
          <div>
            <h2>free shipping</h2>
            <p>Free shipping for all buying</p>
          </div>
        </div>
        <div className={classes.Area}>
          <i className="fas fa-headset"></i>
          <div>
            <h2>support</h2>
            <p>Contact us 24 hours a day</p>
          </div>
        </div>
        <div className={classes.Area}>
          <i className="fas fa-hand-holding-usd"></i>
          <div>
            <h2>money back</h2>
            <p>30 days to Return</p>
          </div>
        </div>
        <div className={classes.Area}>
          <i className="fas fa-shield-alt"></i>
          <div>
            <h2>Payment Secure</h2>
            <p>We ensure secure payment</p>
          </div>
        </div>
      </div>

      <div className={`${classes.Offer_section} container`}>
        <div className={classes.Banner1}>
          <Link to="/">
            <img src="/img/offer1.webp" alt="" />
          </Link>
        </div>
        <div className={classes.Banner2}>
          <Link to="/">
            <img src="./img/offer2.webp" alt="" />
          </Link>
        </div>
        <div className={classes.Banner3}>
          <Link to="/">
            <img src="./img/offer3.webp" alt="" />
          </Link>
        </div>
      </div>

      <div className={`container ${classes.Products}`}>
        <div className={classes.Title_cont}>
          <h2>Hot Deals</h2>{" "}
          <Link to="/products/categories?sortBy=sale">
            See More <i className="fas fa-angle-right"></i>
          </Link>
        </div>
        {loading ? (
          loadingState()
        ) : error ? (
          errorState()
        ) : (
          <>
            {quicklViewHandler(productId)}
            <div className={classes.Products_container}>
              {filteredProducts.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  clickHandler={onClickQuickViewHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div
        className={`container ${classes.Products}`}
        style={{ marginTop: "1rem" }}
      >
        <div className={classes.Title_cont}>
          <h2>Top Products</h2>{" "}
          <Link to="/products/categories?sortBy=rating">
            See More <i className="fas fa-angle-right"></i>
          </Link>
        </div>
        {loading ? (
          loadingState()
        ) : error ? (
          errorState()
        ) : (
          <>
            {quicklViewHandler(productId)}
            <div className={classes.Products_container}>
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  clickHandler={onClickQuickViewHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
