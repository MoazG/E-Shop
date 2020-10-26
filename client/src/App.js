import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import ProductScreen from "./Screens/ProductScreen/ProductScreen";
import CartScreen from "./Screens/CartScreen/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen/PaymentScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
