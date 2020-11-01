import classes from "./Bottomnav.module.css";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Bottomnav = () => {
  let categoriesRef = useRef(null);

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
                <li className={classes.Categories_list_container_li}>
                  <Link href="/aaaaaa">
                    Mobiles & Tablets
                    <i className="fa fa-angle-right"></i>
                  </Link>
                  <ul className={classes.Categories_items_ul}>
                    <li className={classes.Categories_items_li}>
                      {/* <a href="/www">Apple</a> */}
                      <p>apple</p>
                    </li>
                    <li>
                      <a href="/www">Samsung</a>
                    </li>
                    <li>
                      <a href="/www">Huawei</a>
                    </li>
                    <li>
                      <a href="/www">Honor</a>
                    </li>
                    <li>
                      <a href="/www">Oppo</a>
                    </li>
                    <li>
                      <a href="/www">Xaiomi</a>
                    </li>
                    <li>
                      <a href="/www">Infinix</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/www">
                    Computer & Networking
                    <i className="fa fa-angle-right"></i>
                  </a>
                  <ul className={classes.Categories_items_ul}>
                    <li>
                      <a href="/www">Laptops</a>
                    </li>
                    <li>
                      <a href="/www">Hard Disks</a>
                    </li>
                    <li>
                      <a href="/www">Keyboards</a>
                    </li>
                    <li>
                      <a href="/www">Printers</a>
                    </li>
                    <li>
                      <a href="/www">Scanners</a>
                    </li>
                    <li>
                      <a href="/www">Networking</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/www">
                    Electronics
                    <i className="fa fa-angle-right"></i>
                  </a>
                  <ul className={classes.Categories_items_ul}>
                    <li>
                      <a href="/www">Speakers</a>
                    </li>
                    <li>
                      <a href="/www">HeadSets</a>
                    </li>
                    <li>
                      <a href="/www">Watches & Clocks</a>
                    </li>
                    <li>
                      <a href="/www">Virtual Reality Headsets</a>
                    </li>
                    <li>
                      <a href="/www">Scanners</a>
                    </li>
                    <li>
                      <a href="/www">Networking</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/www">
                    Video Games
                    <i className="fa fa-angle-right"></i>
                  </a>
                  <ul className={classes.Categories_items_ul}>
                    <li>
                      <a href="/www">Sony PS4</a>
                    </li>
                    <li>
                      <a href="/www">Sony PS3</a>
                    </li>
                    <li>
                      <a href="/www">Xbox one</a>
                    </li>
                    <li>
                      <a href="/www">Xbox 360</a>
                    </li>
                    <li>
                      <a href="/www">PC Gaming</a>
                    </li>
                  </ul>
                </li>
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
