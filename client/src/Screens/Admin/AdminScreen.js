import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import BrandListScreen from "../BrandListScreen/BrandListScreen";
import CategoryListScreen from "../CategoryListScreen/CategoryListScreen";
import ProductListScreen from "../ProductListScreen/ProductListScreen";

import classes from "./AdminScreen.module.css";

const AdminScreen = () => {
  return (
    <div className={`container`}>
      <div className={classes.Product_list_btns}>
        <Button color={"primary"} href="/admin/productlist">
          Products
        </Button>
        <Button color={"primary"} href="/admin/categorylist">
          Categories
        </Button>
        <Button color={"primary"} href="/admin/brandlist">
          Brands
        </Button>
      </div>

      <div>
        <Switch>
          <Route
            path="/admin/productlist/page/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/categorylist"
            component={CategoryListScreen}
            admin
          />
          <Route path="/admin/brandlist" component={BrandListScreen} admin />
        </Switch>
      </div>
    </div>
  );
};

export default AdminScreen;
