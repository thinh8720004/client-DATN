import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProducts } from "../../../Features/Product/productSlice";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../Features/Cart/cartSlice";

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState({});
  const [quantity] = useState(1); // Mặc định số lượng là 1
  const products = useSelector((state) => state.products.items);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getRandomProducts = (products, count) => {
    if (!products || products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleAddToCart = async (product) => {
    // Kiểm tra người dùng đã đăng nhập chưa
    if (!localStorage.getItem("token")) {
      toast.error(`Vui lòng đăng nhập để thêm vào giỏ hàng!`, {
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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRelatedProducts(productId));
    };

    if (productId) {
      fetchData();
    }
  }, [dispatch, productId]);

  if (!products || products.length === 0) {
    return (
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            Sản phẩm <span>liên quan</span>
          </h2>
          <p>Không có sản phẩm liên quan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relatedProductSection">
      <div className="relatedProducts">
        <h2>
          Sản phẩm <span>liên quan</span>
        </h2>
      </div>
      <div className="relatedProductSlider">
        <div className="swiper-button image-swiper-button-next">
          <IoIosArrowForward />
        </div>
        <div className="swiper-button image-swiper-button-prev">
          <IoIosArrowBack />
        </div>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 30,
            },
          }}
        >
          {getRandomProducts(products, 4).map((product, index) => (
            <SwiperSlide key={product._id}>
              <div className="rpContainer">
                <div className="rpImages" onClick={scrollToTop}>
                  <Link to={`/Product/${product._id}`} onClick={scrollToTop}>
                    <img
                      src={product.image[0]}
                      alt={product.title}
                      className="trendyProduct_front"
                    />
                    <img
                      src={product.image[1]}
                      alt={product.title}
                      className="trendyProduct_back"
                    />
                  </Link>
                  <h4 onClick={() => handleAddToCart(product)}>Thêm giỏ hàng</h4>
                </div>
                <div className="relatedProductInfo">
                  <div className="rpCategoryWishlist">
                    <p>{product.category?.name || "Không có danh mục"}</p>
                  </div>
                  <div className="productNameInfo">
                    <h5 onClick={scrollToTop}>{product.title}</h5>
                    <p>
                      {formatCurrency(
                        product.prices?.price || product.prices?.originalPrice
                      )}
                    </p>
                    <div className="productRatingReviews">
                      <div className="productRatingStar">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} color="#FEC78A" size={10} />
                        ))}
                      </div>
                      <span>{product.reviews.length} đánh giá</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
