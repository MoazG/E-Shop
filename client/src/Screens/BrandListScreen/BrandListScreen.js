import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

import Loader from "../../Components/Loader";
// import Paginate from "../../Components/Paginate";
import Modal from "../../Components/UI/Modal/Modal";
import Button from "../../Components/UI/Button/Button";

import classes from "../ProductListScreen/ProductListScreen.module.css";
import { listCategories } from "../../actions/categoryActions";
import {
  createBrand,
  listBrands,
  brandDetailsAction,
  updateBrand,
  deleteBrand,
} from "../../actions/brandActions";
import Alert from "../../Components/UI/Alert/Alert";

const BrandListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showEditaBrandModal, setShowEdiatBrandModal] = useState(false);
  const [ShowDeleteBrandModal, setShowDeleteBrandModal] = useState(false);

  // const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoryList);
  const { categories, loading: categoriesLoading } = categoriesList;

  const brandsList = useSelector((state) => state.brandList);
  const { brands, loading, error } = brandsList;

  const create = useSelector((state) => state.brandCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = create;

  const details = useSelector((state) => state.brandDetails);
  const {
    brand: brandInfo,
    // eslint-disable-next-line
    loading: brandLoading,
    error: brandError,
  } = details;

  const update = useSelector((state) => state.brandUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = update;

  const brandDelete = useSelector((state) => state.brandDelete);
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = brandDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listBrands());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (brandInfo.name) {
      setBrandDetails(brandInfo.name);
      setCategoryId(brandInfo.category);
      setBrandId(brandInfo._id);
      setShowEdiatBrandModal(true);
    }
  }, [dispatch, history, userInfo, pageNumber, brandInfo]);

  if (createSuccess || updateSuccess || deleteSuccess) {
    setShowBrandModal(false);
    setShowEdiatBrandModal(false);
    setShowDeleteBrandModal(false);
    dispatch({ type: "BRAND_UPDATE_RESET" });
    dispatch({ type: "BRAND_DETAIL_RESET" });
    dispatch({ type: "BRAND_DELETE_RESET" });
    dispatch({ type: "BRAND_ADD_RESET" });
    dispatch(listBrands());
  }
  const addBrandHandler = () => {
    if (!newBrand || !categoryId) {
      console.log("Please enter valid data");
      return;
    }
    dispatch(
      createBrand({
        name: newBrand,
        categoryId,
      })
    );
  };

  const addBrandModal = () => {
    return (
      <Modal
        loading={createLoading}
        showModal={showBrandModal}
        showHandler={setShowBrandModal}
        title={"Add new Brand"}
        confirmHandler={addBrandHandler}
        zIndex="501"
      >
        <div className={classes.Add_cat_Modal}>
          <form
            id="category_form"
            className={classes.Add_cat_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={`${classes.Form_group} ${classes.Dropdown_cont}`}>
              <label htmlFor="category_select">Select Category</label>
              <select
                name="category_select"
                id="category_select"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select</option>
                {categories.map((elm) => (
                  <option key={elm._id} value={elm._id}>
                    {elm.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.Form_group}>
              <label htmlFor="add-category">Brand name</label>
              <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  };

  const deleteBrandHandler = () => {
    dispatch(deleteBrand(brandId));
  };
  const deletBrandModal = () => {
    return (
      <Modal
        loading={deleteLoading}
        showModal={ShowDeleteBrandModal}
        showHandler={setShowDeleteBrandModal}
        title={"Confirm Delete"}
        confirmHandler={deleteBrandHandler}
      >
        <div>
          <h3>Are you sure to Delete this Category ?</h3>
        </div>
      </Modal>
    );
  };

  const getBrandDetails = (brandId) => {
    dispatch(brandDetailsAction(brandId));
  };

  const editBrandHandler = () => {
    dispatch(
      updateBrand({
        _id: brandId,
        name: brandDetails,
        category: categoryId,
      })
    );
  };

  const editBrandModal = () => {
    return (
      <Modal
        showModal={showEditaBrandModal}
        showHandler={setShowEdiatBrandModal}
        title={"Edit Brand"}
        confirmHandler={editBrandHandler}
        loading={updateLoading}
      >
        <div className={classes.Add_cat_Modal}>
          <form
            id="category_form"
            className={classes.Add_cat_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={`${classes.Form_group} ${classes.Dropdown_cont}`}>
              <label htmlFor="category_select">Select Category</label>
              <select
                name="category_select"
                id="category_select"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
              >
                {categories.map((elm) => (
                  <option key={elm._id} value={elm._id}>
                    {elm.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.Form_group}>
              <label htmlFor="add-category">Brand name</label>
              <input
                type="text"
                value={brandDetails}
                onChange={(e) => setBrandDetails(e.target.value)}
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  };

  const renderError = (error) => {
    return <Alert severity="error">{error}</Alert>;
  };

  return categoriesLoading || loading ? (
    <Loader />
  ) : error ? (
    renderError
  ) : (
    <>
      {createError && renderError(createError)}
      {addBrandModal()}
      {createBrand && renderError(createError)}
      {editBrandModal()}
      {brandError && renderError(brandError)}
      {updateError && renderError(updateError)}
      {deletBrandModal()}
      {deleteError && renderError(deleteError)}
      <div className={`container ${classes.Product_list_container}`}>
        <div className={classes.Productlist_title}>
          <h1>Brands</h1>
          <div className={classes.Product_list_btns}>
            <Button
              color={"primary"}
              onClick={() => {
                setShowBrandModal(true);
              }}
            >
              Add Brand
            </Button>
          </div>
        </div>

        <div className={`${classes.Table_cont}`}>
          <table className={`table ${classes.Brand_table}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>BRAND NAME</th>
                <th>CATEGORY</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((elm) => (
                <tr key={elm._id}>
                  <td>{elm._id}</td>
                  <td>{elm.name}</td>
                  <td>{elm.category.name}</td>
                  <td>
                    <button
                      className={`btn ${classes.Edit_btn}`}
                      onClick={() => getBrandDetails(elm._id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn ${classes.Remove_btn}`}
                      onClick={() => {
                        setShowDeleteBrandModal(true);
                        setBrandId(elm._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
      </div>
    </>
  );
};

export default BrandListScreen;
