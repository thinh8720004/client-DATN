import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { PiShareNetworkLight } from "react-icons/pi";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import "./Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState(0);

  const prevImg = () => {
    setCurrentImg(
      currentImg === 0 ? product?.image.length - 1 : currentImg - 1
    );
  };

  const nextImg = () => {
    setCurrentImg(
      currentImg === product?.image.length - 1 ? 0 : currentImg + 1
    );
  };

  // Product Quantity

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Product WishList

  const [clicked, setClicked] = useState(false);

  const handleWishClick = () => {
    setClicked(!clicked);
  };

  const handleAddToCart = async () => {
    // check user login
    if (!localStorage.getItem("token")) {
      toast.error(`Vui lòng đăng nhập để mua hàng!`, {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
      return;
    }
    // check use  select quantity
    if (quantity < 1) {
      toast.error(`Please select quantity!`, {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
      return;
    }

    const productDetails = {
      productId: product._id,
      quantity: quantity,
      price: product.prices.price
        ? product.prices.price
        : product.prices.originalPrice,
    };
    try {
      await dispatch(addToCart(productDetails)).unwrap();
      toast.success(`Đã thêm vào giỏ hàng!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
    }
  };

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {product?.image?.map((img, index) => (
                <img
                  key={img._id || index}
                  src={img}
                  alt=""
                  onClick={() => setCurrentImg(index)}
                />
              ))}
            </div>
            <div className="productFullImg">
              <img
                src={product?.image ? product?.image[currentImg] : ""}
                alt=""
              />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Trang chủ</Link>&nbsp;/&nbsp;
                <Link to="/shop">{product?.category?.name}</Link>
              </div>

            </div>
            <div className="productName">
              <h1>{product?.title}</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>{product?.reviews?.length || 0} đánh giá</p>
            </div>
            <div className="productPrice">
              <h3>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  product?.prices?.price || product?.prices?.originalPrice
                )}
              </h3>
            </div>
            <div className="productDescription">
              <p>{product?.description}</p>
            </div>

            <div className="productCartQuantity">
              <div className="productQuantity">
                <button onClick={decrement}>-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <button onClick={increment}>+</button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Thêm giỏ hàng</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  {/* <FiHeart color={clicked ? "red" : ""} size={17} /> */}
                  <p>Thêm vào danh sách yêu thích</p>
                </button>
              </div>
              <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p>Chia sẻ</p>
              </div>
            </div>
            <div className="productTags">
              <p>
                <span>Quy cách: </span>{product?.sku || "Không xác định"}
              </p>
              <p>
                <span>Thể loại: </span>
                {product?.category?.name || "Không xác định"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
