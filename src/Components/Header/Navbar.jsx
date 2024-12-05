import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../Assets/24pf-logo-removebg-preview-header.png";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { RiMenu2Line, RiShoppingBagLine } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownMenuMobile from "../DropdownMenu/DropdownMenuMobile";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenuInfo from "../DropdownMenu/DropdownMenuInfo";
import { IoLogInOutline } from "react-icons/io5";
import { getCartItems } from "../../Features/Cart/cartSlice";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Quản lý trạng thái đăng nhập
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const navigate = useNavigate();

  useEffect(() => {
    // Cập nhật trạng thái từ localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Lắng nghe sự kiện thay đổi trong localStorage (đồng bộ giữa các tab)
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/shop?search=${searchText}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" style={{ height: "50px" }} />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <DropdownMenu />
              </li>
              <li>
                <Link to="/blog" onClick={scrollToTop}>
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  GIỚI THIỆU
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  LIÊN HỆ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <form
            className="w-full mx-auto bg-white p-4 rounded-lg relative"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              id="default-search"
              className="block w-full p-2.5 pr-10 text-md text-gray-900 border-b focus:border-b-gray-500 focus:outline-none"
              placeholder="Nhập tên sản phẩm ..."
              value={searchText}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="absolute top-1/2 right-5 transform -translate-y-1/2"
              aria-label="Search"
            >
              <BiSearch size={20} color="#767676" />
            </button>
          </form>

          {/* Hiển thị nút Đăng nhập hoặc Đăng xuất */}
          {isLoggedIn ? (
            <DropdownMenuInfo />
          ) : (
            <Link to="/loginSignUp" onClick={scrollToTop}>
              <IoLogInOutline size={30} />
            </Link>
          )}

          {/* Giỏ hàng */}
          <Link to="/cart" onClick={scrollToTop}>
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img className="logo" src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <input type="text" placeholder="Search products" />
              <FiSearch size={22} onClick={toggleMobileMenu} />
            </div>
            <ul>
              <li>
                <Link to="/" onClick={toggleMobileMenu}>
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <DropdownMenuMobile />
              </li>
              <li>
                <Link to="/blog" onClick={toggleMobileMenu}>
                  BLOG
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
