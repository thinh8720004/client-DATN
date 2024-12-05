import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import "./DropdownMenu.css";

const DropdownMenuInfo = () => {
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const [hoverTimeout, setHoverTimeout] = useState(null); // Timeout để kiểm soát delay

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Quản lý trạng thái đăng nhập
  const navigate = useNavigate();

  // Hàm xử lý hover vào
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Xóa timeout cũ nếu có
    const timeout = setTimeout(() => {
      setIsHovered(true); // Cập nhật trạng thái sau một khoảng thời gian
    }, 200); // Delay 200ms (có thể điều chỉnh)
    setHoverTimeout(timeout);
  };

  // Hàm xử lý hover ra
  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Xóa timeout cũ nếu có
    const timeout = setTimeout(() => {
      setIsHovered(false); // Cập nhật trạng thái sau một khoảng thời gian
    }, 200); // Delay 200ms (có thể điều chỉnh)
    setHoverTimeout(timeout);
  };

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

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem("token");

    // Cập nhật trạng thái đăng nhập ngay lập tức
    setIsLoggedIn(false);

    // Điều hướng đến trang đăng nhập
    navigate("/loginSignUp");
    window.location.reload(); // Làm mới trang để cập nhật trạng thái
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/user-profile">
        <FaRegUser size={22} />
      </Link>

      {/* Menu Dropdown */}
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white rounded-lg shadow-lg z-10 overflow-hidden w-40 text-lg opacity-100 transition-opacity duration-300">
          <div className="py-3 px-2 flex flex-col items-center gap-4">
            <div className="font-semibold py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md w-full text-center">
              <Link
                to="/user-profile"
                className="custom-border block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200 text-center"
              >
                Thông tin
              </Link>
            </div>

            <div className="font-semibold py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md w-full text-center">
              <Link
                to="/changePassword"
                className="custom-border block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200 text-center"
              >
                Đổi mật khẩu
              </Link>
            </div>

            <div className="font-semibold py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md w-full text-center">
              <Link className="custom-border block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200">
                <button onClick={handleLogout} className="w-full">
                  Đăng xuất
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenuInfo;
