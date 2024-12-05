import React from "react";
import "./Footer.css";
import logo from "../../Assets/24pf-logo-removebg-preview-header.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img src={logo} alt=""  style={{ height: "100px" }} />
            </div>

            <p>Thành phố Đà Nẵng</p>

            <div className="social_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>

          <div className="footer_content">
            <h5>Công ty</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="/about">Sự nghiệp</Link>
                </li>
                <li>
                  <Link to="*">Chi nhánh</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ với chúng tôi</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Cửa hàng</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/shop">Hàng mới đến</Link>
                </li>
                <li>
                  <Link to="/shop">Thuốc</Link>
                </li>
                <li>
                  <Link to="/shop">Thực phẩm chức năng</Link>
                </li>
                <li>
                  <Link to="/shop">Vật tư y tế</Link>
                </li>
                <li>
                  <Link to="/shop">Vitamins</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Hỗ Trợ</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/contact">Dịch Vụ Khách Hàng</Link>
                </li>
                <li>
                  <Link to="/loginSignUp">Tài Khoản Của Tôi</Link>
                </li>
                <li>
                  <Link to="/contact">Tìm Cửa Hàng</Link>
                </li>
                <li>
                  <Link to="/terms">Pháp Lý & Bảo Mật</Link>
                </li>
                <li>
                  <Link to="/contact">Liên Hệ</Link>
                </li>
                <li>
                  <Link to="/">Thẻ Quà Tặng</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer_right">
            <h5>Đăng Ký</h5>
            <p>
              Hãy là người đầu tiên nhận được thông tin mới nhất về xu hướng,
              khuyến mãi và nhiều hơn nữa!
            </p>

            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email của bạn"
                required
              />
              <button type="submit">Tham Gia</button>
            </form>

            <h6>Thanh Toán An Toàn</h6>
            <div className="paymentIconContainer">
              <img src={paymentIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>© 2024 Kenny. Tất cả các quyền được bảo lưu.</p>
          <div className="footerLangCurrency">
            <div className="footerLang">
              <p>Ngôn ngữ</p>
              <select name="language" id="language">
                <option value="english">Tiếng Anh</option>
                <option value="Germany">Mỹ</option>
                <option value="French">Việt</option>
              </select>
            </div>
            <div className="footerCurrency">
              <p>Tiền tệ</p>
              <select name="currency" id="currency">
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
