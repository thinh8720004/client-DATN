import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="collection">
        <div className="collectionLeft">
          <p className="col-p">Bắt đầu với 99k</p>
          <h3 className="col-h3">
            <span>Bổ sung </span> Protein
          </h3>
          <div className="col-link">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Mua ngay</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Bắt đầu với 99k</p>
            <h3 className="col-h3">
              <span>Thuốc tăng cường </span> miễn dịch
            </h3>
            <div className="col-link">
              <Link to="/shop" onClick={scrollToTop}>
                <h5>Mua ngay</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Miễn phí vận chuyển</p>
              <h3 className="col-h3">
                <span>Vitamin </span> B12 & B
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Mua ngay</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
                <span>Tiết kiệm </span> 9%
              </h3>
              <p className="col-p">Để tăng cân</p>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Mua ngay</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
