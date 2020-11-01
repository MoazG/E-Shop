import React from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
