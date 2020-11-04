import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { Link, useHistory } from "react-router-dom";
const Carousel = () => {
  const history = useHistory();
  return (
    <ReactCarousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showStatus={false}
      showArrows={false}
      dynamicHeight={false}
    >
      <div
        className="Slider_cont"
        onClick={() => history.push("/product/5fa224866570b21c243a688d")}
      >
        <Link to="/">
          <img src="/img/slider1.jpg" alt="" />
        </Link>
      </div>
      {/* <Link to="/">
        <img src="/img/slider1.jpg" alt="" style={{ cursor: "pointer" }} />
      </Link> */}
      <div className="Slider_cont">
        <img src="/img/slider2.jpg" alt="" />
      </div>
      <div
        className="Slider_cont"
        onClick={() => history.push("/product/5fa224866570b21c243a688d")}
      >
        <img src="/img/slider3.jpg" alt="" />
      </div>
    </ReactCarousel>
  );
};

export default Carousel;
