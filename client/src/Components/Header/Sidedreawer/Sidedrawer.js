import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userActions";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Dropdown from "../../UI/Dropdown/Dropdown";
import classes from "./Sidedrawer.module.css";
const Sidedrawer = ({ showSideBar, setShowSideBar }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);

  const logoutHandler = () => {
    dispatch(logout());
    setShowSideBar(false);
  };

  const cat = () => {
    const list = {};
    categories.forEach((elm, i) => {
      list[elm.name] = [];
    });

    brands.forEach((brand) => {
      list[brand.category.name].push(brand.name);
    });
    return categories.map(
      (cat, i) =>
        i < 5 && (
          <li
            key={cat._id}
            className={classes.Sidedrawer_li}
            style={{ padding: "0.4rem 0.1rem" }}
          >
            <Dropdown
              header={cat.name}
              style={{ color: "#fff", opacity: "0.7" }}
            >
              {list[cat.name].length !== 0
                ? list[cat.name].map((brand, i) => (
                    <li
                      key={i}
                      className={classes.Sidedrawer_li}
                      onClick={() => setShowSideBar(false)}
                    >
                      <Link
                        to={`/products/categories/${cat.name}/${brand}`}
                        className={classes.Sidedrawer_link}
                      >
                        {brand}
                      </Link>
                    </li>
                  ))
                : null}
            </Dropdown>
          </li>
        )
    );
  };
  return (
    <>
      <Backdrop show={showSideBar} showHandler={setShowSideBar} />
      <div
        className={`${classes.Sidedrawer} ${
          showSideBar ? classes.Open : classes.Close
        }`}
      >
        <nav>
          <ul className={classes.Sidedrawer_ul}>
            <li
              className={`${classes.Sidedrawer_label} ${classes.Sidedrawer_login}`}
            >
              {userInfo ? (
                `Welcome : ${userInfo.name}`
              ) : (
                <Link
                  className={classes.Login_link}
                  onClick={() => setShowSideBar(false)}
                  to="/login"
                >
                  Sign in
                </Link>
              )}
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/profile/myinfo"
              >
                My Account
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                onClick={() => setShowSideBar(false)}
                to="/profile/orders"
              >
                Orders
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                to="/profile/saved"
                onClick={() => setShowSideBar(false)}
              >
                Wishlist
              </Link>
            </li>
            <li className={classes.Sidedrawer_li}>
              <Link
                className={classes.Sidedrawer_link}
                to="/"
                onClick={() => setShowSideBar(false)}
              >
                Comparing list
              </Link>
            </li>
            {userInfo ? (
              <li className={classes.Sidedrawer_li}>
                <button
                  className={classes.Sidedrawer_logout_btn}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            ) : null}
            <li
              className={`${classes.Sidedrawer_li} ${classes.Sidedrawer_label}`}
            >
              <label>Categories</label>
            </li>

            {cat()}
            <li className={classes.Sidedrawer_li} style={{ border: "none" }}>
              <Link
                className={classes.Sidedrawer_link}
                to="products/categories"
                onClick={() => setShowSideBar(false)}
              >
                Shop All Categories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidedrawer;
