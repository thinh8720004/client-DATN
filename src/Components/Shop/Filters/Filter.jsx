import React, { useEffect, useState } from "react";
import "./Filter.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../Features/Category/categorySlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ onCategoryChange, onPriceRangeChange, onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy trạng thái Redux cho danh mục
  const categories = useSelector((state) => state.categories.items);
  const categoryStatus = useSelector((state) => state.categories.status);
  const categoryError = useSelector((state) => state.categories.error);

  // State quản lý danh mục và giá
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000000]);

  // State và search params cho tìm kiếm
  const [searchParams] = useSearchParams();
  const initialSearchText = searchParams.get("search") || ""; // Lấy giá trị từ URL ban đầu
  const [searchText, setSearchText] = useState(initialSearchText); // Đổi tên biến từ searchTerm thành searchText

  // Fetch danh mục khi trạng thái là "idle"
  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId); // Gọi callback truyền từ cha
    }
  };

  // Xử lý thay đổi giá
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    if (onPriceRangeChange) {
      onPriceRangeChange(newValue); // Gọi callback truyền từ cha
    }
  };

  // Xử lý thay đổi trong ô tìm kiếm với debounce
  const handleSearchChange = (e) => {
    // Kiểm tra sự kiện và đảm bảo e.target tồn tại
    if (e && e.target) {
      setSearchText(e.target.value); // Cập nhật searchText nếu e.target.value tồn tại
    } else {
      console.error("Error: Event target is undefined");
    }
  };

  // Xử lý submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Ngăn reload trang
    if (searchText.trim()) {
      navigate(`/shop?search=${searchText}`); // Điều hướng đến trang /shop
    }
  };

  // Xử lý khi người dùng nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      navigate(`/shop?search=${searchText}`);
    }
  };

  // Tự động cập nhật URL khi searchText thay đổi
  useEffect(() => {
    if (searchText.trim()) {
      navigate(`/shop?search=${searchText}`);
    }
  }, [searchText, navigate]);

  return (
    <div className="filterSection">
      <div className="filterCategories">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Danh mục sản phẩm</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categoryStatus === "loading" && <p>Loading...</p>}
            {categoryStatus === "failed" && <p>{categoryError}</p>}
            {categoryStatus === "succeeded" &&
              categories.map((category, index) => (
                <p
                  key={index}
                  className={
                    selectedCategory === category.name ? "selected" : ""
                  }
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {category.name}
                </p>
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="filterPrice">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Giá</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `{value}`}
              min={0}
              max={2000000}
              sx={{
                color: "black",
                "& .MuiSlider-thumb": {
                  backgroundColor: "white",
                  border: "2px solid black",
                  width: 18,
                  height: 18,
                },
              }}
            />
            <div className="filterSliderPrice">
              <div className="priceRange">
                <p>
                  Giá thấp nhất: <span>{priceRange[0]}đ</span>
                </p>
                <p>
                  Giá cao nhất: <span>{priceRange[1]}đ</span>
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="filterSearch">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Tìm kiếm</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="searchBar">
              <BiSearch className="searchIcon" size={20} color={"#767676"} />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm ..."
                  value={searchText} // Sử dụng searchText
                  onChange={handleSearchChange} // Cập nhật searchText khi thay đổi
                  onKeyDown={handleKeyDown} // Gọi handleKeyDown khi nhấn phím Enter
                />
              </form>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
