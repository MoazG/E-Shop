import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listSearchProducts } from "../../../actions/productActions";

import Message from "../../Message";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SearchBox.module.css";
const SearchBox = ({ showSearch }) => {
  let history = useHistory();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const { products, loading, error } = searchResults;

  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (keyword === inputRef.current.value) {
        if (keyword.length > 0) {
          setShowBackdrop(true);
          dispatch(listSearchProducts(keyword));
        } else {
          setShowBackdrop(false);
        }
      }
    }, 500);
  }, [keyword, dispatch, inputRef]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowBackdrop(false);
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}`);
    } else {
      history.push("/products/categories");
    }
  };

  return (
    <div
      className={`${classes.Search_box_cont} ${showSearch && classes.Active}`}
    >
      <form className={classes.Search_box_form} onSubmit={submitHandler}>
        <input
          type="search"
          placeholder="What are you looking for?"
          className={classes.Search_input}
          value={keyword}
          ref={inputRef}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <input type="button" value="Search" className={classes.Search_button} />
      </form>
      <div
        className={`${classes.Search_results} ${!showBackdrop && classes.Hide}`}
      >
        {loading ? (
          <div className={classes.Loader}>Loading...</div>
        ) : error ? (
          <Message />
        ) : products.length === 0 ? (
          <h3>No Products</h3>
        ) : (
          <ul>
            {products.map((product) => (
              <li className={classes.Suggestion} key={product._id}>
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => setShowBackdrop(false)}
                >
                  <div className={classes.Product_search_cont}>
                    <div className={classes.Search_img}>
                      <img src={product.image[0]} alt={product.name} />
                    </div>
                    <div className={classes.Search_title}>
                      <h3>{product.name}</h3>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Backdrop show={showBackdrop} showHandler={setShowBackdrop} />
    </div>
  );
};

export default SearchBox;
