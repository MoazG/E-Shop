import React, { useState } from "react";
import Bottomnav from "./Bottomnav/Bottomnav";
import classes from "./Header.module.css";
import Midnav from "./Midnav/Midnav";
import Sidedrawer from "./Sidedreawer/Sidedrawer";
import Topnav from "./Topnav/Topnav";

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <header className={classes.Header}>
      <Sidedrawer showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Topnav />
      <Midnav showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Bottomnav />
    </header>
  );
};

export default Header;
