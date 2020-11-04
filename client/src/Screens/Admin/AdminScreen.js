import React from "react";

import { Route, Switch } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import BrandListScreen from "../BrandListScreen/BrandListScreen";
import CategoryListScreen from "../CategoryListScreen/CategoryListScreen";
import ProductListScreen from "../ProductListScreen/ProductListScreen";

import classes from "./AdminScreen.module.css";

const AdminScreen = () => {
  return (
    <div className={`container`}>
      <div className={classes.Product_list_btns}>
        <Button color={"primary"} href="/admin/productlist/page/1">
          Products
        </Button>
        <Button color={"primary"} href="/admin/categorylist/page/1">
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
          {/* <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          /> */}
          <Route
            path="/admin/categorylist/page/:pageNumber"
            component={CategoryListScreen}
            exact
          />
          <Route path="/admin/brandlist" component={BrandListScreen} exact />
        </Switch>
      </div>
    </div>
  );
};

export default AdminScreen;
