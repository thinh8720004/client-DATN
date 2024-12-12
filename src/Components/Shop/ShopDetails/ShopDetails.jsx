import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoClose, IoFilterSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToCart } from "../../../Features/Cart/cartSlice";
import {
  fetchProducts,
  setSearchText,
} from "../../../Features/Product/productSlice"; // Import the fetchProducts action
import Filter from "../Filters/Filter";
import "./ShopDetails.css";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of products per page

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 2000000]);
  const [sortOption, setSortOption] = useState("default");

  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  const totalPages = useSelector((state) => state.products.totalPages);

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const categories = useSelector((state) => state.categories.items);
  const [quantity] = useState(1); // Mặc định số lượng là 1

  useEffect(() => {
    const categoryFromURL = searchParams.get("category"); // Get 'category' from query params
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL); // Update state with category from URL
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page,
        limit,
        title: searchText,
        category: selectedCategory,
        price: selectedPriceRange,
      })
    );
  }, [page, selectedCategory, selectedPriceRange, searchText, dispatch]);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const cartItems = useSelector((state) => state.cart.items);
  // popup them san pham
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to sort products based on the selected option
  // tìm kiếm
  const sortedProducts = () => {
    if (sortOption === "lowToHigh") {
      return [...products].sort((a, b) => a.prices.price - b.prices.price);
    }
    if (sortOption === "highToLow") {
      return [...products].sort((a, b) => b.prices.price - a.prices.price);
    }
    if (sortOption === "a-z") {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOption === "z-a") {
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    }
    return products; // Default, no sorting
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  TRANG CHỦ
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">CỬA HÀNG</Link>
                &nbsp;/&nbsp;
                <Link to="/shop">
                {categories.map((category, index) => (
                  <p
                    key={index}
                    className={
                      selectedCategory === category._id ? "selected" : ""
                    }
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {selectedCategory === category._id ? category.name : ""}
                  </p>
                ))}</Link>
                {console.log(selectedCategory)}
                {console.log("categories", categories)}
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Lọc</p>
              </div>
              {/* <div className="shopDetailsSort">
                <select name="sort" id="sort" onChange={handleSortChange}>
                  <option value="default">Sắp xếp mặc định</option>
                  <option value="a-z">Theo bảng chữ cái, A-Z</option>
                  <option value="z-a">Theo bảng chữ cái, Z-A</option>
                  <option value="lowToHigh">Giá từ thấp đến cao</option>
                  <option value="highToLow">Giá từ cao đến thấp</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Lọc</p>
                </div>
              </div> */}
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {productStatus === "loading" && <p>Đang tải ...</p>}
                {productStatus === "failed" && <p>{productError}</p>}
                {productStatus === "succeeded" &&
                  Array.isArray(products) &&
                  products.length > 0 &&
                  sortedProducts().map((product, index) => (
                    <div className="sdProductContainer" key={index}>
                      <div className="sdProductImages">
                        <Link
                          to={`/Product/${product._id}`}
                          onClick={scrollToTop}
                        >
                          <img
                            src={product.image[0]}
                            alt=""
                            className="sdProduct_front"
                          />
                          <img
                            src={product.image[1]}
                            alt=""
                            className="sdProduct_back"
                          />
                        </Link>
                      </div>
                      <div
                        className="sdProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="sdProductInfo">
                        <div className="sdProductCategoryWishlist">
                          <p>{product.category.name}</p>
                          <FiHeart
                            onClick={() =>
                              handleWishlistClick(product.productID)
                            }
                            style={{
                              color: wishList[product.productID]
                                ? "red"
                                : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="sdProductNameInfo">
                          <Link to={`/Product/${product._id}`} onClick={scrollToTop}>
                            <h5>{product.title}</h5>
                          </Link>
                          <p>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              product.prices.price
                                ? product.prices.price
                                : product.prices.originalPrice
                            )}
                          </p>
                          {/* review */}
                          <div className="sdProductRatingReviews flex items-center">
                            <div className="sdProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            <span>{product.reviews.length} đánh giá</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="shopDetailsPagination">
                {page > 1 && (
                  <button onClick={() => handlePageChange(page - 1)}>
                    <FaAngleLeft /> Trước
                  </button>
                )}
                {page < totalPages && (
                  <button onClick={() => handlePageChange(page + 1)}>
                    Tiếp theo <FaAngleRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
