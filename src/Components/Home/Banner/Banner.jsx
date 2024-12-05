import React from "react";
import "./Banner.css";

import { Link } from "react-router-dom";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="banner">
        <div className="bannerLeft">
          <h6 className="bannerh6">Khuyến mại</h6>
          <h3 className="bannerh3">Thiết bị áp suất tốt nhất</h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "white" }}>
              Mua ngay
            </Link>
          </h5>
        </div>
        <div className="bannerRight">
          <h6 className="bannerh6" style={{ color: "black" }}>
            Bắt đầu từ 99k
          </h6>
          <h3 className="bannerh3" style={{ color: "black" }}>
            Sản phẩm chăm sóc da
          </h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "black" }}>
              Mua ngay
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Banner;
