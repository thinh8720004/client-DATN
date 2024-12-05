import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../Features/Category/categorySlice";
import "./DropdownMenu.css";

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const categories1 = useSelector((state) => state.categories.items);
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const [hoverTimeout, setHoverTimeout] = useState(null); // Timeout để kiểm soát delay

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const parentCategories = categories1.filter(
    (category) =>
      (category.parentName === "Home" || category.parentName === "Tất cả") &&
      category.name !== "Tất cả"
  );

  const categoriesWithChildren = parentCategories.map((parent) => {
    const children = categories1.filter(
      (category) => category.parentId === parent._id
    );
    return {
      ...parent,
      children,
    };
  });

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

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/shop">
        <li>SẢN PHẨM</li>
      </Link>

      {/* Menu Dropdown */}
      {isHovered && (
        <div className="absolute left-1/3 top-full transform -translate-x-1/3 mt-2 bg-white rounded-lg shadow-lg z-10 transition-opacity duration-300 opacity-100">
          <div className="py-3 flex gap-6 justify-center">
            {categoriesWithChildren.map((category, index) => (
              <div key={index} className="w-[220px] px-4">
                {/* Danh mục cha */}
                <div className="font-semibold text-base text-gray-800 mb-3 border-b border-gray-200 pb-2">
                  <Link to={`/shop?category=${category._id}`}>
                    {category.name}
                  </Link>
                </div>
                {/* Các mục con */}
                {category.children.length > 0 ? (
                  category.children.map((child, childIndex) => (
                    <Link
                      to={`/shop?category=${child._id}`}
                      key={childIndex}
                      className="block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200"
                    >
                      {child.name}
                    </Link>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm italic">
                    Không có danh mục con
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
