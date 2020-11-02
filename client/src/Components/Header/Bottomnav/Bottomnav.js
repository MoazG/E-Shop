import classes from "./Bottomnav.module.css";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../../actions/categoryActions";

const Bottomnav = () => {
  let categoriesRef = useRef(null);
  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);

  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(listCategories());
    }
    // eslint-disable-next-line
  }, []);

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
          <li key={cat._id} className={classes.Categories_list_container_li}>
            <Link to={`/products/categories/${cat.name}`}>
              {cat.name}
              <i className="fa fa-angle-right"></i>
            </Link>
            {list[cat.name].length !== 0 ? (
              <ul className={classes.Categories_items_ul}>
                {list[cat.name].map((brand, i) => (
                  <li key={i} className={classes.Categories_items_li}>
                    <Link to={`/products/categories/${cat.name}/${brand}`}>
                      {brand}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        )
    );
  };

  return (
    <div className={classes.Bottom_nav}>
      <div className="container">
        <div
          className={classes.Bottom_nav_container}
          onClick={() =>
            categoriesRef.current.classList.toggle(classes.Show_cat_list)
          }
        >
          <div className={classes.Categories}>
            <span>Categories</span>
            <i className="fa fa-bars"></i>
            <div
              ref={categoriesRef}
              className={classes.Categories_list_container}
            >
              <ul>
                {cat()}
                <li>
                  <Link to="/products/categories">Shop All Categories</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.Bottom_list_container}>
            <div className={classes.Main_menu}>
              <ul className={classes.Main_menu_ul}>
                <li className={classes.Main_menu_item}>
                  <a href="/www.youtube.com">
                    Home <i className="fa fa-angle-down"></i>
                  </a>
                  <div className={classes.Extra_menu}>
                    <ul className={classes.Sub_menu}>
                      <li className={classes.Sub_menu_item}>
                        <a
                          href="/www"
                          className={classes.Categories_list_container_link}
                        >
                          Demo1
                        </a>
                      </li>
                      <li className={classes.Sub_menu_item}>
                        <a href="/www">Demo2</a>
                      </li>
                      <li className={classes.Sub_menu_item}>
                        <a href="/www">Demo3</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={classes.Main_menu_item}>
                  <a href="/www">
                    Shop <i className="fa fa-angle-down"></i>
                  </a>
                </li>
                <li className={classes.Main_menu_item}>
                  <a href="/www">
                    Blog <i className="fa fa-angle-down"></i>
                  </a>
                </li>
                <li className={classes.Main_menu_item}>
                  <a href="/www">About Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
