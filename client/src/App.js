import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import ProductScreen from "./Screens/ProductScreen/ProductScreen";
import CartScreen from "./Screens/CartScreen/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceorderScreen/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen/OrderScreen";
import OrderListScreen from "./Screens/OrderListScreen/OrderListScreen";
import UserListScreen from "./Screens/UserListScreen/UserListScreen";
// import ProductListScreen from "./Screens/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen/ProductEditScreen";
import UserEditScreen from "./Screens/UserEditScreen/UserEditScreen";
import CategoryListScreen from "./Screens/CategoryListScreen/CategoryListScreen";
import BrandListScreen from "./Screens/BrandListScreen/BrandListScreen";
import AdminScreen from "./Screens/Admin/AdminScreen";
import ProductFilterScreen from "./Screens/ProductFilterScreen/ProductFilterScreen";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route
            path="/products/categories"
            component={ProductFilterScreen}
            exact
          />
          <Route
            path="/products/search/:keyword"
            component={ProductFilterScreen}
            exact
          />
          <Route path="/admin/orderList" component={OrderListScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          {/* <Route
            path="/admin/productList"
            component={ProductListScreen}
            exact
          /> */}
          {/* <Route
            path="/admin/productlist/page/:pageNumber"
            component={ProductListScreen}
            exact
          /> */}
          {/* <Route
            path="/admin/categoryList"
            component={CategoryListScreen}
            exact
          /> */}

          <Route
            path="/admin/categoryList/page/:pageNumber"
            component={CategoryListScreen}
            exact
          />

          <Route
            path="/admin/brandList/page/:pageNumber"
            component={BrandListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
