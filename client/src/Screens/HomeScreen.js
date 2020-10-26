import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../Components/Product/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import classes from "./HomeScreen.module.css";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const { loading, products, pages, page, error } = useSelector(
    (state) => state.productList
  );

  const loadingState = () => {
    return <Loader />;
  };
  const errorState = () => {
    return <Message variant={"danger"}>{error}</Message>;
  };
  return (
    <div className={`container ${classes.Products}`}>
      <h1>Latest Products</h1>
      {loading ? (
        loadingState()
      ) : error ? (
        errorState()
      ) : (
        <>
          <div className={classes.Products_container}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
