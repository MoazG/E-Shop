import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className="container">
        <div className={classes.Footer_container}>
          <div className={classes.Footer_section}>
            <h2>My Account</h2>
            <ul className={classes.Footer_section_ul}>
              <li>
                <Link href="/profile/myinfo">My Account</Link>
              </li>
              <li>
                <Link to="/profile/order">Order History</Link>
              </li>
              <li>
                <Link href="profile/saved">Wish List</Link>
              </li>
              <li>
                <Link href="profile/saved">Wish List</Link>
              </li>
            </ul>
          </div>
          <div className={classes.Footer_section}>
            <h2>information</h2>
            <ul className={classes.Footer_section_ul}>
              <li>
                <Link to="/a">About us</Link>
              </li>
              <li>
                <Link href="/aa">delivery information</Link>
              </li>
              <li>
                <Link href="/aa">returns</Link>
              </li>
              <li>
                <Link href="/aa">term & condition</Link>
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
            <div className={`${classes.Follow_us}`}>
              <h2>follow us</h2>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-facebook-square"
                      style={{ color: "#0063d1" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-instagram-square"
                      style={{ color: "#d72f7d" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-twitter-square"
                      style={{ color: " #0063d1" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
