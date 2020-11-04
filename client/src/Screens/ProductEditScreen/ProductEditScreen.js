import axios from "axios";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";

import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/productConstants";
import classes from "../LoginScreen/LoginScreen.module.css";
import css from "./ProductEditScreen.module.css";
import Button from "../../Components/UI/Button/Button";
import { listCategories } from "../../actions/categoryActions";
import { CATEGORY_LIST_RESET } from "../../constants/categoryConstants";
import { BRAND_LIST_RESET } from "../../constants/brandConstants";

const ProductEditScreen = ({ match, history, location }) => {
  const productId = match.params.id;

  const redirect = location.search ? location.search.split("=")[1] : "";

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [sale, setSale] = useState(false);
  const [discount, setDiscount] = useState(0);
  // eslint-disable-next-line
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const categoriesList = useSelector((state) => state.categoryList);
  const { categories } = categoriesList;

  const brandsList = useSelector((state) => state.brandList);
  const { brands } = brandsList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: CATEGORY_LIST_RESET });
      dispatch({ type: BRAND_LIST_RESET });
      history.push(`/admin/productlist${redirect}`);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
        dispatch(listCategories());
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    categories,
    redirect,
  ]);

  const uploadFileHandler = async (e) => {
    const files = e.target.files;

    const formData = new FormData();
    // formData.append("image", file);
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        sale,
        discount,
      })
    );
  };

  return (
    <div className={` container ${css.Productlist_cont}`}>
      <Button href={`/admin/productlist${redirect}`}>Go Back</Button>
      <div className={classes.Form_container}>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form className={classes.Login_form} onSubmit={submitHandler}>
            <div className={classes.Form_group}>
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Name</p>
              </div>
            </div>

            <div className={classes.Form_group}>
              <label htmlFor="product_price">Product Price</label>
              <input
                type="number"
                id="product_price"
                name="product_price"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Email</p>
              </div>
            </div>
            <div className={classes.Form_group}>
              <label htmlFor="product_qty">Product Quantity</label>
              <input
                type="number"
                name="product_qty"
                placeholder="Enter Count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Email</p>
              </div>
            </div>

            <div className={`${classes.Form_group} ${css.Dropdown_cont}`}>
              <label htmlFor="product_category">Product Category</label>
              <select
                name="product_category"
                id="product_category"
                value={category._id}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, id) => (
                  <option key={id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={classes.Form_group}
              style={{ marginBottom: "1rem" }}
            >
              <label htmlFor="sale">Sale</label>
              <input
                type="checkbox"
                name="sale"
                id="sale"
                checked={sale}
                onChange={(e) => setSale(e.target.checked)}
              />
            </div>

            <div className={classes.Form_group}>
              <label htmlFor="Sale_rate">Discount Percentage</label>
              <input
                disabled={!sale}
                type="number"
                name="Sale_rate"
                placeholder="Enter Discount Percentage"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Email</p>
              </div>
            </div>

            <div className={`${classes.Form_group} ${css.Dropdown_cont}`}>
              <label htmlFor="product_brand">Product Brand</label>
              <select
                name="product_brand"
                id="product_brand"
                value={brand._id}
                onChange={(e) => setBrand(e.target.value)}
              >
                {brands.map((elm, id) => (
                  <option key={id} value={elm._id}>
                    {elm.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.Form_group}>
              <label htmlFor="product_image">Select Product Images</label>
              <input
                type="file"
                id="product_image"
                name="image"
                onChange={uploadFileHandler}
                multiple
              />

              {uploading && <Loader />}
              {/* <div className={css.Product_img_cont}>
                {image.map((img, i) => (
                  <img
                    className={css.Product_img}
                    height="100"
                    src={img}
                    key={i}
                    alt="product-img"
                  ></img>
                ))}
              </div> */}
            </div>

            <div className={classes.Form_group}>
              <label htmlFor="product_description">Product Description</label>
              <br />
              <textarea
                name="product_description"
                id="product_description"
                cols="43"
                rows="10"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <Button color="primary" type="submit" style={{ width: "100%" }}>
              Update
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;
