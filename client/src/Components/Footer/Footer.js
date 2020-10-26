import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className="container">
        <div className={classes.Footer_container}>
          {/* <div className={classes.Footer_section}>
            <h2>Popular Search</h2>
            <ul className={classes.Footer_section_ul}>
              <li>
                <a href="/aa">Iphone 11Pro</a>
              </li>
              <li>
                <a href="/aa">Samsung Tv</a>
              </li>
              <li>
                <a href="/aa">Microsoft surface</a>
              </li>
              <li>
                <a href="/aa">Iphone Xs</a>
              </li>
              <li>
                <a href="/aa">Samsung Note 10</a>
              </li>
            </ul>
          </div> */}
          <div className={classes.Footer_section}>
            <h2>My Account</h2>
            <ul className={classes.Footer_section_ul}>
              <li>
                <a href="/aa">My Account</a>
              </li>
              <li>
                <a href="/aa">Order History</a>
              </li>
              <li>
                <a className="wish-list-btn" href="./wishList.html">
                  wishing List
                </a>
              </li>
              <li>
                <a href="/aa">Compare List</a>
              </li>
            </ul>
          </div>
          <div className={classes.Footer_section}>
            <h2>information</h2>
            <ul className={classes.Footer_section_ul}>
              <li>
                <a href="/aa">About us</a>
              </li>
              <li>
                <a href="/aa">delivery information</a>
              </li>
              <li>
                <a href="/aa">returns</a>
              </li>
              <li>
                <a href="/aa">term & condition</a>
              </li>
            </ul>
          </div>
          <div
            className={`${classes.Footer_section} ${classes.Help_center_cont}`}
          >
            <div className={classes.Help_center}>
              <div className={classes.Help_center_icon}>
                <i className="far fa-question-circle"></i>
              </div>
              <div>
                <h3>help center</h3>
                <p>Have a question or an issue?</p>
                <p>We are here to help</p>
              </div>
            </div>
            <div className={classes.Follow_us}>
              <h2>follow us</h2>
              <ul>
                <li>
                  <a href="https://www.facebook.com">
                    <i
                      className="fab fa-facebook-square"
                      style={{ color: "#0063d1" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <i
                      className="fab fa-instagram-square"
                      style={{ color: "#d72f7d" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com">
                    <i
                      className="fab fa-twitter-square"
                      style={{ color: " #0063d1" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com">
                    <i
                      className="fab fa-youtube-square"
                      style={{ color: "red" }}
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
