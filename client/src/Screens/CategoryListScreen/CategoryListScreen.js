import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
// import Paginate from "../../Components/Paginate";
import Modal from "../../Components/UI/Modal/Modal";
import Button from "../../Components/UI/Button/Button";

import classes from "../ProductListScreen/ProductListScreen.module.css";
import {
  createCategories,
  deleteCategory,
  editCategory,
  listCategories,
  updateCategory,
} from "../../actions/categoryActions";
import { CATEGORY_LIST_RESET } from "../../constants/categoryConstants";
import Pagination from "../../Components/UI/Pagination/Pagination";

const CategoryListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryDetail, setCategoryDetail] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoryList);
  const { categories, page, pages } = categoriesList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = categoryUpdate;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = categoryDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   if (category && category.name) {
  //     setCategoryDetail(category.name);
  //   }
  // }, [category]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (updateSuccess || deleteSuccess || successCreate) {
      dispatch({ type: CATEGORY_LIST_RESET });
      dispatch({ type: "CATEGORY_UPDATE_RESET" });
      dispatch({ type: "CATEGORY_DELETE_RESET" });
      dispatch({ type: "CATEGORY_ADD_RESET" });
      setShowDeleteModal(false);
      setShowEditModal(false);
      setShowModal(false);
    }
    dispatch(listCategories(pageNumber));
    if (category.name) {
      setCategoryDetail(category.name);
      setCategoryId(category._id);
    }
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
    category,
    updateSuccess,
    deleteSuccess,
    successCreate,
  ]);

  const addCategoryHandler = () => {
    dispatch(createCategories(newCategory));
  };

  const editCategoryHandler = (id) => {
    setShowEditModal(true);
    dispatch(editCategory(id));
  };
  const updateCategoryHandler = () => {
    const updatedCategory = {
      _id: categoryId,
      name: categoryDetail,
    };
    dispatch(updateCategory(updatedCategory));
  };

  const deleteCategoryHandler = () => {
    dispatch(deleteCategory(categoryDetail._id));
  };

  return (
    <>
      <Modal
        showModal={showModal}
        showHandler={setShowModal}
        title={"Add new category"}
        confirmHandler={addCategoryHandler}
      >
        <div className={classes.Add_cat_Modal}>
          <form
            id="category_form"
            className={classes.Add_cat_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={classes.Form_group}>
              <label htmlFor="add-category">Add Category</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className={classes.Invalid_feedback}>
                <p>Please entaer a valid Category Name</p>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        showModal={showEditModal}
        showHandler={setShowEditModal}
        title={"Edit Category name"}
        confirmHandler={updateCategoryHandler}
        loading={updateLoading}
      >
        {updateError ? (
          updateError
        ) : (
          <div className={classes.Add_cat_Modal}>
            <form
              id="category_form"
              className={classes.Add_cat_form}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={classes.Form_group}>
                <label htmlFor="add-category">Edit Name</label>
                <input
                  type="text"
                  value={categoryDetail}
                  onChange={(e) => setCategoryDetail(e.target.value)}
                />
                <div className={classes.Invalid_feedback}>
                  <p>Please entaer a valid Category Name</p>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
      <Modal
        showModal={showDeleteModal}
        showHandler={setShowDeleteModal}
        title={"Confirm Delete"}
        confirmHandler={deleteCategoryHandler}
        loading={deleteLoading}
      >
        <div>
          {deleteError ? (
            deleteError
          ) : (
            <h3>Are you sure to Delete this Category ?</h3>
          )}
        </div>
      </Modal>

      <div className={`container ${classes.Product_list_container}`}>
        <div className={classes.Productlist_title}>
          <h1>Categories</h1>
          <div className={classes.Product_list_btns}>
            <Button color={"primary"} onClick={() => setShowModal(!showModal)}>
              Add Category
            </Button>
          </div>
        </div>

        {/* {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className={`${classes.Table_cont}`}>
            <table className={`table ${classes.Cat_table}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CATEGORY NAME</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((elm) => (
                  <tr key={elm._id}>
                    <td>{elm._id}</td>
                    <td>{elm.name}</td>

                    <td>
                      <button
                        onClick={() => editCategoryHandler(elm._id)}
                        className={`btn ${classes.Edit_btn}`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className={`btn ${classes.Remove_btn}`}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setCategoryDetail(elm);
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
        )}
        <Pagination pages={pages} page={page} route={"categorylist"} />
      </div>
    </>
  );
};

export default CategoryListScreen;
