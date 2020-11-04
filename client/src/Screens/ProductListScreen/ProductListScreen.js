import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import classes from "./ProductListScreen.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import Pagination from "../../Components/UI/Pagination/Pagination";
// import Modal from "../../Components/UI/Modal/Modal";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  // const [showModal, setShowModal] = useState(false);
  // const [category, setCategory] = useState("");
  // const [brand, setBrand] = useState("");
  // const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className={`container ${classes.Product_list_container}`}>
        <div className={classes.Productlist_title}>
          <h1>Products</h1>
          <div className={classes.Product_list_btns}>
            <Button color={"primary"} onClick={createProductHandler}>
              Add Product
            </Button>
          </div>
        </div>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className={classes.Product_table_cont}>
            <table className={`table ${classes.Productlist_table}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category.name}</td>
                    <td>{product.brand && product.brand.name}</td>
                    <td>
                      <Link
                        to={`/admin/product/${product._id}/edit?redirect=/page/${page}`}
                      >
                        <button className={`btn ${classes.Edit_btn}`}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className={`btn ${classes.Remove_btn}`}
                        onClick={() => deleteHandler(product._id)}
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
        <Pagination pages={pages} page={page} route="productlist" />
      </div>
    </>
  );
};

export default ProductListScreen;
