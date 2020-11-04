import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Product from "../../Components/Product/Product";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import CheckBox from "../../Components/CheckBox/CheckBox";

import { listFilteredProducts } from "../../actions/productActions";

import classes from "./ProductFilterScreen.module.css";
import Backdrop from "../../Components/UI/Backdrop/Backdrop";
import QuickViewProduct from "../../Components/QuickViewProduct/QuickViewProduct";
import { Link } from "react-router-dom";
import Dropdown from "../../Components/UI/Dropdown/Dropdown";
import Button from "../../Components/UI/Button/Button";

const ProductFilterScreen = ({ match, location }) => {
  const keyword = match.params.keyword;
  const categoryParams = match.params.category ? match.params.category : "";
  const brandParams = match.params.brand ? match.params.brand : "";
  // const selectedCategory = useSelector((state) => state.selectedCategory);
  // const { brand, category } = selectedCategory;

  const [showQuickView, setShowQuickView] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [productId, setProductId] = useState("");
  const [myFilter, setMyFilter] = useState({
    filters: { category: [], brand: [] },
  });
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("count");
    dispatch({ type: "PRODUCT_FILTERS_RESET" });
    dispatch(
      listFilteredProducts({
        filters: myFilter.filters,
        keyword,
        catName: categoryParams,
        brandName: brandParams,
        limit: 9,
        ...sort,
      })
    );
  }, [dispatch, myFilter, keyword, sort, categoryParams, brandParams]);

  // useEffect(() => {
  //   dispatch(
  //     listFilteredProducts({ filters: myFilter.filters, keyword, ...sort })
  //   );
  // }, [dispatch, myFilter, keyword, sort]);

  const { loading, products, error, page, pages } = useSelector(
    (state) => state.filteredProducts
  );

  const observer = useRef(null);
  // let root = useRef(null);
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const lastProduct = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < pages) {
          console.log("Observed");
          dispatch(
            listFilteredProducts({
              filters: myFilter.filters,
              keyword,
              catName: categoryParams,
              brandName: brandParams,
              limit: 9,
              page: page + 1,
              ...sort,
            })
          );
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [
      loading,
      dispatch,
      myFilter,
      keyword,
      sort,
      categoryParams,
      brandParams,
      page,
      pages,
      options,
    ]
  );

  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);

  const loadingState = () => {
    return <Loader style={{ padding: "1rem" }} />;
  };

  const errorState = () => {
    return <Message variant={"danger"}>{error}</Message>;
  };

  const handleFilter = (filter, filterBy) => {
    const newFilter = { ...myFilter };
    newFilter.filters[filterBy] = filter;
    setMyFilter(newFilter);
  };

  const sortByHandler = (sort) => {
    switch (sort) {
      case "p_height":
        setSort({ sortBy: "price", order: "desc" });
        break;
      case "p_low":
        setSort({ sortBy: "price", order: "asc" });
        break;
      case "featured":
        break;
      case "top_rate":
        setSort({ sortBy: "rating" });
        break;
      default:
        break;
    }
  };

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

  const renderFilterByMobile = () => {
    return (
      <>
        <Backdrop show={showFilterMobile} showHandler={setShowFilterMobile} />
        <div className={classes.Categories_cont_mobile}>
          <div className={classes.Categories_mobile_action}>
            {/* <button onClick={() => setShowFilterMobile(false)}>done</button> */}
            <Button onClick={() => setShowFilterMobile(false)}>Done</Button>
          </div>
          <div className={classes.Filter_by_category}>
            <Dropdown header="Filter By Category">
              <CheckBox
                categories={categories}
                handleFilters={(filter) => handleFilter(filter, "category")}
              />
            </Dropdown>
          </div>
          <div className={classes.Filter_by_brand}>
            <Dropdown header="Filter By brand">
              <CheckBox
                categories={brands}
                handleFilters={(filter) => handleFilter(filter, "brand")}
              />
            </Dropdown>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={classes.Bread_crumbs_section}>
        <div className="container">
          <Link to="/">Home</Link> / Products
        </div>
      </div>
      <div className={`container ${classes.Product_filter_cont}`}>
        {quicklViewHandler(productId)}
        {showFilterMobile && renderFilterByMobile()}
        <button
          className={classes.FilterBy_mobile}
          onClick={() => setShowFilterMobile(true)}
        >
          <i className="fas fa-filter"></i>
        </button>
        <div className={classes.Categories_cont}>
          <div className={classes.Filter_by_category}>
            <Dropdown header="Filter By Category">
              <CheckBox
                categories={categories}
                handleFilters={(filter) => handleFilter(filter, "category")}
              />
            </Dropdown>
          </div>
          <div className={classes.Filter_by_brand}>
            <Dropdown header="Filter By brand">
              <CheckBox
                categories={brands}
                handleFilters={(filter) => handleFilter(filter, "brand")}
              />
            </Dropdown>
          </div>
        </div>
        <div className={`${classes.Products}`}>
          <div className={classes.Shop_toolbar}>
            <div className={classes.Shop_toolbar_btn}>
              <div>
                <button>
                  <i className="fas fa-th"></i>
                </button>
              </div>
              <div>
                <button>
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
            <div className={classes.Shop_toolbar_opt}>
              <label htmlFor="SortBy">Sort by</label>
              <select
                name="SortBy"
                id="SortBy"
                onChange={(e) => sortByHandler(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="top_rate">Top Rated</option>
                <option value="p_height">Price hight to low</option>
                <option value="p_low">Price low to height</option>
              </select>
            </div>
          </div>

          <>
            {error && errorState()}
            <div className={classes.Products_container}>
              {products.map((product, i) => {
                if (i + 1 === products.length) {
                  return (
                    <Product
                      key={product._id}
                      product={product}
                      width={"Product_1_3"}
                      clickHandler={onClickQuickViewHandler}
                      refer={lastProduct}
                    />
                  );
                } else {
                  return (
                    <Product
                      key={product._id}
                      product={product}
                      width={"Product_1_3"}
                      clickHandler={onClickQuickViewHandler}
                    />
                  );
                }
              })}
              {/* {products.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    width={"Product_1_3"}
                    clickHandler={onClickQuickViewHandler}
                  />
                ))} */}
            </div>
            {loading && loadingState()}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductFilterScreen;
