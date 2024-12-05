import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../Features/Category/categorySlice"; // Giả sử fetchCategories là action fetch dữ liệu từ API hoặc store

const MenuDropdownMobile = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items); // Lấy các danh mục từ Redux store
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories()); // Gọi action để lấy danh mục từ API
  }, [dispatch]);

  const parentCategories = categories.filter(
    (category) => category.parentName === "Home"
  );

  const categoriesWithChildren = parentCategories.map((parent) => {
    const children = categories.filter(
      (category) => category.parentId === parent._id
    );
    return {
      ...parent,
      children,
    };
  });

  const toggleMenu = (e) => {
    e.preventDefault();
    // Nếu menu đang đóng, thì mở, nếu menu đã mở thì không làm gì
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false); // Đóng menu sau khi chọn danh mục
  };

  return (
    <div className="relative">
      {/* Nút trigger */}
      <button
  className="cursor-pointer bg-white text-black rounded-md w-full text-left list-none ml-[-20px] p-0 font-semibold text-[16px] no-underline"
  onClick={toggleMenu}
>
  {selectedCategory ? selectedCategory.name : "SẢN PHẨM"}
</button>


      {/* Dropdown menu */}
      {isOpen && !selectedCategory && (
        <div className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md w-full z-10">
          <ul className="divide-y divide-gray-200 list-none">
            {categoriesWithChildren.map((category) => (
              <li
                key={category._id}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategoryClick(category)} // Chọn danh mục và đóng menu
              >
                <Link to={`/shop?category=${category._id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hiển thị danh mục đã chọn và các subcategories */}
      {selectedCategory && (
        <div>
          <ul className="bg-gray-100 px-4 py-2 list-none font-bold cursor-pointer">
            <li onClick={() => setSelectedCategory(null)}>
              ← {selectedCategory.name}
            </li>
          </ul>
          <ul className="divide-y divide-gray-200 list-none">
            {selectedCategory.children.map((subcategory) => (
              <li
                key={subcategory._id}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
              >
                <Link to={`/shop?category=${subcategory._id}`}>
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuDropdownMobile;
