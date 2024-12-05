import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { fetchProducts } from "../../../Features/Product/productSlice";
import "./Trendy.css";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.cart.items);
  const [randomProducts, setRandomProducts] = useState([]);
  useEffect(() => {
    if (products && products.length > 0) {
      setRandomProducts(getRandomProducts(products));
    }
  }, [products]);
  
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 100,
        title: "",
        category: "",
        price: null,
      })
    );
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const handleAddToCart = (product) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
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
      quantity: 1, // Mặc định là 1 sản phẩm
      price: product.prices.price
        ? product.prices.price
        : product.prices.originalPrice,
    };
  
    dispatch(addToCart(productDetails))
      .unwrap()
      .then(() => {
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
      })
      .catch((error) => {
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
      });
  };
  

  // Lấy 12 sản phẩm ngẫu nhiên từ danh sách
  const getRandomProducts = (products) => {
    if (!products || products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  };

  // Lấy 12 sản phẩm mới nhất dựa vào createdAt
  const getNewProducts = (products) => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 12);
  };

  
  return (
    <div className="trendyProducts">
      <h2>
        Flash Sale <span>Cuối Tuần</span>
      </h2>
      <div className="trendyTabs">
        <div className="tabs">
          <p
            onClick={() => handleTabClick("tab1")}
            className={activeTab === "tab1" ? "active" : ""}
          >
            Tất cả
          </p>
          <p
            onClick={() => handleTabClick("tab2")}
            className={activeTab === "tab2" ? "active" : ""}
          >
            Sản phẩm mới
          </p>
        </div>

        <div className="trendyTabContent">
          {/* Tab 1: Hiển thị 12 sản phẩm ngẫu nhiên */}
          {activeTab === "tab1" && (
  <TabContent
    products={randomProducts}
    productStatus={productStatus}
    formatCurrency={formatCurrency}
    wishList={wishList}
    handleWishlistClick={handleWishlistClick}
    scrollToTop={scrollToTop}
    handleAddToCart={handleAddToCart}
  />
)}


          {/* Tab 2: Hiển thị 12 sản phẩm mới */}
          {activeTab === "tab2" && (
            <TabContent
              products={getNewProducts(products)}
              productStatus={productStatus}
              formatCurrency={formatCurrency}
              wishList={wishList}
              handleWishlistClick={handleWishlistClick}
              scrollToTop={scrollToTop}
              handleAddToCart={handleAddToCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TabContent = ({
  products,
  productStatus,
  formatCurrency,
  wishList,
  handleWishlistClick,
  scrollToTop,
  handleAddToCart,
}) => {
  if (productStatus !== "succeeded") {
    return <p>Loading...</p>;
  }

  if (!products || !products.length) {
    return <p>No products available.</p>;
  }

  return (
    <div className="trendyMainContainer">
      {products.map((product, index) => (
        <div className="trendyProductContainer" key={index}>
          <div className="trendyProductImages">
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
          </div>

          <div className="trendyProductInfo">
            <div className="trendyProductCategoryWishlist">
              <p>{product?.category?.name}</p>
            </div>
            <div className="trendyProductNameInfo">
              <Link to={`/Product/${product._id}`} onClick={scrollToTop}>
                <h5>{product.title}</h5>
              </Link>
              <p>
                {formatCurrency(
                  product.prices.price
                    ? product.prices.price
                    : product.prices.originalPrice
                )}
              </p>

              <div className="trendyProductRatingReviews">
                <div className="trendyProductRatingStar">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#FEC78A" size={10} />
                  ))}
                </div>
                <span>{product.reviews.length} đánh giá</span>
              </div>
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
  className="addToCartButton"
  onClick={() => handleAddToCart(product)}
>
  Thêm vào giỏ hàng
</button>

        </div>
      ))}
    </div>

  );
};

export default Trendy;
