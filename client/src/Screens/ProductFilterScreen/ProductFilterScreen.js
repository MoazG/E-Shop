import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Product from "../../Components/Product/Product";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import CheckBox from "../../Components/CheckBox/CheckBox";
// import Paginate from "../../Components/Paginate";

import { listFilteredProducts } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";

import classes from "./ProductFilterScreen.module.css";
import Backdrop from "../../Components/UI/Backdrop/Backdrop";
import QuickViewProduct from "../../Components/QuickViewProduct/QuickViewProduct";

const ProductFilterScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const [showQuickView, setShowQuickView] = useState(false);
  const [productId, setProductId] = useState("");
  const [myFilter, setMyFilter] = useState({
    filters: { category: [], brand: [] },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFilteredProducts(myFilter.filters, keyword));
    dispatch(listCategories());
  }, [dispatch, myFilter, keyword]);

  const { loading, products, error } = useSelector(
    (state) => state.filteredProducts
  );
  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);

  const loadingState = () => {
    return <Loader />;
  };
  const errorState = () => {
    return <Message variant={"danger"}>{error}</Message>;
  };

  const handleFilter = (filter, filterBy) => {
    const newFilter = { ...myFilter };
    newFilter.filters[filterBy] = filter;
    setMyFilter(newFilter);
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

  return (
    <div className={`container ${classes.Product_filter_cont}`}>
      {quicklViewHandler(productId)}
      <div className={classes.Categories_cont}>
        <div className={classes.Filter_by_category}>
          <h4>Filter By Category</h4>
          <ul className={classes.Filter_by_category_ul}>
            <CheckBox
              categories={categories}
              handleFilters={(filter) => handleFilter(filter, "category")}
            />
          </ul>
        </div>
        <div className={classes.Filter_by_brand}>
          <h4>Filter By Brands</h4>
          <ul className={classes.Filter_by_brand_ul}>
            <CheckBox
              categories={brands}
              handleFilters={(filter) => handleFilter(filter, "brand")}
            />
          </ul>
        </div>
      </div>
      <div className={`${classes.Products}`}>
        <h1>Latest Products</h1>
        {loading ? (
          loadingState()
        ) : error ? (
          errorState()
        ) : (
          <>
            <div className={classes.Products_container}>
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  width={"Product_1_3"}
                  clickHandler={onClickQuickViewHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductFilterScreen;
